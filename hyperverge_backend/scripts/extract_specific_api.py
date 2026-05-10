#!/usr/bin/env python3
"""
Extract specific API documentation from HyperVerge
"""

import requests
import json
from bs4 import BeautifulSoup
import re
import sys
import os

# Add the main scraper's path to use its classes
sys.path.append(os.path.dirname(__file__))
from hyperverge_api_scraper import HyperVergeAPIScraper

def extract_specific_api(api_url):
    """Extract a specific API and append to existing data"""
    
    scraper = HyperVergeAPIScraper()
    
    print(f"Extracting API: {api_url}")
    api_details = scraper.extract_api_details(api_url)
    
    # Load existing data
    try:
        with open('hyperverge_api_documentation.json', 'r') as f:
            existing_data = json.load(f)
    except FileNotFoundError:
        existing_data = {"india_apis": [], "global_apis": []}
    
    # Determine if this is an India or Global API
    if 'india_api' in api_url:
        api_category = 'india_apis'
    else:
        api_category = 'global_apis'
    
    # Check if this API already exists
    api_exists = any(api['url'] == api_url for api in existing_data[api_category])
    
    if not api_exists:
        # Add to appropriate category
        existing_data[api_category].append(api_details)
        print(f"Added new {api_category[:-5]} API: {api_details.get('name', 'Unknown')}")
    else:
        # Update existing entry
        for i, api in enumerate(existing_data[api_category]):
            if api['url'] == api_url:
                existing_data[api_category][i] = api_details
                print(f"Updated existing {api_category[:-5]} API: {api_details.get('name', 'Unknown')}")
                break
    
    # Save updated data
    with open('hyperverge_api_documentation.json', 'w') as f:
        json.dump(existing_data, f, indent=2, ensure_ascii=False)
    
    print(f"Updated file saved with {len(existing_data['india_apis'])} India APIs and {len(existing_data['global_apis'])} Global APIs")

if __name__ == "__main__":
    # Extract specific APIs - the exact one you mentioned that was missed
    apis_to_extract = [
        "https://documentation.hyperverge.co/api-reference/india_api/Deduplication%20APIs/Face/india_face_search_block_api"
    ]
    
    for api_url in apis_to_extract:
        extract_specific_api(api_url)