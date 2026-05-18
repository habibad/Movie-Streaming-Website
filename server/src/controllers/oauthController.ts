import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import { setAuthCookie } from '../utils/cookies';
import { createSession } from '../services/session';
import {
  getAuthorizationUrl,
  exchangeCodeForProfile,
  type OAuthProvider,
  type OAuthUserProfile,
} from '../services/oauth';
import { generateOAuthState } from '../utils/token';

const OAUTH_STATE_COOKIE = 'bt_oauth_state';
const STATE_COOKIE_MAX_AGE_MS = 10 * 60 * 1000; // 10 minutes

/* ──────────────────────────────────────────────────────────────
   GET /auth/:provider
   Build the provider's authorization URL and 302 the user to it.
   We also persist a random `state` value in a short-lived cookie
   so we can validate it when the provider redirects back.
   ────────────────────────────────────────────────────────────── */
export function startOAuth(provider: OAuthProvider) {
  return function handler(req: Request, res: Response, next: NextFunction): void {
    try {
      const state = generateOAuthState();
      // Optionally remember where the user wanted to go after sign-in
      const returnTo = (req.query.returnTo as string | undefined) ?? '/';
      const stateValue = `${state}|${encodeURIComponent(returnTo)}`;

      res.cookie(OAUTH_STATE_COOKIE, stateValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: STATE_COOKIE_MAX_AGE_MS,
        path: '/',
      });

      const url = getAuthorizationUrl(provider, state);
      res.redirect(url);
    } catch (err) {
      next(err);
    }
  };
}

/* ──────────────────────────────────────────────────────────────
   GET /auth/:provider/callback
   Validate state, exchange code for tokens + profile, upsert User
   + Account, create a session, and redirect back to the client.
   ────────────────────────────────────────────────────────────── */
export function oauthCallback(provider: OAuthProvider) {
  return async function handler(req: Request, res: Response, next: NextFunction): Promise<void> {
    const clientUrl = process.env.CLIENT_URL ?? 'http://localhost:5173';

    try {
      const { code, state, error } = req.query as {
        code?: string;
        state?: string;
        error?: string;
      };

      if (error) {
        return res.redirect(
          `${clientUrl}/signin?oauth_error=${encodeURIComponent(error)}`,
        );
      }
      if (!code || !state) {
        throw new AppError('Missing OAuth code or state', 400);
      }

      const cookieState = (req.cookies as Record<string, string | undefined> | undefined)?.[
        OAUTH_STATE_COOKIE
      ];
      if (!cookieState) throw new AppError('Missing OAuth state cookie', 400);

      const [savedState, encodedReturnTo] = cookieState.split('|');
      if (savedState !== state) throw new AppError('Invalid OAuth state', 400);

      const returnTo = encodedReturnTo ? decodeURIComponent(encodedReturnTo) : '/';

      // Clear the state cookie regardless of outcome
      res.clearCookie(OAUTH_STATE_COOKIE, { path: '/' });

      // Exchange the code for a normalized profile
      const profile = await exchangeCodeForProfile(provider, code);

      // Upsert the User + Account
      const user = await upsertOAuthUser(profile);

      // Create a session and set cookie
      const { jwt } = await createSession({
        userId: user.id,
        email: user.email,
        role: user.role,
        req,
      });
      setAuthCookie(res, jwt);

      // Send the user back to the client. Pass the token in the URL so SPAs
      // that don't yet trust cookies can pick it up (the AuthCallback page
      // will read it and store it).
      const redirectUrl = new URL(`${clientUrl}/auth/callback`);
      redirectUrl.searchParams.set('token', jwt);
      redirectUrl.searchParams.set('returnTo', returnTo);
      res.redirect(redirectUrl.toString());
    } catch (err) {
      if (err instanceof AppError) {
        return res.redirect(
          `${clientUrl}/signin?oauth_error=${encodeURIComponent(err.message)}`,
        );
      }
      next(err);
    }
  };
}

/* ──────────────────────────────────────────────────────────────
   Upsert helper.
   Strategy:
   - If an Account row exists for (providerId, providerAccountId)
     → use that user.
   - Else if a User row exists for the email
     → link a new Account row to that User (so a Google login on
       an existing credential account still works).
   - Else → create a brand new User + Account.
   ────────────────────────────────────────────────────────────── */
async function upsertOAuthUser(profile: OAuthUserProfile) {
  // 1. Account already linked?
  const existingAccount = await prisma.account.findFirst({
    where: { providerId: profile.providerId, accountId: profile.providerAccountId },
    include: { user: true },
  });
  if (existingAccount) {
    // Refresh tokens on every login
    await prisma.account.update({
      where: { id: existingAccount.id },
      data: {
        accessToken: profile.accessToken,
        refreshToken: profile.refreshToken,
        idToken: profile.idToken,
        accessTokenExpiresAt: profile.accessTokenExpiresAt,
        scope: profile.scope,
      },
    });
    return existingAccount.user;
  }

  // 2. User exists by email — link this provider account to them
  const userByEmail = await prisma.user.findUnique({
    where: { email: profile.email.toLowerCase() },
  });
  if (userByEmail) {
    await prisma.account.create({
      data: {
        userId: userByEmail.id,
        providerId: profile.providerId,
        accountId: profile.providerAccountId,
        accessToken: profile.accessToken,
        refreshToken: profile.refreshToken,
        idToken: profile.idToken,
        accessTokenExpiresAt: profile.accessTokenExpiresAt,
        scope: profile.scope,
      },
    });
    // Backfill missing fields
    if (!userByEmail.image && profile.image) {
      await prisma.user.update({
        where: { id: userByEmail.id },
        data: { image: profile.image, emailVerified: true },
      });
    } else if (!userByEmail.emailVerified && profile.emailVerified) {
      await prisma.user.update({
        where: { id: userByEmail.id },
        data: { emailVerified: true },
      });
    }
    return userByEmail;
  }

  // 3. Brand new user
  return prisma.user.create({
    data: {
      email: profile.email.toLowerCase(),
      name: profile.name,
      image: profile.image,
      emailVerified: profile.emailVerified,
      accounts: {
        create: {
          providerId: profile.providerId,
          accountId: profile.providerAccountId,
          accessToken: profile.accessToken,
          refreshToken: profile.refreshToken,
          idToken: profile.idToken,
          accessTokenExpiresAt: profile.accessTokenExpiresAt,
          scope: profile.scope,
        },
      },
    },
  });
}
