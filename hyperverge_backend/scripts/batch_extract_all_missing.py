#!/usr/bin/env python3
"""
Batch Extract All Missing APIs
Processes all 169 missing APIs from definitely_missing_apis.txt
"""

import requests
import json
import sys
import os
from bs4 import BeautifulSoup
import time

# Add the main scraper's path to use its classes
sys.path.append(os.path.dirname(__file__))
from hyperverge_api_scraper import HyperVergeAPIScraper

def batch_extract_all_missing():
    """Extract all missing APIs from the file"""
    
    print("🚀 BATCH EXTRACTION OF ALL MISSING APIs")
    print("=" * 60)
    
    # Read missing APIs file
    try:
        with open('definitely_missing_apis.txt', 'r') as f:
            missing_urls = [line.strip() for line in f.readlines() if line.strip()]
    except FileNotFoundError:
        print("❌ definitely_missing_apis.txt not found!")
        return
    
    print(f"📋 Found {len(missing_urls)} missing APIs to extract")
    
    # Load existing data
    try:
        with open('hyperverge_api_documentation.json', 'r') as f:
            existing_data = json.load(f)
    except FileNotFoundError:
        existing_data = {"india_apis": [], "global_apis": []}
    
    initial_count = len(existing_data['india_apis']) + len(existing_data['global_apis'])
    print(f"📊 Current collection: {initial_count} APIs")
    
    scraper = HyperVergeAPIScraper()
    
    successful_extractions = 0
    failed_extractions = 0
    skipped_category_pages = 0
    
    for i, api_url in enumerate(missing_urls, 1):
        print(f"\n[{i:3d}/{len(missing_urls)}] Processing: {api_url}")
        
        # Skip category pages and non-API endpoints
        if is_category_page(api_url):
            print(f"    ⏭️  Skipping category page")
            skipped_category_pages += 1
            continue
        
        try:
            # Extract API details
            api_details = scraper.extract_api_details(api_url)
            
            if not api_details or not api_details.get('name'):
                print(f"    ❌ Failed to extract valid data")
                failed_extractions += 1
                continue
            
            # Determine category
            if 'india_api' in api_url:
                api_category = 'india_apis'
            else:
                api_category = 'global_apis'
            
            # Check if already exists
            api_exists = any(api['url'] == api_url for api in existing_data[api_category])
            
            if not api_exists:
                existing_data[api_category].append(api_details)
                print(f"    ✅ Added: {api_details.get('name', 'Unknown')}")
                successful_extractions += 1
            else:
                print(f"    ⚠️  Already exists, skipping")
            
            # Brief delay to be respectful
            time.sleep(0.2)
            
        except Exception as e:
            print(f"    ❌ Error: {e}")
            failed_extractions += 1
            continue
    
    # Save updated data
    with open('hyperverge_api_documentation.json', 'w') as f:
        json.dump(existing_data, f, indent=2, ensure_ascii=False)
    
    final_count = len(existing_data['india_apis']) + len(existing_data['global_apis'])
    added_count = final_count - initial_count
    
    print(f"\n" + "=" * 60)
    print(f"🎯 BATCH EXTRACTION COMPLETE!")
    print(f"📈 Results:")
    print(f"  • Initial collection: {initial_count} APIs")
    print(f"  • Successfully extracted: {successful_extractions} APIs")
    print(f"  • Failed extractions: {failed_extractions} APIs")
    print(f"  • Skipped category pages: {skipped_category_pages} pages")
    print(f"  • Final collection: {final_count} APIs")
    print(f"  • Net additions: {added_count} APIs")
    print("=" * 60)
    
    # Show breakdown
    print(f"\n📊 Final Collection Breakdown:")
    print(f"  • India APIs: {len(existing_data['india_apis'])}")
    print(f"  • Global APIs: {len(existing_data['global_apis'])}")
    
    if failed_extractions > 0:
        print(f"\n⚠️  {failed_extractions} extractions failed - check logs above")
    
    return final_count

def is_category_page(url):
    """Determine if URL is a category page rather than an API endpoint"""
    
    # Category indicators
    category_patterns = [
        '/api-reference/india_api/$',
        '/api-reference/global_api/$',
        '/api-reference/India APIs/$',
        '/api-reference/Global APIs/$',
        '/api-reference/USA APIs/$',
        '/api-reference/Africa APIs/$',
        '/api-reference/Vietnam APIs/$'
    ]
    
    # Check for category patterns
    for pattern in category_patterns:
        if url.endswith(pattern.replace('$', '')):
            return True
    
    # If it ends with / and doesn't have _api, it's likely a category
    if url.endswith('/') and '_api' not in url and 'api/' not in url.lower():
        return True
    
    # Known category paths
    category_keywords = [
        '/APIs/$', '/apis/$',
        'introduction', 'overview', 'changelog', 'getting-started'
    ]
    
    for keyword in category_keywords:
        if keyword in url:
            return True
    
    return False

if __name__ == "__main__":
    print("🚀 Starting batch extraction of all missing APIs...")
    print("This will extract all 169 missing APIs for complete coverage\n")
    
    final_count = batch_extract_all_missing()
    
    print(f"\n🎯 MISSION COMPLETE!")
    print(f"Your comprehensive API collection now contains {final_count} APIs")
    print("This should represent complete coverage of all HyperVerge APIs.")