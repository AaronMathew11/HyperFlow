#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// This script would import via API endpoints after authentication
// For now, it generates the data structure needed

const jsonPath = path.join(__dirname, 'hyperverge_api_documentation.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

console.log('API Import Data Generator');
console.log('========================');

let validApis = [];

// Process India APIs
if (data.india_apis) {
    data.india_apis.forEach((api, index) => {
        if (api.name && api.url) {
            validApis.push({
                name: api.name,
                description: api.description || '',
                url: api.url,
                category: 'india_api',
                curl_example: api.curl_example || '',
                success_response: api.success_response || {},
                failure_responses: api.failure_responses || [],
                error_details: api.error_details || [],
                inputs: (api.inputs || []).map(input => ({
                    name: input.name || '',
                    type: input.type || '',
                    description: input.description || '',
                    required: input.required || false
                })),
                outputs: (api.outputs || []).map(output => ({
                    name: output.name || '',
                    type: output.type || '',  
                    description: output.description || '',
                    required: output.required || false
                }))
            });
        }
    });
}

// Process Global APIs  
if (data.global_apis) {
    data.global_apis.forEach((api, index) => {
        if (api.name && api.url) {
            validApis.push({
                name: api.name,
                description: api.description || '',
                url: api.url,
                category: 'global_api',
                curl_example: api.curl_example || '',
                success_response: api.success_response || {},
                failure_responses: api.failure_responses || [],
                error_details: api.error_details || [],
                inputs: (api.inputs || []).map(input => ({
                    name: input.name || '',
                    type: input.type || '',
                    description: input.description || '',
                    required: input.required || false
                })),
                outputs: (api.outputs || []).map(output => ({
                    name: output.name || '',
                    type: output.type || '',
                    description: output.description || '',
                    required: output.required || false
                }))
            });
        }
    });
}

// Save cleaned data
const outputPath = path.join(__dirname, '..', 'api_data_for_import.json');
fs.writeFileSync(outputPath, JSON.stringify({ apis: validApis }, null, 2));

console.log(`✅ Generated clean JSON data: ${outputPath}`);
console.log(`📊 ${validApis.length} valid APIs ready for import`);
console.log('\nData breakdown:');

const indiaCount = validApis.filter(api => api.category === 'india_api').length;
const globalCount = validApis.filter(api => api.category === 'global_api').length;

console.log(`- India APIs: ${indiaCount}`);
console.log(`- Global APIs: ${globalCount}`);
console.log(`- Total: ${validApis.length}`);

console.log('\nNext steps:');
console.log('1. Use import_api_data_simple.sql for basic data import');
console.log('2. Use the Go script or API endpoints to add full JSON data');
console.log('3. Or use this cleaned JSON file with a custom import script');