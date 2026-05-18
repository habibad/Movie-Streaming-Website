import type { Request } from 'express';
import { prisma } from '../../lib/prisma';
import { generateSessionToken, getSessionExpiry, signJwt } from '../utils/token';

interface CreateSessionInput {
  userId: string;
  email: string;
  role: 'ADMIN' | 'MODERATOR' | 'USER';
  req?: Request;
}

interface CreateSessionResult {
  sessionId: string;
  sessionToken: string;
  jwt: string;
  expiresAt: Date;
}

/**
 * Create a Session row + a JWT bound to that session.
 * The JWT carries the sessionId, so every authed request can verify
 * the session still exists (and hasn't been revoked).
 */
export async function createSession({
  userId,
  email,
  role,
  req,
}: CreateSessionInput): Promise<CreateSessionResult> {
  const sessionToken = generateSessionToken();
  const expiresAt = getSessionExpiry();

  const session = await prisma.session.create({
    data: {
      userId,
      token: sessionToken,
      expiresAt,
      ipAddress: req?.ip ?? null,
      userAgent: req?.headers['user-agent'] ?? null,
    },
  });

  const jwt = signJwt({
    userId,
    email,
    role,
    sessionId: session.id,
  });

  return { sessionId: session.id, sessionToken, jwt, expiresAt };
}

/**
 * Fetch the Session row by id (used by requireAuth middleware to confirm
 * a token's session hasn't been revoked or expired).
 */
export async function getActiveSession(sessionId: string) {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });
  if (!session) return null;
  if (session.expiresAt < new Date()) return null;
  return session;
}

/**
 * Delete a single session (logout).
 */
export async function revokeSession(sessionId: string): Promise<void> {
  await prisma.session.deleteMany({ where: { id: sessionId } });
}

/**
 * Delete every session belonging to a user (logout from all devices).
 */
export async function revokeAllSessionsForUser(userId: string): Promise<void> {
  await prisma.session.deleteMany({ where: { userId } });
}
