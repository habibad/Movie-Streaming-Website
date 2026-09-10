ALTER TABLE "Account"
ADD COLUMN IF NOT EXISTS "accountId" TEXT,
ADD COLUMN IF NOT EXISTS "providerId" TEXT,
ADD COLUMN IF NOT EXISTS "idToken" TEXT,
ADD COLUMN IF NOT EXISTS "accessTokenExpiresAt" TIMESTAMP(3),
ADD COLUMN IF NOT EXISTS "refreshTokenExpiresAt" TIMESTAMP(3),
ADD COLUMN IF NOT EXISTS "scope" TEXT;

CREATE TABLE IF NOT EXISTS "Verification" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "Verification_identifier_idx"
    ON "Verification"("identifier");

CREATE TABLE IF NOT EXISTS "Jwks" (
    "id" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Jwks_pkey" PRIMARY KEY ("id")
);
