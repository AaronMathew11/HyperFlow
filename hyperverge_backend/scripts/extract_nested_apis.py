#!/usr/bin/env python3
"""
Extract APIs from category pages that contain multiple nested APIs
"""

import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import time
import json

def extract_apis_from_category(category_url):
    """Extract individual API URLs from a category page"""
    
    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    })
    
    print(f"Exploring category: {category_url}")
    
    try:
        response = session.get(category_url, timeout=20)
        if response.status_code != 200:
            return []
        
        soup = BeautifulSoup(response.content, 'html.parser')
        links = soup.find_all('a', href=True)
        
        nested_apis = []
        
        for link in links:
            href = link.get('href')
            text = link.get_text().strip()
            
            if not href or not href.startswith('/api-reference/'):
                continue
            
            # Look for specific API endpoints within this category
            if (href.count('/') > category_url.count('/') - len('https://documentation.hyperverge.co') and
                ('_api' in href or 
                 'api/' in href or
                 any(word in href.lower() for word in [
                     'verification', 'validation', 'extraction', 'lookup', 
                     'fetch', 'check', 'analysis', 'match', 'consent', 'request',
                     'screening', 'monitoring', 'detection'
                 ]))):
                
                full_url = urljoin('https://documentation.hyperverge.co', href)
                nested_apis.append((full_url, text))
                print(f"  → Found nested API: {text} ({full_url})")
        
        return nested_apis
        
    except Exception as e:
        print(f"Error exploring {category_url}: {e}")
        return []

def main():
    # Read the discovered URLs
    with open('discovered_api_urls.txt', 'r') as f:
        all_urls = [line.strip() for line in f if line.strip()]
    
    # Filter category pages (ones that end with '/' and contain 'APIs')
    category_pages = [url for url in all_urls if url.endswith('/') and 'APIs' in url]
    
    print(f"Found {len(category_pages)} category pages to explore:")
    for page in category_pages:
        print(f"  - {page}")
    
    print(f"\n{'='*60}")
    print("EXPLORING CATEGORY PAGES FOR NESTED APIs")
    print(f"{'='*60}")
    
    all_nested_apis = []
    
    for category_url in category_pages:
        nested_apis = extract_apis_from_category(category_url)
        all_nested_apis.extend(nested_apis)
        time.sleep(0.5)  # Be respectful
    
    print(f"\n{'='*60}")
    print(f"FOUND {len(all_nested_apis)} NESTED APIs")
    print(f"{'='*60}")
    
    # Save all nested APIs
    with open('nested_api_urls.txt', 'w') as f:
        for api_url, api_name in all_nested_apis:
            f.write(f"{api_url}\t{api_name}\n")
            print(f"  → {api_name}: {api_url}")
    
    # Also create a simple list of just URLs for easy processing
    with open('nested_api_urls_only.txt', 'w') as f:
        for api_url, api_name in all_nested_apis:
            f.write(f"{api_url}\n")
    
    print(f"\n💾 Nested APIs saved to nested_api_urls.txt and nested_api_urls_only.txt")
    return all_nested_apis

if __name__ == "__main__":
    nested_apis = main()