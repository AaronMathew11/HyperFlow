#!/usr/bin/env python3
"""
Discover all API URLs in HyperVerge documentation
"""

import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import time

def discover_all_api_urls():
    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    })
    
    base_url = "https://documentation.hyperverge.co"
    discovered_urls = set()
    api_urls = []
    
    def crawl_page(url, max_depth=3, current_depth=0):
        if current_depth > max_depth or url in discovered_urls:
            return
        
        discovered_urls.add(url)
        print(f"{'  ' * current_depth}Crawling: {url}")
        
        try:
            response = session.get(url, timeout=20)
            if response.status_code != 200:
                return
            
            soup = BeautifulSoup(response.content, 'html.parser')
            links = soup.find_all('a', href=True)
            
            for link in links:
                href = link.get('href')
                text = link.get_text().strip()
                
                if not href or not href.startswith('/api-reference/'):
                    continue
                
                full_url = urljoin(base_url, href)
                
                # Skip if already found
                if full_url in discovered_urls:
                    continue
                
                # Check if this looks like an API endpoint
                is_api = (
                    ('_api' in href or 
                     'api/' in href or
                     any(word in href.lower() for word in [
                         'verification', 'validation', 'extraction', 'lookup', 
                         'fetch', 'check', 'analysis', 'match', 'consent'
                     ])) and
                    href.count('/') >= 3 and
                    not any(skip in href.lower() for skip in [
                        'changelog', 'introduction', 'overview', 'getting-started'
                    ])
                )
                
                if is_api:
                    api_urls.append(full_url)
                    print(f"{'  ' * current_depth}  → API: {text}")
                
                # Continue crawling subcategories
                elif (href.count('/') <= 4 and 
                      ('apis/' in href.lower() or 'api' in href.lower()) and
                      current_depth < max_depth):
                    crawl_page(full_url, max_depth, current_depth + 1)
            
            time.sleep(0.3)
            
        except Exception as e:
            print(f"{'  ' * current_depth}Error: {e}")
    
    # Start crawling from main API sections
    start_urls = [
        "/api-reference/india_api/",
        "/api-reference/global_api/",
        "/api-reference/USA APIs/",
        "/api-reference/Vietnam APIs/",
        "/api-reference/Africa APIs/"
    ]
    
    for start_path in start_urls:
        start_url = urljoin(base_url, start_path)
        print(f"\nStarting from: {start_url}")
        crawl_page(start_url)
    
    return sorted(set(api_urls))

if __name__ == "__main__":
    print("🔍 Discovering all HyperVerge API URLs...")
    api_urls = discover_all_api_urls()
    
    print(f"\n📋 Found {len(api_urls)} API URLs:")
    for i, url in enumerate(api_urls, 1):
        print(f"{i:3d}. {url}")
    
    # Save to file for reference
    with open('discovered_api_urls.txt', 'w') as f:
        for url in api_urls:
            f.write(url + '\n')
    
    print(f"\n💾 URLs saved to discovered_api_urls.txt")