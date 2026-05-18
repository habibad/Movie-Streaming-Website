import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import type { AuthPayload } from '../types/index';

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev_secret_change_me';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '7d';

/**
 * Sign a JWT for an authenticated user / session.
 */
export function signJwt(payload: Omit<AuthPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);
}

/**
 * Verify a JWT and return the decoded payload.
 * Throws if invalid / expired.
 */
export function verifyJwt(token: string): AuthPayload {
  return jwt.verify(token, JWT_SECRET) as AuthPayload;
}

/**
 * Generate a cryptographically-strong random session token.
 * Stored in the Session table; also embedded in the JWT for double-check.
 */
export function generateSessionToken(): string {
  return crypto.randomBytes(48).toString('hex');
}

/**
 * Generate a random URL-safe state for OAuth flows (CSRF protection).
 */
export function generateOAuthState(): string {
  return crypto.randomBytes(24).toString('hex');
}

/**
 * Generate a 6-digit OTP suitable for email verification / password reset.
 */
export function generateOtp(): string {
  // crypto.randomInt(0, 1_000_000) → pad to 6 digits
  const n = crypto.randomInt(0, 1_000_000);
  return n.toString().padStart(6, '0');
}

/**
 * Hash a value (e.g. an OTP) before storing it in the Verification table.
 * Using SHA-256 here is fine for short-lived single-use codes; bcrypt is
 * overkill for 6-digit codes that expire in minutes.
 */
export function hashToken(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex');
}

/**
 * How long sessions last (default 7 days).
 */
export function getSessionExpiry(): Date {
  const days = parseInt(process.env.SESSION_EXPIRES_DAYS ?? '7', 10);
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}
