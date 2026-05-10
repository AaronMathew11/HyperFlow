# API Documentation Data Import Guide

This guide explains how to import your local `hyperverge_api_documentation.json` data into the Supabase database.

## Prerequisites

1. **Database Migration**: Ensure you've run the table creation migration first
   ```sql
   -- Run this in Supabase SQL Editor
   -- Copy content from: migration_api_documentation.sql
   ```

2. **Environment Setup**: Make sure your `.env` file contains:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_anon_key
   ```

## Import Options

### Option 1: Go Script (Recommended) - Complete Import

**Best for**: Complete import with inputs, outputs, and full data relationships

```bash
cd /Users/aaronmathew/Projects/Hypervision/hyperverge_backend

# Load environment variables
export $(grep -v "^#" .env | xargs)

# Run the import
go run cmd/import/main.go
```

**Features:**
- ✅ Imports all API documentation
- ✅ Includes input parameters
- ✅ Includes output parameters  
- ✅ Maintains data relationships
- ✅ Progress tracking
- ✅ Error handling

### Option 2: SQL File Import - Basic Import

**Best for**: Quick import of main API data only

1. **Generate SQL file:**
   ```bash
   cd /Users/aaronmathew/Projects/Hypervision/hyperverge_backend/scripts
   node import_data.js
   ```

2. **Run in Supabase:**
   - Copy content from `import_api_data.sql`
   - Paste into Supabase SQL Editor
   - Execute

**Features:**
- ✅ Fast import of main API data
- ❌ No input/output parameters
- ❌ Limited error handling

### Option 3: API Endpoints - Programmatic Import

**Best for**: Automated workflows or custom import logic

```javascript
// Example: Import via API endpoints
const apiData = {
  name: "API Name",
  description: "API Description", 
  url: "https://documentation.hyperverge.co/api-reference/...",
  category: "india_api", // or "global_api"
  curl_example: "curl ...",
  success_response: {},
  failure_responses: [],
  error_details: [],
  inputs: [
    {
      name: "parameter_name",
      type: "string",
      description: "Parameter description",
      required: true
    }
  ],
  outputs: [
    {
      name: "response_field", 
      type: "string",
      description: "Response description",
      required: false
    }
  ]
};

fetch('/api/documentation', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your_jwt_token'
  },
  body: JSON.stringify(apiData)
});
```

## Data Structure

The import process handles this JSON structure:

```json
{
  "india_apis": [
    {
      "url": "string",
      "name": "string", 
      "description": "string",
      "inputs": [
        {
          "name": "string",
          "type": "string", 
          "description": "string",
          "required": boolean
        }
      ],
      "outputs": [...],
      "curl_example": "string",
      "success_response": {},
      "failure_responses": [],
      "error_details": []
    }
  ],
  "global_apis": [...]
}
```

## Database Tables Created

After successful import, you'll have:

### `api_documentation` table
- Main API information
- Categories: `india_api` or `global_api`
- cURL examples and response data

### `api_inputs` table  
- Input parameters for each API
- Linked to `api_documentation` via foreign key

### `api_outputs` table
- Output parameters for each API  
- Linked to `api_documentation` via foreign key

## Verification

After import, verify the data:

```sql
-- Check total count
SELECT 
  category,
  COUNT(*) as api_count
FROM api_documentation 
GROUP BY category;

-- Check inputs/outputs
SELECT 
  ad.name,
  COUNT(ai.id) as input_count,
  COUNT(ao.id) as output_count
FROM api_documentation ad
LEFT JOIN api_inputs ai ON ad.id = ai.api_id
LEFT JOIN api_outputs ao ON ad.id = ao.api_id
GROUP BY ad.id, ad.name
LIMIT 10;
```

## Troubleshooting

### Environment Variables Not Found
```bash
# Fix: Export variables correctly
export $(cat .env | grep -v '^#' | xargs)
```

### Permission Denied
- Ensure RLS policies allow authenticated users to insert
- Check if you need service role key instead of anon key

### Duplicate URL Errors  
- URLs have unique constraint
- Clean existing data or handle duplicates in script

### Large Dataset Timeouts
- Process in smaller batches
- Use the Go script with built-in progress tracking

## API Endpoints Available

After successful import, these endpoints will work:

- `GET /api/documentation` - List all APIs
- `GET /api/documentation/:id` - Get specific API details
- `GET /api/documentation/search?q=keyword` - Search APIs
- `GET /api/documentation?category=india_api` - Filter by category

## Files Generated

- `migration_api_documentation.sql` - Database schema
- `import_api_data.sql` - Data import SQL (basic)
- `cmd/import/main.go` - Complete Go import script
- `scripts/import_data.js` - SQL generator script