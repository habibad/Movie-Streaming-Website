import type { Response, NextFunction } from 'express';
import type { AuthRequest } from '../types/index';
import { AppError } from './errorHandler';
import { verifyJwt } from '../utils/token';
import { getActiveSession } from '../services/session';
import { AUTH_COOKIE_NAME } from '../utils/cookies';

/**
 * Extract a JWT from either the Authorization header (Bearer ...) or the
 * httpOnly auth cookie. Header takes precedence so API clients can override.
 */
function extractToken(req: AuthRequest): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  const cookieToken = (req.cookies as Record<string, string | undefined> | undefined)?.[AUTH_COOKIE_NAME];
  return cookieToken ?? null;
}

/**
 * Requires the request to carry a valid JWT *and* the underlying Session
 * row to still exist (so revoking a session immediately logs the user out).
 */
export async function requireAuth(
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  const token = extractToken(req);
  if (!token) return next(new AppError('Authentication required', 401));

  let payload;
  try {
    payload = verifyJwt(token);
  } catch {
    return next(new AppError('Invalid or expired token', 401));
  }

  const session = await getActiveSession(payload.sessionId);
  if (!session) return next(new AppError('Session expired or revoked', 401));

  req.user = payload;
  next();
}

/**
 * Soft auth — attach req.user if a valid token is present, but never block
 * the request. Useful for routes that show extra info to logged-in users.
 */
export async function optionalAuth(
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  const token = extractToken(req);
  if (!token) return next();

  try {
    const payload = verifyJwt(token);
    const session = await getActiveSession(payload.sessionId);
    if (session) req.user = payload;
  } catch {
    /* ignore — soft auth */
  }
  next();
}

/**
 * Role gate. Use after requireAuth.
 *   router.delete('/users/:id', requireAuth, requireRole('ADMIN'), handler)
 */
export function requireRole(...roles: Array<'ADMIN' | 'MODERATOR' | 'USER'>) {
  return function roleGate(req: AuthRequest, _res: Response, next: NextFunction): void {
    if (!req.user) return next(new AppError('Authentication required', 401));
    if (!roles.includes(req.user.role)) {
      return next(new AppError('Insufficient permissions', 403));
    }
    next();
  };
}
