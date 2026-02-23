-- Migration script for Environments and Workflow-Environment relationships

-- 1. Create test_environments table
CREATE TABLE public.test_environments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name character varying NOT NULL,
  description text,
  type character varying NOT NULL CHECK (type IN ('development', 'staging', 'production', 'testing')),
  integration_type character varying CHECK (integration_type IN ('api', 'sdk')),
  base_url text NOT NULL,
  api_key text,
  auth_method character varying CHECK (auth_method IN ('api-key', 'oauth', 'basic-auth', 'none')),
  headers jsonb DEFAULT '{}'::jsonb,
  variables jsonb DEFAULT '{}'::jsonb,
  documentation_links jsonb DEFAULT '[]'::jsonb,
  business_unit_id uuid NOT NULL,
  owner_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT test_environments_pkey PRIMARY KEY (id),
  CONSTRAINT test_environments_business_unit_id_fkey FOREIGN KEY (business_unit_id) REFERENCES public.test_business_units(id) ON DELETE CASCADE,
  CONSTRAINT test_environments_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- 2. Create test_workflow_environments junction table
CREATE TABLE public.test_workflow_environments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  workflow_id uuid NOT NULL,
  environment_id uuid NOT NULL,
  flow_data_override jsonb,
  is_active boolean DEFAULT true,
  deployed_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT test_workflow_environments_pkey PRIMARY KEY (id),
  CONSTRAINT test_workflow_environments_unique UNIQUE (workflow_id, environment_id),
  CONSTRAINT test_workflow_environments_workflow_id_fkey FOREIGN KEY (workflow_id) REFERENCES public.test_workflows(id) ON DELETE CASCADE,
  CONSTRAINT test_workflow_environments_environment_id_fkey FOREIGN KEY (environment_id) REFERENCES public.test_environments(id) ON DELETE CASCADE
);

-- 3. Create indexes for performance
CREATE INDEX idx_workflow_environments_workflow ON public.test_workflow_environments(workflow_id);
CREATE INDEX idx_workflow_environments_environment ON public.test_workflow_environments(environment_id);
CREATE INDEX idx_environments_business_unit ON public.test_environments(business_unit_id);
CREATE INDEX idx_workflows_business_unit ON public.test_workflows(business_unit_id);

-- 4. Enable Row Level Security (RLS) - Optional but recommended
ALTER TABLE public.test_environments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_workflow_environments ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS Policies (Simple example - allow authenticated users full access)
-- You might want to refine this to only allow owners or team members
CREATE POLICY "Allow full access to authenticated users" ON public.test_environments
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow full access to authenticated users" ON public.test_workflow_environments
  FOR ALL USING (auth.role() = 'authenticated');
