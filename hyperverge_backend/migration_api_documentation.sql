-- Migration script for API Documentation tables

-- 1. Create api_documentation table
CREATE TABLE public.api_documentation (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying NOT NULL,
  description text,
  url text NOT NULL,
  category character varying NOT NULL CHECK (category IN ('india_api', 'global_api')),
  curl_example text,
  success_response jsonb DEFAULT '{}'::jsonb,
  failure_responses jsonb DEFAULT '[]'::jsonb,
  error_details jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT api_documentation_pkey PRIMARY KEY (id),
  CONSTRAINT api_documentation_url_unique UNIQUE (url)
);

-- 2. Create api_inputs table for input parameters
CREATE TABLE public.api_inputs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  api_id uuid NOT NULL,
  name character varying NOT NULL,
  type character varying,
  description text,
  required boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT api_inputs_pkey PRIMARY KEY (id),
  CONSTRAINT api_inputs_api_id_fkey FOREIGN KEY (api_id) REFERENCES public.api_documentation(id) ON DELETE CASCADE
);

-- 3. Create api_outputs table for output parameters
CREATE TABLE public.api_outputs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  api_id uuid NOT NULL,
  name character varying NOT NULL,
  type character varying,
  description text,
  required boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT api_outputs_pkey PRIMARY KEY (id),
  CONSTRAINT api_outputs_api_id_fkey FOREIGN KEY (api_id) REFERENCES public.api_documentation(id) ON DELETE CASCADE
);

-- 4. Create indexes for performance
CREATE INDEX idx_api_documentation_category ON public.api_documentation(category);
CREATE INDEX idx_api_documentation_name ON public.api_documentation(name);
CREATE INDEX idx_api_inputs_api_id ON public.api_inputs(api_id);
CREATE INDEX idx_api_outputs_api_id ON public.api_outputs(api_id);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.api_documentation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_inputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_outputs ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS Policies (Allow authenticated users read access)
CREATE POLICY "Allow read access to authenticated users" ON public.api_documentation
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow read access to authenticated users" ON public.api_inputs
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow read access to authenticated users" ON public.api_outputs
  FOR SELECT USING (auth.role() = 'authenticated');

-- Optional: Add admin write policies if needed
CREATE POLICY "Allow admin write access" ON public.api_documentation
  FOR ALL USING (
    auth.role() = 'authenticated' AND 
    auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "Allow admin write access" ON public.api_inputs
  FOR ALL USING (
    auth.role() = 'authenticated' AND 
    auth.jwt() ->> 'role' = 'admin'
  );

CREATE POLICY "Allow admin write access" ON public.api_outputs
  FOR ALL USING (
    auth.role() = 'authenticated' AND 
    auth.jwt() ->> 'role' = 'admin'
  );