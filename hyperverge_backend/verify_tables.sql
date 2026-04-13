-- Verify that the migration created all tables successfully

-- 1. Check if tables exist
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('api_documentation', 'api_inputs', 'api_outputs')
ORDER BY table_name;

-- 2. Check table structure
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name IN ('api_documentation', 'api_inputs', 'api_outputs')
ORDER BY table_name, ordinal_position;

-- 3. Check constraints and foreign keys
SELECT 
  tc.table_name,
  tc.constraint_name,
  tc.constraint_type,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints tc
LEFT JOIN information_schema.key_column_usage kcu 
  ON tc.constraint_name = kcu.constraint_name
LEFT JOIN information_schema.constraint_column_usage ccu 
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.table_schema = 'public'
  AND tc.table_name IN ('api_documentation', 'api_inputs', 'api_outputs')
ORDER BY tc.table_name, tc.constraint_type;

-- 4. Check indexes
SELECT 
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('api_documentation', 'api_inputs', 'api_outputs')
ORDER BY tablename, indexname;