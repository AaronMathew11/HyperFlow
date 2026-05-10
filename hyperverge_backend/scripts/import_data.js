#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the JSON file
const jsonPath = path.join(__dirname, 'hyperverge_api_documentation.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

console.log('HyperVerge API Documentation Data Import Script');
console.log('==============================================');

const indiaApiCount = data.india_apis ? data.india_apis.length : 0;
const globalApiCount = data.global_apis ? data.global_apis.length : 0;
const totalApis = indiaApiCount + globalApiCount;

console.log(`Found ${indiaApiCount} India APIs and ${globalApiCount} Global APIs`);
console.log(`Total APIs to import: ${totalApis}`);

// Generate SQL INSERT statements
let sqlStatements = [];

// Function to escape SQL strings
function escapeSqlString(str) {
    if (!str) return "''";
    return "'" + str.replace(/\\/g, '\\\\').replace(/'/g, "''") + "'";
}

// Function to properly escape JSON for PostgreSQL
function escapeJsonForSql(obj) {
    if (!obj) return "'{}'::jsonb";
    try {
        const jsonStr = JSON.stringify(obj);
        // Escape backslashes first, then single quotes
        const escaped = jsonStr.replace(/\\/g, '\\\\').replace(/'/g, "''");
        return "'" + escaped + "'::jsonb";
    } catch (e) {
        console.warn('Failed to stringify JSON object:', obj);
        return "'{}'::jsonb";
    }
}

// Function to generate UUID (for demonstration - in real DB this would be auto-generated)
function generateUUID() {
    return 'gen_random_uuid()';
}

// Process India APIs
if (data.india_apis) {
    data.india_apis.forEach((api, index) => {
        const apiId = `api_${Date.now()}_${index}`;
        
        // Main API documentation insert
        sqlStatements.push(`
-- India API ${index + 1}: ${api.name}
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    ${generateUUID()},
    ${escapeSqlString(api.name)},
    ${escapeSqlString(api.description)},
    ${escapeSqlString(api.url)},
    'india_api',
    ${escapeSqlString(api.curl_example)},
    ${escapeJsonForSql(api.success_response)},
    ${escapeJsonForSql(api.failure_responses)},
    ${escapeJsonForSql(api.error_details)}
);`);

        // Note: For inputs/outputs, we'd need the actual API ID after insert
        // This is a limitation of static SQL generation
    });
}

// Process Global APIs
if (data.global_apis) {
    data.global_apis.forEach((api, index) => {
        const apiId = `global_api_${Date.now()}_${index}`;
        
        sqlStatements.push(`
-- Global API ${index + 1}: ${api.name}
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    ${generateUUID()},
    ${escapeSqlString(api.name)},
    ${escapeSqlString(api.description)},
    ${escapeSqlString(api.url)},
    'global_api',
    ${escapeSqlString(api.curl_example)},
    ${escapeJsonForSql(api.success_response)},
    ${escapeJsonForSql(api.failure_responses)},
    ${escapeJsonForSql(api.error_details)}
);`);
    });
}

// Write SQL file
const sqlContent = `-- Auto-generated SQL for importing HyperVerge API Documentation
-- Generated on: ${new Date().toISOString()}
-- Total APIs: ${totalApis}

BEGIN;

${sqlStatements.join('\n')}

COMMIT;

-- Note: This script only imports the main API documentation.
-- For a complete import including inputs/outputs, use the Go import script
-- or run the API endpoints to create complete records.
`;

const outputPath = path.join(__dirname, '..', 'import_api_data.sql');
fs.writeFileSync(outputPath, sqlContent);

console.log(`\n✅ SQL import file generated: ${outputPath}`);
console.log('\nTo import the data:');
console.log('1. Run the migration first: migration_api_documentation.sql');
console.log('2. Then run the data import: import_api_data.sql');
console.log('3. Or use the Go import script for complete data with inputs/outputs');

console.log('\nOptions for importing:');
console.log('Option 1 - Manual SQL:');
console.log('  Copy the content from import_api_data.sql to Supabase SQL Editor');
console.log('');
console.log('Option 2 - Go Script (Recommended):');
console.log('  cd /path/to/hyperverge_backend');
console.log('  export $(grep -v "^#" .env | xargs)');
console.log('  go run cmd/import/main.go');
console.log('');
console.log('Option 3 - API Endpoints:');
console.log('  Use POST /api/documentation endpoint to import via your API');