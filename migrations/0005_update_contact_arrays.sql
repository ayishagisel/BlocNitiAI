
-- Drop old individual contact columns
ALTER TABLE users DROP COLUMN IF EXISTS organizer_name;
ALTER TABLE users DROP COLUMN IF EXISTS organizer_phone;
ALTER TABLE users DROP COLUMN IF EXISTS organizer_email;
ALTER TABLE users DROP COLUMN IF EXISTS organizer_company;
ALTER TABLE users DROP COLUMN IF EXISTS non_profit_name;
ALTER TABLE users DROP COLUMN IF EXISTS non_profit_phone;
ALTER TABLE users DROP COLUMN IF EXISTS non_profit_email;
ALTER TABLE users DROP COLUMN IF EXISTS city_agency_name;
ALTER TABLE users DROP COLUMN IF EXISTS city_agency_phone;
ALTER TABLE users DROP COLUMN IF EXISTS city_agency_email;
ALTER TABLE users DROP COLUMN IF EXISTS elected_official_name;
ALTER TABLE users DROP COLUMN IF EXISTS elected_official_phone;
ALTER TABLE users DROP COLUMN IF EXISTS elected_official_email;

-- Add new JSON columns for contact arrays
ALTER TABLE users ADD COLUMN organizers TEXT;
ALTER TABLE users ADD COLUMN non_profits TEXT;
ALTER TABLE users ADD COLUMN city_agencies TEXT;
ALTER TABLE users ADD COLUMN elected_officials TEXT;
