-- Create companies table for all participating companies
-- This table will store companies that appear in both investment matching and buyer matching
create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  website text,
  description text,
  industry text,
  company_size text,
  location text,
  founded_year integer,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.companies enable row level security;

-- Allow public read access (no auth required for viewing)
create policy "companies_select_public"
  on public.companies for select
  using (true);

-- Only authenticated users can insert/update/delete
create policy "companies_insert_auth"
  on public.companies for insert
  with check (auth.uid() is not null);

create policy "companies_update_auth"
  on public.companies for update
  using (auth.uid() is not null);

create policy "companies_delete_auth"
  on public.companies for delete
  using (auth.uid() is not null);

-- Create index for faster queries
create index if not exists companies_name_idx on public.companies(name);
create index if not exists companies_industry_idx on public.companies(industry);
