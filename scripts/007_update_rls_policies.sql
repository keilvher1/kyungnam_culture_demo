-- Update RLS policies to allow all operations without authentication
-- This is for development/admin purposes. Add proper auth later for production.

-- Drop existing restrictive policies for companies
drop policy if exists "companies_insert_auth" on public.companies;
drop policy if exists "companies_update_auth" on public.companies;
drop policy if exists "companies_delete_auth" on public.companies;

-- Create permissive policies for companies
create policy "companies_insert_public"
  on public.companies for insert
  with check (true);

create policy "companies_update_public"
  on public.companies for update
  using (true);

create policy "companies_delete_public"
  on public.companies for delete
  using (true);

-- Drop existing restrictive policies for investors
drop policy if exists "investors_insert_auth" on public.investors;
drop policy if exists "investors_update_auth" on public.investors;
drop policy if exists "investors_delete_auth" on public.investors;

-- Create permissive policies for investors
create policy "investors_insert_public"
  on public.investors for insert
  with check (true);

create policy "investors_update_public"
  on public.investors for update
  using (true);

create policy "investors_delete_public"
  on public.investors for delete
  using (true);

-- Drop existing restrictive policies for buyers
drop policy if exists "buyers_insert_auth" on public.buyers;
drop policy if exists "buyers_update_auth" on public.buyers;
drop policy if exists "buyers_delete_auth" on public.buyers;

-- Create permissive policies for buyers
create policy "buyers_insert_public"
  on public.buyers for insert
  with check (true);

create policy "buyers_update_public"
  on public.buyers for update
  using (true);

create policy "buyers_delete_public"
  on public.buyers for delete
  using (true);

-- Drop existing restrictive policies for company_details
drop policy if exists "company_details_insert_auth" on public.company_details;
drop policy if exists "company_details_update_auth" on public.company_details;
drop policy if exists "company_details_delete_auth" on public.company_details;

-- Create permissive policies for company_details
create policy "company_details_insert_public"
  on public.company_details for insert
  with check (true);

create policy "company_details_update_public"
  on public.company_details for update
  using (true);

create policy "company_details_delete_public"
  on public.company_details for delete
  using (true);

-- Drop existing restrictive policies for matching_schedule
drop policy if exists "matching_schedule_insert_auth" on public.matching_schedule;
drop policy if exists "matching_schedule_update_auth" on public.matching_schedule;
drop policy if exists "matching_schedule_delete_auth" on public.matching_schedule;

-- Create permissive policies for matching_schedule
create policy "matching_schedule_insert_public"
  on public.matching_schedule for insert
  with check (true);

create policy "matching_schedule_update_public"
  on public.matching_schedule for update
  using (true);

create policy "matching_schedule_delete_public"
  on public.matching_schedule for delete
  using (true);

-- Drop existing restrictive policies for open_innovation
drop policy if exists "open_innovation_insert_auth" on public.open_innovation;
drop policy if exists "open_innovation_update_auth" on public.open_innovation;
drop policy if exists "open_innovation_delete_auth" on public.open_innovation;

-- Create permissive policies for open_innovation
create policy "open_innovation_insert_public"
  on public.open_innovation for insert
  with check (true);

create policy "open_innovation_update_public"
  on public.open_innovation for update
  using (true);

create policy "open_innovation_delete_public"
  on public.open_innovation for delete
  using (true);
