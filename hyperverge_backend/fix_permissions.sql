-- Fix RLS policies to allow authenticated users to insert data

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Allow admin write access" ON public.api_documentation;
DROP POLICY IF EXISTS "Allow admin write access" ON public.api_inputs;
DROP POLICY IF EXISTS "Allow admin write access" ON public.api_outputs;

-- Create permissive policies for authenticated users (for data import)
CREATE POLICY "Allow authenticated users full access" ON public.api_documentation
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users full access" ON public.api_inputs
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users full access" ON public.api_outputs
  FOR ALL USING (auth.role() = 'authenticated');

-- Alternative: If you want to be more restrictive, you can modify the admin policies
-- to allow service role access instead:
/*
CREATE POLICY "Allow service role write access" ON public.api_documentation
  FOR ALL USING (
    auth.role() = 'service_role' OR 
    auth.role() = 'authenticated'
  );

CREATE POLICY "Allow service role write access" ON public.api_inputs
  FOR ALL USING (
    auth.role() = 'service_role' OR 
    auth.role() = 'authenticated'
  );

CREATE POLICY "Allow service role write access" ON public.api_outputs
  FOR ALL USING (
    auth.role() = 'service_role' OR 
    auth.role() = 'authenticated'
  );
*/