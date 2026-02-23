-- Migration: Make type and base_url nullable in test_environments
-- Run this against your Supabase database

-- Drop the CHECK constraint on type
ALTER TABLE public.test_environments DROP CONSTRAINT IF EXISTS test_environments_type_check;

-- Make type nullable
ALTER TABLE public.test_environments ALTER COLUMN type DROP NOT NULL;

-- Make base_url nullable
ALTER TABLE public.test_environments ALTER COLUMN base_url DROP NOT NULL;
