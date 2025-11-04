-- Create buyers table
create table if not exists public.buyers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  website text,
  description text,
  buyer_type text, -- 'webtoon' or 'other'
  interest_areas text,
  company_info text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.buyers enable row level security;

-- Allow public read access
create policy "buyers_select_public"
  on public.buyers for select
  using (true);

-- Only authenticated users can insert/update/delete
create policy "buyers_insert_auth"
  on public.buyers for insert
  with check (auth.uid() is not null);

create policy "buyers_update_auth"
  on public.buyers for update
  using (auth.uid() is not null);

create policy "buyers_delete_auth"
  on public.buyers for delete
  using (auth.uid() is not null);

-- Create index
create index if not exists buyers_name_idx on public.buyers(name);
create index if not exists buyers_type_idx on public.buyers(buyer_type);
