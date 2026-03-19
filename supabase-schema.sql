-- Run this in Supabase SQL Editor

-- Projects table
create table projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  description text,
  tags text[] default '{}',
  skills text[] default '{}',
  role text,
  year text,
  live_url text,
  github_url text,
  cover_url text,
  images text[] default '{}',
  featured boolean default false,
  order_index int default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table projects enable row level security;

-- Allow public read
create policy "Public can read projects"
  on projects for select
  using (true);

-- Allow authenticated users to do everything
create policy "Authenticated users can manage projects"
  on projects for all
  using (auth.role() = 'authenticated');

-- Storage bucket for project images
insert into storage.buckets (id, name, public)
values ('projects', 'projects', true);

-- Allow public read on storage
create policy "Public can read project images"
  on storage.objects for select
  using (bucket_id = 'projects');

-- Allow authenticated to upload
create policy "Authenticated can upload project images"
  on storage.objects for insert
  with check (bucket_id = 'projects' and auth.role() = 'authenticated');

create policy "Authenticated can delete project images"
  on storage.objects for delete
  using (bucket_id = 'projects' and auth.role() = 'authenticated');
