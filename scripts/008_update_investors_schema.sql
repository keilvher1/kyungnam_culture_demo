-- Add missing columns to investors table
alter table public.investors
  add column if not exists contact_email text,
  add column if not exists contact_phone text,
  add column if not exists location text;

-- Update the investment_range column name for consistency (if needed)
-- Note: investment_range already exists, so we'll keep it
