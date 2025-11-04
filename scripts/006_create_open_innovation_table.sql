-- Create open_innovation table for mid-large companies and their challenges
create table if not exists public.open_innovation (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  logo_url text,
  website text,
  company_description text,
  challenge_title text not null,
  challenge_description text,
  challenge_category text,
  requirements text,
  benefits text,
  deadline date,
  contact_info text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.open_innovation enable row level security;

-- Allow public read access
create policy "open_innovation_select_public"
  on public.open_innovation for select
  using (true);

-- Only authenticated users can insert/update/delete
create policy "open_innovation_insert_auth"
  on public.open_innovation for insert
  with check (auth.uid() is not null);

create policy "open_innovation_update_auth"
  on public.open_innovation for update
  using (auth.uid() is not null);

create policy "open_innovation_delete_auth"
  on public.open_innovation for delete
  using (auth.uid() is not null);

-- Create index
create index if not exists open_innovation_company_idx on public.open_innovation(company_name);
