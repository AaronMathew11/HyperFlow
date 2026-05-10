#!/usr/bin/env python3
"""
Complete validation to ensure no APIs are missed
Cross-references multiple discovery methods
"""

import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import json
import re

def comprehensive_validation():
    """Validate that we have found all APIs"""
    
    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    })
    
    base_url = "https://documentation.hyperverge.co"
    
    print("🔍 COMPREHENSIVE API VALIDATION")
    print("="*50)
    
    # Load our current collection
    with open('hyperverge_api_documentation.json', 'r') as f:
        current_data = json.load(f)
    
    current_urls = set()
    for api in current_data['india_apis']:
        current_urls.add(api['url'])
    for api in current_data['global_apis']:
        current_urls.add(api['url'])
    
    print(f"Current collection: {len(current_urls)} APIs")
    
    # Method 1: Exhaustive sitemap crawling
    print("\n📊 METHOD 1: Exhaustive Crawling")
    all_found_urls = exhaustive_crawl(session, base_url)
    
    # Method 2: Keyword-based search
    print("\n🔎 METHOD 2: Keyword Pattern Matching")  
    keyword_urls = keyword_pattern_search(session, base_url)
    
    # Method 3: Manual verification of known patterns
    print("\n🎯 METHOD 3: Pattern-Based Discovery")
    pattern_urls = pattern_based_discovery(session, base_url)
    
    # Combine all methods
    all_discovered = set(all_found_urls + keyword_urls + pattern_urls)
    
    # Filter for actual API endpoints
    api_endpoints = []
    for url in all_discovered:
        if is_likely_api_endpoint(url):
            api_endpoints.append(url)
    
    api_endpoints = list(set(api_endpoints))
    
    print(f"\n📈 DISCOVERY SUMMARY:")
    print(f"Method 1 (Exhaustive): {len(all_found_urls)} URLs")
    print(f"Method 2 (Keywords): {len(keyword_urls)} URLs")  
    print(f"Method 3 (Patterns): {len(pattern_urls)} URLs")
    print(f"Total discovered: {len(all_discovered)} URLs")
    print(f"Filtered API endpoints: {len(api_endpoints)} APIs")
    
    # Find missing APIs
    missing_apis = []
    for api_url in api_endpoints:
        if api_url not in current_urls:
            missing_apis.append(api_url)
    
    print(f"\n❌ MISSING APIs: {len(missing_apis)}")
    print("="*50)
    
    if missing_apis:
        for i, api_url in enumerate(missing_apis, 1):
            print(f"{i:3d}. {api_url}")
            
        # Save missing APIs
        with open('missing_apis.txt', 'w') as f:
            for api_url in missing_apis:
                f.write(api_url + '\n')
        
        print(f"\n💾 Missing APIs saved to missing_apis.txt")
    else:
        print("✅ No missing APIs found! Collection appears complete.")
    
    return missing_apis

def exhaustive_crawl(session, base_url, max_depth=4):
    """Exhaustively crawl all pages to find API URLs"""
    
    visited = set()
    to_visit = [
        "/api-reference/india_api/",
        "/api-reference/global_api/",
        "/api-reference/USA APIs/",
        "/api-reference/Vietnam APIs/", 
        "/api-reference/Africa APIs/"
    ]
    found_urls = []
    
    def crawl_page(path, depth=0):
        if depth > max_depth or path in visited:
            return
        
        visited.add(path)
        url = urljoin(base_url, path)
        
        try:
            response = session.get(url, timeout=20)
            if response.status_code != 200:
                return
            
            soup = BeautifulSoup(response.content, 'html.parser')
            links = soup.find_all('a', href=True)
            
            for link in links:
                href = link.get('href')
                if href and href.startswith('/api-reference/'):
                    full_url = urljoin(base_url, href)
                    found_urls.append(full_url)
                    
                    # Continue crawling if it's a category page
                    if href.count('/') <= 4:
                        crawl_page(href, depth + 1)
        except:
            pass
    
    for start_path in to_visit:
        crawl_page(start_path)
    
    return list(set(found_urls))

def keyword_pattern_search(session, base_url):
    """Search for APIs using keyword patterns"""
    
    # Common API endpoint patterns
    api_keywords = [
        'enrol', 'enroll', 'register', 'submit', 'process', 'analyze',
        'validate', 'verify', 'check', 'lookup', 'fetch', 'get', 'post',
        'upload', 'download', 'extract', 'detect', 'match', 'search',
        'consent', 'request', 'status', 'data', 'report', 'monitoring'
    ]
    
    # Try constructing potential URLs
    potential_urls = []
    
    base_paths = [
        "/api-reference/india_api/",
        "/api-reference/global_api/",
        "/api-reference/global_api/AML Ongoing Monitoring/",
        "/api-reference/global_api/Emirates Verification APIs/",
        "/api-reference/global_api/Video KYC APIs/",
        "/api-reference/india_api/Account Aggregator APIs/",
        "/api-reference/india_api/Bank Account Verification APIs/",
        "/api-reference/india_api/CKYC APIs/",
        "/api-reference/india_api/Digilocker APIs/"
    ]
    
    for base_path in base_paths:
        for keyword in api_keywords:
            potential_urls.append(f"{base_url}{base_path}{keyword}_api")
            potential_urls.append(f"{base_url}{base_path}{keyword}")
    
    # Test each potential URL
    valid_urls = []
    for url in potential_urls:
        try:
            response = session.head(url, timeout=10)
            if response.status_code == 200:
                valid_urls.append(url)
        except:
            pass
    
    return valid_urls

def pattern_based_discovery(session, base_url):
    """Discover APIs based on known documentation patterns"""
    
    # Known category pages that might contain nested APIs
    category_pages = [
        "/api-reference/global_api/AML Ongoing Monitoring/",
        "/api-reference/global_api/Emirates Verification APIs/", 
        "/api-reference/global_api/Video KYC APIs/",
        "/api-reference/global_api/ID Card Validation/",
        "/api-reference/india_api/Account Aggregator APIs/",
        "/api-reference/india_api/Bank Account Verification APIs/",
        "/api-reference/india_api/CKYC APIs/",
        "/api-reference/india_api/Central DB Check APIs/",
        "/api-reference/india_api/Crime Detection APIs/",
        "/api-reference/india_api/Deduplication APIs/",
        "/api-reference/india_api/Digilocker APIs/",
        "/api-reference/india_api/EPFO APIs/",
        "/api-reference/india_api/ESign APIs/",
        "/api-reference/india_api/Face Authentication APIs/",
        "/api-reference/india_api/GST Authentication APIs/"
    ]
    
    found_apis = []
    
    for category_path in category_pages:
        category_url = urljoin(base_url, category_path)
        try:
            response = session.get(category_url, timeout=20)
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')
                
                # Look for all links in this category
                links = soup.find_all('a', href=True)
                for link in links:
                    href = link.get('href')
                    if href and href.startswith('/api-reference/') and len(href) > len(category_path):
                        full_url = urljoin(base_url, href)
                        found_apis.append(full_url)
        except:
            pass
    
    return found_apis

def is_likely_api_endpoint(url):
    """Determine if URL is likely an API endpoint"""
    
    # Skip certain patterns
    skip_patterns = [
        r'/api-reference/$', 
        r'/api-reference$',
        r'introduction', r'overview', r'changelog',
        r'getting-started', r'authentication'
    ]
    
    for pattern in skip_patterns:
        if re.search(pattern, url.lower()):
            return False
    
    # API indicators
    api_indicators = [
        r'_api$', r'_api/', r'/api/',
        r'verification', r'validation', r'extraction', r'lookup',
        r'fetch', r'check', r'analysis', r'match', r'consent',
        r'enrol', r'upload', r'download', r'submit', r'process'
    ]
    
    for indicator in api_indicators:
        if re.search(indicator, url.lower()):
            return True
    
    # Deep nested URLs (3+ levels) are likely APIs
    if url.count('/') >= 5:
        return True
    
    return False

if __name__ == "__main__":
    missing_apis = comprehensive_validation()
    
    if missing_apis:
        print(f"\n🚨 Action needed: {len(missing_apis)} APIs need to be extracted")
        print("Run the missing APIs through extract_specific_api.py")
    else:
        print("\n✅ Validation complete: No missing APIs detected")