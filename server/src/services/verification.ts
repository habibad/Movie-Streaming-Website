import { prisma } from '../../lib/prisma';
import { generateOtp, hashToken } from '../utils/token';

const OTP_TTL_MINUTES = 10;

/**
 * Identifier format used in the Verification table.
 * We namespace by purpose so a signup OTP can't be used for password reset.
 */
function makeIdentifier(email: string, purpose: 'signup' | 'reset'): string {
  return `${purpose}:${email.toLowerCase()}`;
}

/**
 * Create a fresh 6-digit OTP, invalidating any previous codes for the same
 * (email, purpose) pair. Returns the *plaintext* code so it can be emailed.
 */
export async function createOtp(
  email: string,
  purpose: 'signup' | 'reset',
): Promise<string> {
  const identifier = makeIdentifier(email, purpose);
  const code = generateOtp();
  const hashed = hashToken(code);
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

  // Delete any previous OTPs for this identifier (so the latest is the only valid one)
  await prisma.verification.deleteMany({ where: { identifier } });
  await prisma.verification.create({
    data: { identifier, value: hashed, expiresAt },
  });

  return code;
}

/**
 * Verify an OTP. Optionally consume it (delete) on success.
 * Returns true if the OTP matches and is unexpired.
 */
export async function verifyOtp(
  email: string,
  code: string,
  purpose: 'signup' | 'reset',
  { consume = true }: { consume?: boolean } = {},
): Promise<boolean> {
  const identifier = makeIdentifier(email, purpose);
  const hashed = hashToken(code);

  const record = await prisma.verification.findFirst({
    where: { identifier, value: hashed },
    orderBy: { createdAt: 'desc' },
  });

  if (!record) return false;
  if (record.expiresAt < new Date()) {
    // Clean up expired record
    await prisma.verification.delete({ where: { id: record.id } });
    return false;
  }

  if (consume) {
    await prisma.verification.delete({ where: { id: record.id } });
  }
  return true;
}
