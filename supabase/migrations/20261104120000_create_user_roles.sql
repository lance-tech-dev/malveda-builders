-- Create application roles
CREATE TYPE public.app_role AS ENUM (
  'owner',
  'admin',
  'editor'
);

-- Create user roles table
CREATE TABLE public.user_roles (
  user_id UUID PRIMARY KEY
    REFERENCES auth.users(id) ON DELETE CASCADE,

  role public.app_role NOT NULL DEFAULT 'editor',

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.user_roles
ENABLE ROW LEVEL SECURITY;

-- Restrict permissions
REVOKE ALL ON public.user_roles
FROM anon, authenticated;

GRANT SELECT ON public.user_roles
TO authenticated;

-- Allow users to read only their own role
CREATE POLICY "Users can read their own role"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);