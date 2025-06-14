
-- Add new tenant registration questions
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "has_tenant_leader" boolean;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "registered_with_non_profit" boolean;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "received_city_support" boolean;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "received_elected_support" boolean;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "at_risk_homelessness" boolean;
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "housing_type" text;
