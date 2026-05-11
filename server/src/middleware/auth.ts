import type { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { AuthRequest, AuthPayload } from '../types/index.js';
import { AppError } from './errorHandler.js';

export function requireAuth(
  req: AuthRequest,
  _res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  const token =
    authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : req.cookies?.bt_token as string | undefined;

  if (!token) {
    return next(new AppError('Authentication required', 401));
  }

  try {
    const secret = process.env.JWT_SECRET ?? 'dev_secret';
    const payload = jwt.verify(token, secret) as AuthPayload;
    req.user = payload;
    next();
  } catch {
    next(new AppError('Invalid or expired token', 401));
  }
}

export function requirePremium(
  req: AuthRequest,
  _res: Response,
  next: NextFunction
): void {
  if (!req.user?.isPremium) {
    return next(new AppError('Premium subscription required', 403));
  }
  next();
}
