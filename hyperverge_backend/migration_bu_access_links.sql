-- Migration: Create BU access links table for customer portal sharing
-- Run this against your Supabase database

CREATE TABLE public.test_bu_access_links (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  business_unit_id uuid NOT NULL,
  password_hash text NOT NULL,
  expires_at timestamp with time zone,
  created_by uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT test_bu_access_links_pkey PRIMARY KEY (id),
  CONSTRAINT test_bu_access_links_bu_fkey FOREIGN KEY (business_unit_id) REFERENCES public.test_business_units(id) ON DELETE CASCADE,
  CONSTRAINT test_bu_access_links_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Index for fast lookup by business_unit_id
CREATE INDEX idx_bu_access_links_bu ON public.test_bu_access_links(business_unit_id);

-- Enable RLS
ALTER TABLE public.test_bu_access_links ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users full access
CREATE POLICY "Allow full access to authenticated users" ON public.test_bu_access_links
  FOR ALL USING (auth.role() = 'authenticated');
