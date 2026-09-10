UPDATE "Account"
SET "providerId" = "provider",
    "accountId" = "providerAccountId"
WHERE "providerId" IS NULL OR "accountId" IS NULL;

ALTER TABLE "Account"
ALTER COLUMN "provider" DROP NOT NULL,
ALTER COLUMN "providerAccountId" DROP NOT NULL,
ALTER COLUMN "providerId" SET NOT NULL,
ALTER COLUMN "accountId" SET NOT NULL;

DROP INDEX IF EXISTS "Account_provider_providerAccountId_key";
CREATE UNIQUE INDEX IF NOT EXISTS "Account_providerId_accountId_key"
ON "Account"("providerId", "accountId");
