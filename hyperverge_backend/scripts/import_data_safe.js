#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the JSON file
const jsonPath = path.join(__dirname, 'hyperverge_api_documentation.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

console.log('HyperVerge API Documentation Data Import Script (Safe Version)');
console.log('==============================================================');

const indiaApiCount = data.india_apis ? data.india_apis.length : 0;
const globalApiCount = data.global_apis ? data.global_apis.length : 0;
const totalApis = indiaApiCount + globalApiCount;

console.log(`Found ${indiaApiCount} India APIs and ${globalApiCount} Global APIs`);
console.log(`Total APIs to import: ${totalApis}`);

// Generate SQL INSERT statements
let sqlStatements = [];

// Function to safely escape SQL strings
function escapeSqlString(str) {
    if (!str) return "NULL";
    // Remove problematic characters that could break SQL
    const cleaned = str
        .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control characters
        .replace(/'/g, "''") // Escape single quotes
        .replace(/\\/g, '\\\\') // Escape backslashes
        .substring(0, 8000); // Limit length to avoid very long strings
    
    return "'" + cleaned + "'";
}

// Function to safely handle JSON data
function safeJsonForSql(obj) {
    if (!obj || (Array.isArray(obj) && obj.length === 0)) {
        return Array.isArray(obj) ? "'[]'::jsonb" : "'{}'::jsonb";
    }
    
    try {
        // Simplify complex objects to avoid SQL issues
        let simplified;
        if (Array.isArray(obj)) {
            // For arrays, keep only simple objects
            simplified = obj.map(item => {
                if (typeof item === 'object' && item !== null) {
                    return {
                        status_code: item.status_code || '',
                        description: (item.description || '').substring(0, 500) + '...', // Truncate long descriptions
                        example_response: (item.example_response || '').substring(0, 200) + '...'
                    };
                }
                return item;
            });
        } else if (typeof obj === 'object') {
            // For objects, keep only simple properties
            simplified = {};
            Object.keys(obj).forEach(key => {
                const value = obj[key];
                if (typeof value === 'string') {
                    simplified[key] = value.substring(0, 1000); // Limit string length
                } else if (typeof value === 'number' || typeof value === 'boolean') {
                    simplified[key] = value;
                } else {
                    simplified[key] = '[Complex Object]';
                }
            });
        } else {
            simplified = obj;
        }
        
        const jsonStr = JSON.stringify(simplified);
        const escaped = jsonStr.replace(/\\/g, '\\\\').replace(/'/g, "''");
        return "'" + escaped + "'::jsonb";
    } catch (e) {
        console.warn('Failed to process JSON object, using empty object');
        return Array.isArray(obj) ? "'[]'::jsonb" : "'{}'::jsonb";
    }
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
    ${safeJsonForSql(api.success_response)},
    ${safeJsonForSql(api.failure_responses)},
    ${safeJsonForSql(api.error_details)}
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
    ${safeJsonForSql(api.success_response)},
    ${safeJsonForSql(api.failure_responses)},
    ${safeJsonForSql(api.error_details)}
);`);
    });
}

// Write SQL file
const sqlContent = `-- Safe SQL Import for HyperVerge API Documentation
-- Generated on: ${new Date().toISOString()}
-- Total APIs: ${sqlStatements.length}
-- 
-- This version uses safer SQL generation to avoid syntax errors
-- Complex JSON objects are simplified to prevent SQL parsing issues

BEGIN;

${sqlStatements.join('\n')}

COMMIT;

-- Verification query to check import
-- SELECT category, COUNT(*) FROM api_documentation GROUP BY category;
`;

const outputPath = path.join(__dirname, '..', 'import_api_data_safe.sql');
fs.writeFileSync(outputPath, sqlContent);

console.log(`\n✅ Safe SQL import file generated: ${outputPath}`);
console.log(`📊 Generated ${sqlStatements.length} SQL INSERT statements`);
console.log('\nTo import the data:');
console.log('1. Copy the content from import_api_data_safe.sql');
console.log('2. Run it in your Supabase SQL Editor');
console.log('3. Verify with: SELECT category, COUNT(*) FROM api_documentation GROUP BY category;');