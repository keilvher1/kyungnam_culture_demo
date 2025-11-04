-- Create matching_schedule table for the timetable
create table if not exists public.matching_schedule (
  id uuid primary key default gen_random_uuid(),
  table_number integer not null, -- 1-10
  matching_type text not null, -- 'investment', 'buyer_webtoon', 'buyer_other'
  time_slot text not null, -- e.g., "10:00-10:30"
  date date not null,
  company_id uuid references public.companies(id) on delete set null,
  partner_id uuid, -- Can reference investors or buyers
  partner_type text, -- 'investor' or 'buyer'
  status text default 'scheduled', -- 'scheduled', 'completed', 'cancelled'
  notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.matching_schedule enable row level security;

-- Allow public read access
create policy "matching_schedule_select_public"
  on public.matching_schedule for select
  using (true);

-- Only authenticated users can insert/update/delete
create policy "matching_schedule_insert_auth"
  on public.matching_schedule for insert
  with check (auth.uid() is not null);

create policy "matching_schedule_update_auth"
  on public.matching_schedule for update
  using (auth.uid() is not null);

create policy "matching_schedule_delete_auth"
  on public.matching_schedule for delete
  using (auth.uid() is not null);

-- Create indexes
create index if not exists matching_schedule_table_idx on public.matching_schedule(table_number);
create index if not exists matching_schedule_type_idx on public.matching_schedule(matching_type);
create index if not exists matching_schedule_date_idx on public.matching_schedule(date);
