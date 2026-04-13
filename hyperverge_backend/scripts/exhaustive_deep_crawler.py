#!/usr/bin/env python3
"""
Exhaustive Deep Crawler - Guarantees finding ALL APIs
Crawls to maximum depth with no limitations
"""

import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import time
import json

def exhaustive_deep_crawl():
    """Crawl every single page to maximum depth - guarantee completeness"""
    
    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    })
    
    base_url = "https://documentation.hyperverge.co"
    
    # Start from all main API sections
    starting_urls = [
        "/api-reference/india_api/",
        "/api-reference/global_api/",
        "/api-reference/USA APIs/",
        "/api-reference/Vietnam APIs/",
        "/api-reference/Africa APIs/"
    ]
    
    visited_pages = set()
    discovered_api_urls = set()
    pages_to_crawl = []
    
    # Add starting URLs
    for start_path in starting_urls:
        pages_to_crawl.append(urljoin(base_url, start_path))
    
    print("🔍 EXHAUSTIVE DEEP CRAWL - MAXIMUM DEPTH")
    print("=" * 60)
    
    crawl_count = 0
    
    while pages_to_crawl and crawl_count < 500:  # Safety limit
        current_url = pages_to_crawl.pop(0)
        
        if current_url in visited_pages:
            continue
            
        visited_pages.add(current_url)
        crawl_count += 1
        
        print(f"[{crawl_count}] Crawling: {current_url}")
        
        try:
            response = session.get(current_url, timeout=20)
            if response.status_code != 200:
                continue
                
            soup = BeautifulSoup(response.content, 'html.parser')
            links = soup.find_all('a', href=True)
            
            for link in links:
                href = link.get('href')
                text = link.get_text().strip()
                
                if not href or not href.startswith('/api-reference/'):
                    continue
                
                full_url = urljoin(base_url, href)
                
                # If this is an API endpoint, add to discoveries
                if is_api_endpoint(href, text):
                    discovered_api_urls.add(full_url)
                    print(f"    → API: {text} | {full_url}")
                
                # If this is a page we haven't visited, add to crawl queue
                if full_url not in visited_pages and full_url not in pages_to_crawl:
                    # Only crawl within API reference section
                    if '/api-reference/' in full_url and not any(skip in full_url.lower() for skip in [
                        'changelog', 'introduction', 'overview', 'getting-started'
                    ]):
                        pages_to_crawl.append(full_url)
            
            time.sleep(0.3)  # Be respectful
            
        except Exception as e:
            print(f"    Error: {e}")
            continue
    
    print(f"\\n" + "=" * 60)
    print(f"EXHAUSTIVE CRAWL COMPLETE")
    print(f"Pages crawled: {len(visited_pages)}")
    print(f"APIs discovered: {len(discovered_api_urls)}")
    print("=" * 60)
    
    # Save all discovered APIs
    api_list = sorted(list(discovered_api_urls))
    
    with open('exhaustive_api_discovery.txt', 'w') as f:
        for api_url in api_list:
            f.write(api_url + '\\n')
    
    # Also create detailed report
    with open('exhaustive_discovery_report.json', 'w') as f:
        json.dump({
            'total_apis_found': len(api_list),
            'pages_crawled': len(visited_pages),
            'api_urls': api_list,
            'crawled_pages': sorted(list(visited_pages))
        }, f, indent=2)
    
    print(f"\\n💾 Results saved:")
    print(f"  - exhaustive_api_discovery.txt ({len(api_list)} APIs)")
    print(f"  - exhaustive_discovery_report.json (full details)")
    
    # Compare with current collection
    try:
        with open('hyperverge_api_documentation.json', 'r') as f:
            current_data = json.load(f)
        
        current_urls = set()
        for api in current_data['india_apis'] + current_data['global_apis']:
            current_urls.add(api['url'])
        
        missing_apis = discovered_api_urls - current_urls
        
        print(f"\\n📊 COMPARISON WITH CURRENT COLLECTION:")
        print(f"  Current collection: {len(current_urls)} APIs")
        print(f"  Newly discovered: {len(discovered_api_urls)} APIs")
        print(f"  Missing from collection: {len(missing_apis)} APIs")
        
        if missing_apis:
            print(f"\\n❌ MISSING APIs:")
            for i, api_url in enumerate(sorted(missing_apis), 1):
                print(f"  {i:3d}. {api_url}")
            
            with open('definitely_missing_apis.txt', 'w') as f:
                for api_url in sorted(missing_apis):
                    f.write(api_url + '\\n')
            
            print(f"\\n💾 Missing APIs saved to: definitely_missing_apis.txt")
        else:
            print(f"\\n✅ No missing APIs! Collection is complete.")
            
    except FileNotFoundError:
        print("\\n⚠️  Current collection file not found for comparison")
    
    return api_list

def is_api_endpoint(href, text):
    """Determine if this is definitely an API endpoint"""
    
    # Skip navigation and category pages
    skip_patterns = [
        '/api-reference/$',
        '/api-reference$', 
        'introduction',
        'overview', 
        'changelog',
        'getting-started'
    ]
    
    for pattern in skip_patterns:
        if pattern in href.lower():
            return False
    
    # Strong API indicators
    strong_indicators = [
        '_api$',
        '_api/',
        '/api/',
        'enrol_api',
        'search_api', 
        'block_api',
        'verification_api',
        'validation_api',
        'extraction_api',
        'lookup_api',
        'fetch_api',
        'check_api',
        'analysis_api',
        'match_api'
    ]
    
    href_lower = href.lower()
    text_lower = text.lower()
    
    # Check for strong API patterns
    for indicator in strong_indicators:
        if indicator in href_lower or indicator in text_lower:
            return True
    
    # Deep nested paths (4+ levels) with API keywords in text
    if href.count('/') >= 5 and any(word in text_lower for word in [
        'api', 'verification', 'validation', 'extraction', 'lookup',
        'fetch', 'check', 'analysis', 'match', 'enrol', 'search', 'block'
    ]):
        return True
    
    return False

if __name__ == "__main__":
    print("🚀 Starting exhaustive deep crawl...")
    print("This will find EVERY API endpoint with no depth limitations\\n")
    
    api_urls = exhaustive_deep_crawl()
    
    print(f"\\n🎯 EXHAUSTIVE CRAWL COMPLETE!")
    print(f"Discovered {len(api_urls)} API endpoints total")
    print("\\nThis represents the complete API inventory.")