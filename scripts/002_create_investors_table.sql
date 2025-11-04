-- Create investors table
create table if not exists public.investors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  website text,
  description text,
  investment_focus text,
  investment_stage text,
  investment_range text,
  portfolio_companies text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.investors enable row level security;

-- Allow public read access
create policy "investors_select_public"
  on public.investors for select
  using (true);

-- Only authenticated users can insert/update/delete
create policy "investors_insert_auth"
  on public.investors for insert
  with check (auth.uid() is not null);

create policy "investors_update_auth"
  on public.investors for update
  using (auth.uid() is not null);

create policy "investors_delete_auth"
  on public.investors for delete
  using (auth.uid() is not null);

-- Create index
create index if not exists investors_name_idx on public.investors(name);
