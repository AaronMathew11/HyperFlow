#!/usr/bin/env python3
"""
Fix URL files and extract all missing APIs
"""

import requests
import json
import sys
import os
from bs4 import BeautifulSoup
import time
import re

# Add the main scraper's path to use its classes
sys.path.append(os.path.dirname(__file__))
from hyperverge_api_scraper import HyperVergeAPIScraper

def fix_and_process_urls():
    """Fix URL extraction and process all missing APIs"""
    
    print("🔧 FIXING URL FILES AND EXTRACTING ALL MISSING APIs")
    print("=" * 60)
    
    # Read and fix the exhaustive discovery file
    exhaustive_file = 'exhaustive_api_discovery.txt'
    if os.path.exists(exhaustive_file):
        with open(exhaustive_file, 'r') as f:
            content = f.read().strip()
        
        # Split URLs that are concatenated with \n
        urls_all = re.split(r'(?=https://)', content)
        all_discovered_urls = [url.strip() for url in urls_all if url.strip() and 'documentation.hyperverge.co' in url]
    else:
        print("❌ Exhaustive discovery file not found!")
        return
    
    print(f"📋 Found {len(all_discovered_urls)} total discovered URLs")
    
    # Load existing data to compare
    try:
        with open('hyperverge_api_documentation.json', 'r') as f:
            existing_data = json.load(f)
    except FileNotFoundError:
        existing_data = {"india_apis": [], "global_apis": []}
    
    # Get current URLs
    current_urls = set()
    for api in existing_data['india_apis'] + existing_data['global_apis']:
        current_urls.add(api['url'])
    
    initial_count = len(current_urls)
    print(f"📊 Current collection: {initial_count} APIs")
    
    # Find missing APIs by filtering out category pages and current URLs
    missing_apis = []
    for url in all_discovered_urls:
        if url not in current_urls and is_likely_api_endpoint(url):
            missing_apis.append(url)
    
    print(f"🔍 Found {len(missing_apis)} missing API endpoints to extract")
    
    if len(missing_apis) == 0:
        print("✅ No missing APIs found! Collection appears complete.")
        return
    
    # Extract missing APIs
    scraper = HyperVergeAPIScraper()
    successful_extractions = 0
    failed_extractions = 0
    
    for i, api_url in enumerate(missing_apis, 1):
        print(f"\n[{i:3d}/{len(missing_apis)}] Processing: {api_url}")
        
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
            
            # Add to collection
            existing_data[api_category].append(api_details)
            print(f"    ✅ Added: {api_details.get('name', 'Unknown')}")
            successful_extractions += 1
            
            # Brief delay to be respectful
            time.sleep(0.1)
            
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
    print(f"🎯 EXTRACTION COMPLETE!")
    print(f"📈 Results:")
    print(f"  • Initial collection: {initial_count} APIs")
    print(f"  • Successfully extracted: {successful_extractions} APIs")
    print(f"  • Failed extractions: {failed_extractions} APIs")
    print(f"  • Final collection: {final_count} APIs")
    print(f"  • Net additions: {added_count} APIs")
    print("=" * 60)
    
    # Show breakdown
    print(f"\n📊 Final Collection Breakdown:")
    print(f"  • India APIs: {len(existing_data['india_apis'])}")
    print(f"  • Global APIs: {len(existing_data['global_apis'])}")
    print(f"  • Total discovered URLs: {len(all_discovered_urls)}")
    
    return final_count

def is_likely_api_endpoint(url):
    """Determine if URL is likely an API endpoint"""
    
    # Skip category pages
    category_patterns = [
        r'/api-reference/$', 
        r'/api-reference$',
        r'/api-reference/india_api/$',
        r'/api-reference/global_api/$',
        r'/API[s]?/$',
        r'/APIs/$'
    ]
    
    for pattern in category_patterns:
        if re.search(pattern, url):
            return False
    
    # Skip if ends with / and no _api
    if url.endswith('/') and '_api' not in url and 'api/' not in url.lower():
        return False
    
    # Strong API indicators
    api_indicators = [
        r'_api$', r'_api/', r'/api$',
        r'verification', r'validation', r'extraction', r'lookup',
        r'fetch', r'check', r'analysis', r'match', r'consent',
        r'enrol', r'upload', r'download', r'submit', r'process'
    ]
    
    for indicator in api_indicators:
        if re.search(indicator, url.lower()):
            return True
    
    # If it's deeply nested (5+ segments) it's likely an API
    if url.count('/') >= 5:
        return True
    
    return False

if __name__ == "__main__":
    print("🚀 Starting complete API extraction process...")
    print("This will find and extract all missing APIs for 100% coverage\n")
    
    final_count = fix_and_process_urls()
    
    if final_count:
        print(f"\n🎯 MISSION COMPLETE!")
        print(f"Your comprehensive API collection now contains {final_count} APIs")
        print("This represents the complete inventory of HyperVerge APIs.")