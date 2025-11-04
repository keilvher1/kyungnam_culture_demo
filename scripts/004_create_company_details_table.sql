-- Create company_details table to store different information for each matching type
-- This allows the same company to show different info in investment vs buyer matching
create table if not exists public.company_details (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  matching_type text not null, -- 'investment', 'buyer_webtoon', 'buyer_other'
  pitch text,
  highlights jsonb, -- Array of key highlights
  team_info text,
  financials text,
  media_urls jsonb, -- Array of image/video URLs
  documents jsonb, -- Array of document URLs (PDFs, etc)
  additional_info jsonb, -- Flexible field for any extra data
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(company_id, matching_type)
);

-- Enable RLS
alter table public.company_details enable row level security;

-- Allow public read access
create policy "company_details_select_public"
  on public.company_details for select
  using (true);

-- Only authenticated users can insert/update/delete
create policy "company_details_insert_auth"
  on public.company_details for insert
  with check (auth.uid() is not null);

create policy "company_details_update_auth"
  on public.company_details for update
  using (auth.uid() is not null);

create policy "company_details_delete_auth"
  on public.company_details for delete
  using (auth.uid() is not null);

-- Create index
create index if not exists company_details_company_idx on public.company_details(company_id);
create index if not exists company_details_type_idx on public.company_details(matching_type);
