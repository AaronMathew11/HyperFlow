# HyperVerge API Documentation Scraper

This Python script scrapes the HyperVerge API documentation portal to extract comprehensive API information for both India and Global APIs.

## Features

The scraper extracts the following information for each API:
1. **API Inputs** - Parameters, types, descriptions, and required status
2. **API Outputs** - Response fields and structures  
3. **API cURL** - Complete cURL command examples
4. **API Success Response** - Example successful response payloads
5. **API Failure Responses** - Error responses and status codes
6. **Error Response Details** - Status codes, error messages, and descriptions

## Installation

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

## Usage

### Method 1: Environment Variables (Recommended)

Set your HyperVerge documentation portal credentials as environment variables:

```bash
export HYPERVERGE_USERNAME="your_username"
export HYPERVERGE_PASSWORD="your_password"
```

Then run the scraper:
```bash
python hyperverge_api_scraper.py
```

### Method 2: Modify Script

Alternatively, you can modify the script directly to include your credentials:

1. Open `hyperverge_api_scraper.py`
2. In the `main()` function, replace:
   ```python
   username = os.getenv('HYPERVERGE_USERNAME')
   password = os.getenv('HYPERVERGE_PASSWORD')
   ```
   
   With:
   ```python
   username = "your_username"
   password = "your_password"
   ```

## Output

The scraper generates a JSON file named `hyperverge_api_documentation.json` with the following structure:

```json
{
  "india_apis": [
    {
      "url": "https://documentation.hyperverge.co/api-reference/india-api-endpoint",
      "name": "API Name",
      "description": "API description",
      "inputs": [
        {
          "name": "parameter_name",
          "type": "string",
          "description": "Parameter description",
          "required": true
        }
      ],
      "outputs": [
        {
          "name": "response_field",
          "type": "object",
          "description": "Response field description"
        }
      ],
      "curl_example": "curl -X POST https://api.hyperverge.co/endpoint...",
      "success_response": {
        "status": "success",
        "result": {}
      },
      "failure_responses": [],
      "error_details": [
        {
          "status_code": "400",
          "description": "Bad Request - Invalid parameters",
          "example_response": "{\"error\": \"Invalid input\"}"
        }
      ]
    }
  ],
  "global_apis": [
    // Similar structure for global APIs
  ]
}
```

## Error Handling

The scraper includes robust error handling for:
- Authentication failures
- Network timeouts
- Missing documentation sections
- Malformed HTML content
- Rate limiting (includes 1-second delays between requests)

## Customization

You can customize the scraper by modifying:

- **Base URL**: Change `base_url` in the `HyperVergeAPIScraper` constructor
- **Timeout Settings**: Modify timeout values in requests
- **Extraction Logic**: Update the `_extract_parameters()` and `_extract_error_details()` methods
- **Output Format**: Modify the `save_to_file()` method for different output formats

## Troubleshooting

1. **Authentication Issues**: Verify your credentials and ensure you have access to the documentation portal
2. **Network Errors**: Check your internet connection and proxy settings
3. **Missing Data**: The documentation structure may have changed - review the HTML parsing logic
4. **Rate Limiting**: The scraper includes delays, but you may need to increase them if you encounter rate limits

## Security Notes

- Never commit credentials to version control
- Use environment variables for credentials
- Consider using a dedicated service account for scraping
- Respect the website's robots.txt and terms of service