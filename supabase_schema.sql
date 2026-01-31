-- HyperFlow Database Schema
-- Run this in Supabase SQL Editor to create all required tables
-- All tables prefixed with test_ for testing

-- ===========================================
-- 1. CLIENTS TABLE
-- ===========================================
CREATE TABLE test_clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    owner_id UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_test_clients_owner_id ON test_clients(owner_id);
CREATE INDEX idx_test_clients_created_at ON test_clients(created_at DESC);

-- ===========================================
-- 2. BUSINESS UNITS TABLE
-- ===========================================
CREATE TABLE test_business_units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    client_id UUID NOT NULL REFERENCES test_clients(id) ON DELETE CASCADE,
    owner_id UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_test_business_units_client_id ON test_business_units(client_id);
CREATE INDEX idx_test_business_units_owner_id ON test_business_units(owner_id);
CREATE INDEX idx_test_business_units_created_at ON test_business_units(created_at DESC);

-- ===========================================
-- 3. WORKFLOWS TABLE
-- ===========================================
CREATE TABLE test_workflows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    business_unit_id UUID NOT NULL REFERENCES test_business_units(id) ON DELETE CASCADE,
    owner_id UUID NOT NULL,
    flow_data JSONB DEFAULT '{"nodes": [], "edges": [], "flowInputs": "", "flowOutputs": ""}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_test_workflows_business_unit_id ON test_workflows(business_unit_id);
CREATE INDEX idx_test_workflows_owner_id ON test_workflows(owner_id);
CREATE INDEX idx_test_workflows_created_at ON test_workflows(created_at DESC);

-- ===========================================
-- 4. BU PERMISSIONS TABLE (for sharing)
-- ===========================================
CREATE TABLE test_bu_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_unit_id UUID NOT NULL REFERENCES test_business_units(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('viewer', 'editor')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(business_unit_id, user_id)
);

CREATE INDEX idx_test_bu_permissions_business_unit_id ON test_bu_permissions(business_unit_id);
CREATE INDEX idx_test_bu_permissions_user_id ON test_bu_permissions(user_id);

-- ===========================================
-- 5. UPDATE TIMESTAMP TRIGGERS
-- ===========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_test_clients_updated_at
    BEFORE UPDATE ON test_clients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_test_business_units_updated_at
    BEFORE UPDATE ON test_business_units
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_test_workflows_updated_at
    BEFORE UPDATE ON test_workflows
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
