-- Usuários
create table users (
  id uuid references auth.users primary key,
  email text unique not null,
  display_name text,
  is_premium boolean default false,
  premium_type text, -- 'monthly' ou 'lifetime'
  language text default 'pt',
  created_at timestamp with time zone default now()
);

-- Figurinhas do usuário
create table user_stickers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  sticker_number text not null,
  quantity integer default 1,
  is_duplicate boolean default false,
  created_at timestamp with time zone default now(),
  unique(user_id, sticker_number)
);

-- RLS policies
alter table users enable row level security;
alter table user_stickers enable row level security;

create policy "Users can view own profile" on users for select using (auth.uid() = id);
create policy "Users can update own profile" on users for update using (auth.uid() = id);

create policy "Users can view own stickers" on user_stickers for select using (auth.uid() = user_id);
create policy "Users can insert own stickers" on user_stickers for insert with check (auth.uid() = user_id);
create policy "Users can update own stickers" on user_stickers for update using (auth.uid() = user_id);
create policy "Users can delete own stickers" on user_stickers for delete using (auth.uid() = user_id);

-- Premium users can view others' duplicates for matching
create policy "Premium users can view duplicates" on user_stickers for select 
using (is_duplicate = true);
