
-- Add missing columns to users table
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "user_type" text DEFAULT 'tenant';
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "stakeholder_type" text;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "organization" text;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "position" text;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "jurisdiction" text;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "license_number" text;

-- Update existing data type columns to match schema
ALTER TABLE "users" ALTER COLUMN "id" TYPE text;
ALTER TABLE "users" ALTER COLUMN "email" TYPE text;
ALTER TABLE "users" ALTER COLUMN "date_of_birth" TYPE text;
