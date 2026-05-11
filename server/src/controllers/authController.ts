import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/db';
import { AppError } from '../middleware/errorHandler';
import type { RegisterBody, LoginBody, AuthPayload } from '../types/index';

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '7d';

function signToken(payload: AuthPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);
}

export async function register(
  req: Request<unknown, unknown, RegisterBody>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return next(new AppError('Email and password are required', 400));
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return next(new AppError('Email already in use', 409));

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, password: hashed, name },
    });

    const token = signToken({ userId: user.id, email: user.email, isPremium: user.isPremium });

    res.cookie('bt_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        isPremium: user.isPremium,
        token,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function login(
  req: Request<unknown, unknown, LoginBody>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('Email and password are required', 400));
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return next(new AppError('Invalid credentials', 401));

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return next(new AppError('Invalid credentials', 401));

    const token = signToken({ userId: user.id, email: user.email, isPremium: user.isPremium });

    res.cookie('bt_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        isPremium: user.isPremium,
        token,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function logout(_req: Request, res: Response): Promise<void> {
  res.clearCookie('bt_token');
  res.json({ success: true, data: null, message: 'Logged out' });
}

export async function getMe(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // req.user is set by requireAuth middleware
    const authReq = req as Request & { user?: AuthPayload };
    if (!authReq.user) return next(new AppError('Not authenticated', 401));

    const user = await prisma.user.findUnique({
      where: { id: authReq.user.userId },
      select: { id: true, email: true, name: true, avatar: true, isPremium: true, createdAt: true },
    });
    if (!user) return next(new AppError('User not found', 404));

    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}
