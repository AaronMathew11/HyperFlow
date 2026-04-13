#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the JSON file
const jsonPath = path.join(__dirname, 'hyperverge_api_documentation.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

console.log('HyperVerge API Documentation Data Import Script (Ultra Simple Version)');
console.log('=====================================================================');

const indiaApiCount = data.india_apis ? data.india_apis.length : 0;
const globalApiCount = data.global_apis ? data.global_apis.length : 0;
const totalApis = indiaApiCount + globalApiCount;

console.log(`Found ${indiaApiCount} India APIs and ${globalApiCount} Global APIs`);
console.log(`Total APIs to import: ${totalApis}`);

// Generate SQL INSERT statements
let sqlStatements = [];

// Function to safely escape SQL strings
function escapeSqlString(str) {
    if (!str || typeof str !== 'string') return "NULL";
    
    // Clean and escape the string
    const cleaned = str
        .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control characters
        .replace(/'/g, "''") // Escape single quotes
        .replace(/\\/g, '\\\\') // Escape backslashes
        .substring(0, 8000); // Limit length
    
    return "'" + cleaned + "'";
}

// Process India APIs
if (data.india_apis) {
    data.india_apis.forEach((api, index) => {
        // Skip APIs with missing essential data
        if (!api.name || !api.url) {
            console.log(`Skipping India API ${index + 1}: Missing name or URL`);
            return;
        }

        sqlStatements.push(`
-- India API ${index + 1}: ${(api.name || '').substring(0, 100)}
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    ${escapeSqlString(api.name)},
    ${escapeSqlString((api.description || '').substring(0, 2000))},
    ${escapeSqlString(api.url)},
    'india_api',
    ${escapeSqlString((api.curl_example || '').substring(0, 4000))},
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);`);
    });
}

// Process Global APIs
if (data.global_apis) {
    data.global_apis.forEach((api, index) => {
        // Skip APIs with missing essential data
        if (!api.name || !api.url) {
            console.log(`Skipping Global API ${index + 1}: Missing name or URL`);
            return;
        }

        sqlStatements.push(`
-- Global API ${index + 1}: ${(api.name || '').substring(0, 100)}
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    ${escapeSqlString(api.name)},
    ${escapeSqlString((api.description || '').substring(0, 2000))},
    ${escapeSqlString(api.url)},
    'global_api',
    ${escapeSqlString((api.curl_example || '').substring(0, 4000))},
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);`);
    });
}

// Write SQL file
const sqlContent = `-- Ultra Simple SQL Import for HyperVerge API Documentation
-- Generated on: ${new Date().toISOString()}
-- Total APIs: ${sqlStatements.length}
-- 
-- This version imports only the essential fields to avoid JSON parsing issues
-- Complex JSON fields are set to empty objects/arrays and can be updated later

BEGIN;

${sqlStatements.join('\n')}

COMMIT;

-- Verification query to check import
-- SELECT category, COUNT(*) FROM api_documentation GROUP BY category;

-- Optional: Update complex JSON data later using the API endpoints
-- POST /api/documentation/:id with the full JSON data
`;

const outputPath = path.join(__dirname, '..', 'import_api_data_simple.sql');
fs.writeFileSync(outputPath, sqlContent);

console.log(`\n✅ Ultra simple SQL import file generated: ${outputPath}`);
console.log(`📊 Generated ${sqlStatements.length} SQL INSERT statements`);
console.log('\nThis version imports:');
console.log('✅ API name, description, URL, category, curl_example');  
console.log('⚠️  JSON fields set to empty (can be updated later via API)');
console.log('\nTo import the data:');
console.log('1. Copy the content from import_api_data_simple.sql');
console.log('2. Run it in your Supabase SQL Editor');
console.log('3. Verify with: SELECT category, COUNT(*) FROM api_documentation GROUP BY category;');
console.log('\nTo add the complex JSON data later:');
console.log('- Use the Go import script (after fixing permissions)');
console.log('- Or use the API endpoints to update individual records');