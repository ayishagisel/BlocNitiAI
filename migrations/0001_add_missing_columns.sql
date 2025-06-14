
-- Add missing columns to users table
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "user_type" text DEFAULT 'tenant';
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "stakeholder_type" text;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "organization" text;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "position" text;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "jurisdiction" text;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "license_number" text;
