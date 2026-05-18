import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import { setAuthCookie, clearAuthCookie } from '../utils/cookies';
import { createSession, revokeSession } from '../services/session';
import { createOtp, verifyOtp } from '../services/verification';
import { sendOtpEmail } from '../services/email';
import { toPublicUser } from '../utils/user';
import type {
  AuthRequest,
  RegisterBody,
  LoginBody,
  ForgotPasswordBody,
  VerifyCodeBody,
  ResetPasswordBody,
} from '../types/index';

/* ──────────────────────────────────────────────────────────────
   POST /auth/register
   Creates a User + a credential Account (with hashed password) and
   sends a 6-digit verification code by email. Also issues a session
   right away so the client can stay logged in while verifying.
   ────────────────────────────────────────────────────────────── */
export async function register(
  req: Request<unknown, unknown, RegisterBody>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return next(new AppError('Name, email, and password are required', 400));
    }
    if (password.length < 8) {
      return next(new AppError('Password must be at least 8 characters', 400));
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) return next(new AppError('Email already in use', 409));

    const hashed = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        name: name.trim(),
        emailVerified: false,
        accounts: {
          create: {
            providerId: 'credential',
            accountId: normalizedEmail,
            password: hashed,
          },
        },
      },
    });

    // Send a 6-digit code so they can verify the email
    const code = await createOtp(normalizedEmail, 'signup');
    await sendOtpEmail(normalizedEmail, code, 'signup');

    // Issue a session so they're "logged in" while completing verification
    const { jwt } = await createSession({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
    setAuthCookie(res, jwt);

    res.status(201).json({
      success: true,
      data: { user: toPublicUser(user), token: jwt },
      message: 'Account created. A verification code has been sent to your email.',
    });
  } catch (err) {
    next(err);
  }
}

/* ──────────────────────────────────────────────────────────────
   POST /auth/login
   Verifies email + password against the credential Account row.
   ────────────────────────────────────────────────────────────── */
export async function login(
  req: Request<unknown, unknown, LoginBody>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('Email and password are required', 400));
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: {
        accounts: { where: { providerId: 'credential' } },
      },
    });
    if (!user) return next(new AppError('Invalid email or password', 401));

    const credentialAccount = user.accounts[0];
    if (!credentialAccount || !credentialAccount.password) {
      return next(
        new AppError(
          'This account uses social login. Try signing in with Google or Facebook.',
          401,
        ),
      );
    }

    const valid = await bcrypt.compare(password, credentialAccount.password);
    if (!valid) return next(new AppError('Invalid email or password', 401));

    const { jwt } = await createSession({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
    setAuthCookie(res, jwt);

    res.json({
      success: true,
      data: { user: toPublicUser(user), token: jwt },
    });
  } catch (err) {
    next(err);
  }
}

/* ──────────────────────────────────────────────────────────────
   POST /auth/logout
   Revokes the current session in the DB and clears the cookie.
   ────────────────────────────────────────────────────────────── */
export async function logout(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (req.user?.sessionId) {
      await revokeSession(req.user.sessionId);
    }
    clearAuthCookie(res);
    res.json({ success: true, data: null, message: 'Logged out' });
  } catch (err) {
    next(err);
  }
}

/* ──────────────────────────────────────────────────────────────
   GET /auth/me
   Returns the currently logged-in user (with profile).
   ────────────────────────────────────────────────────────────── */
export async function getMe(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!req.user) return next(new AppError('Not authenticated', 401));

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: { profile: true },
    });
    if (!user) return next(new AppError('User not found', 404));

    res.json({
      success: true,
      data: { ...toPublicUser(user), profile: user.profile ?? null },
    });
  } catch (err) {
    next(err);
  }
}

/* ──────────────────────────────────────────────────────────────
   POST /auth/forgot-password
   Email a 6-digit reset code. Always returns success to prevent
   email enumeration.
   ────────────────────────────────────────────────────────────── */
export async function forgotPassword(
  req: Request<unknown, unknown, ForgotPasswordBody>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { email } = req.body;
    if (!email) return next(new AppError('Email is required', 400));

    const normalizedEmail = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

    if (user) {
      const code = await createOtp(normalizedEmail, 'reset');
      await sendOtpEmail(normalizedEmail, code, 'reset');
    }

    // Always return the same response — don't leak whether the email exists
    res.json({
      success: true,
      data: null,
      message: 'If an account exists for that email, a reset code has been sent.',
    });
  } catch (err) {
    next(err);
  }
}

/* ──────────────────────────────────────────────────────────────
   POST /auth/verify-code
   Verify a 6-digit OTP. For signup flow, marks the user verified
   and consumes the code. For reset flow, validates the code WITHOUT
   consuming it (so the same code can be replayed at /reset-password).
   ────────────────────────────────────────────────────────────── */
export async function verifyCode(
  req: Request<unknown, unknown, VerifyCodeBody>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { email, code, purpose = 'signup' } = req.body;
    if (!email || !code) return next(new AppError('Email and code are required', 400));

    const normalizedEmail = email.toLowerCase().trim();

    if (purpose === 'signup') {
      const ok = await verifyOtp(normalizedEmail, code, 'signup', { consume: true });
      if (!ok) return next(new AppError('Invalid or expired code', 400));

      await prisma.user.update({
        where: { email: normalizedEmail },
        data: { emailVerified: true },
      });

      res.json({ success: true, data: { verified: true } });
      return;
    }

    // reset flow — don't consume so /reset-password can verify again
    const ok = await verifyOtp(normalizedEmail, code, 'reset', { consume: false });
    if (!ok) return next(new AppError('Invalid or expired code', 400));
    res.json({ success: true, data: { verified: true } });
  } catch (err) {
    next(err);
  }
}

/* ──────────────────────────────────────────────────────────────
   POST /auth/reset-password
   Validate + consume the reset code, set the new password.
   ────────────────────────────────────────────────────────────── */
export async function resetPassword(
  req: Request<unknown, unknown, ResetPasswordBody>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { email, code, newPassword } = req.body;
    if (!email || !code || !newPassword) {
      return next(new AppError('Email, code, and new password are required', 400));
    }
    if (newPassword.length < 8) {
      return next(new AppError('Password must be at least 8 characters', 400));
    }

    const normalizedEmail = email.toLowerCase().trim();

    const ok = await verifyOtp(normalizedEmail, code, 'reset', { consume: true });
    if (!ok) return next(new AppError('Invalid or expired code', 400));

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: { accounts: { where: { providerId: 'credential' } } },
    });
    if (!user) return next(new AppError('User not found', 404));

    const hashed = await bcrypt.hash(newPassword, 12);

    if (user.accounts[0]) {
      // Update existing credential account
      await prisma.account.update({
        where: { id: user.accounts[0].id },
        data: { password: hashed },
      });
    } else {
      // User signed up via OAuth but never had a password — create one now
      await prisma.account.create({
        data: {
          userId: user.id,
          providerId: 'credential',
          accountId: normalizedEmail,
          password: hashed,
        },
      });
    }

    // Revoke all existing sessions so the user has to log in again everywhere
    await prisma.session.deleteMany({ where: { userId: user.id } });
    clearAuthCookie(res);

    res.json({
      success: true,
      data: null,
      message: 'Password updated. Please sign in again.',
    });
  } catch (err) {
    next(err);
  }
}

/* ──────────────────────────────────────────────────────────────
   POST /auth/resend-code
   Re-send an OTP for either signup verification or password reset.
   ────────────────────────────────────────────────────────────── */
export async function resendCode(
  req: Request<unknown, unknown, { email: string; purpose?: 'signup' | 'reset' }>,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { email, purpose = 'signup' } = req.body;
    if (!email) return next(new AppError('Email is required', 400));

    const normalizedEmail = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (user) {
      const code = await createOtp(normalizedEmail, purpose);
      await sendOtpEmail(normalizedEmail, code, purpose);
    }

    res.json({
      success: true,
      data: null,
      message: 'If an account exists for that email, a new code has been sent.',
    });
  } catch (err) {
    next(err);
  }
}
