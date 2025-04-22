-- Create profiles table
create table if not exists public.profiles (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null unique,
    username text,
    avatar_url text,
    avatar_style text default 'avataaars',
    level integer default 1,
    xp integer default 0,
    streak integer default 0,
    last_active timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone"
    on public.profiles for select
    using ( true );

create policy "Users can insert their own profile"
    on public.profiles for insert
    with check ( auth.uid() = user_id );

create policy "Users can update own profile"
    on public.profiles for update
    using ( auth.uid() = user_id );

-- Create indexes
create index if not exists profiles_user_id_idx on public.profiles(user_id);
create index if not exists profiles_username_idx on public.profiles(username);

-- Set up realtime
alter publication supabase_realtime add table public.profiles; 