-- First, add the new user_id column
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Make user_id NOT NULL after migrating existing data
UPDATE public.profiles
SET user_id = id
WHERE user_id IS NULL;

ALTER TABLE public.profiles
ALTER COLUMN user_id SET NOT NULL;

-- Add unique constraint
ALTER TABLE public.profiles
ADD CONSTRAINT profiles_user_id_unique UNIQUE (user_id);

-- Add avatar_style if it doesn't exist
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS avatar_style text DEFAULT 'avataaars';

-- Update avatar_style for existing records
UPDATE public.profiles
SET avatar_style = 'avataaars'
WHERE avatar_style IS NULL;

-- Add or update other columns if they don't exist
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS level integer DEFAULT 1,
ADD COLUMN IF NOT EXISTS xp integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS streak integer DEFAULT 0;

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS profiles_user_id_idx ON public.profiles(user_id);

-- Update RLS policies
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users can insert their own profile"
    ON public.profiles FOR INSERT
    WITH CHECK ( auth.uid() = user_id );

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING ( auth.uid() = user_id ); 