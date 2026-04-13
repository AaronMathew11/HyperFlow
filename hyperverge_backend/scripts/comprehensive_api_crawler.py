#!/usr/bin/env python3
"""
Comprehensive HyperVerge API Documentation Crawler
Systematically crawls ALL APIs under india_api and global_api sections
"""

import requests
import json
import time
import os
from typing import Dict, List, Set
from urllib.parse import urljoin, urlparse, unquote
from bs4 import BeautifulSoup
import re
import sys

# Import the scraper class
sys.path.append(os.path.dirname(__file__))
from hyperverge_api_scraper import HyperVergeAPIScraper


class ComprehensiveAPICrawler:
    def __init__(self):
        self.base_url = "https://documentation.hyperverge.co"
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        })
        self.scraper = HyperVergeAPIScraper()
        self.discovered_urls = set()
        self.api_endpoints = {
            "india_apis": [],
            "global_apis": []
        }
    
    def is_api_endpoint(self, url: str, text: str) -> bool:
        """Determine if a URL is likely an API endpoint"""
        url_lower = url.lower()
        text_lower = text.lower()
        
        # Skip certain patterns that are definitely not APIs
        skip_patterns = [
            '/api-reference/$',
            '/api-reference$',
            'changelog',
            'introduction',
            'overview',
            'getting-started',
            'authentication',
            'errors'
        ]
        
        for pattern in skip_patterns:
            if re.search(pattern, url_lower):
                return False
        
        # API endpoint indicators
        api_indicators = [
            '_api',
            'api/',
            'verification',
            'validation',
            'extraction',
            'lookup',
            'fetch',
            'check',
            'analysis',
            'match',
            'kyc',
            'ocr',
            'face',
            'document',
            'bank',
            'pan',
            'aadhaar',
            'passport',
            'license',
            'gst',
            'upi',
            'nin',
            'ssn',
            'driving',
            'digilocker',
            'consent'
        ]
        
        # Check if URL or text contains API indicators
        has_api_indicator = any(indicator in url_lower or indicator in text_lower for indicator in api_indicators)
        
        # Additional checks for deeper nested URLs
        is_deep_nested = url.count('/') >= 3
        has_meaningful_text = len(text.strip()) > 0 and 'api' in text_lower
        
        return has_api_indicator or (is_deep_nested and has_meaningful_text)
    
    def crawl_page_recursively(self, url: str, category: str, max_depth: int = 4, current_depth: int = 0) -> List[str]:
        """Recursively crawl a page to find all API endpoints"""
        
        if current_depth > max_depth or url in self.discovered_urls:
            return []
        
        self.discovered_urls.add(url)
        found_endpoints = []
        
        try:
            print(f"{'  ' * current_depth}Crawling: {url}")
            response = self.session.get(url, timeout=30)
            
            if response.status_code != 200:
                return []
            
            soup = BeautifulSoup(response.content, 'html.parser')
            links = soup.find_all('a', href=True)
            
            for link in links:
                href = link.get('href')
                text = link.get_text().strip()
                
                if not href or not href.startswith('/api-reference/'):
                    continue
                
                full_url = urljoin(self.base_url, href)
                
                # Skip if already processed
                if full_url in self.discovered_urls:
                    continue
                
                # Check if this is an API endpoint
                if self.is_api_endpoint(href, text):
                    found_endpoints.append(full_url)
                    print(f"{'  ' * current_depth}  → Found API: {text} ({full_url})")
                
                # If this looks like a category/subcategory page, crawl it recursively
                elif (href.count('/') <= 4 and  # Don't go too deep for categories
                      any(cat in href.lower() for cat in ['india_api', 'global_api', 'apis/']) and
                      current_depth < max_depth - 1):
                    
                    print(f"{'  ' * current_depth}  → Subcategory: {text}")
                    sub_endpoints = self.crawl_page_recursively(full_url, category, max_depth, current_depth + 1)
                    found_endpoints.extend(sub_endpoints)
            
            time.sleep(0.5)  # Be respectful
            
        except Exception as e:
            print(f"{'  ' * current_depth}Error crawling {url}: {str(e)}")
        
        return found_endpoints
    
    def discover_all_apis(self) -> Dict[str, List[str]]:
        """Discover all APIs by comprehensive crawling"""
        
        print("Starting comprehensive API discovery...")
        
        # Starting points for crawling
        starting_points = {
            "india_apis": [
                "/api-reference/india_api/",
            ],
            "global_apis": [
                "/api-reference/global_api/",
                "/api-reference/USA APIs/",
                "/api-reference/Vietnam APIs/",
                "/api-reference/Africa APIs/"
            ]
        }
        
        all_endpoints = {"india_apis": [], "global_apis": []}
        
        for category, start_urls in starting_points.items():
            print(f"\n=== Crawling {category} ===")
            
            for start_path in start_urls:
                start_url = urljoin(self.base_url, start_path)
                print(f"\nStarting from: {start_url}")
                
                endpoints = self.crawl_page_recursively(start_url, category, max_depth=5)
                all_endpoints[category].extend(endpoints)
        
        # Remove duplicates
        all_endpoints["india_apis"] = list(set(all_endpoints["india_apis"]))
        all_endpoints["global_apis"] = list(set(all_endpoints["global_apis"]))
        
        print(f"\n=== Discovery Complete ===")
        print(f"India APIs found: {len(all_endpoints['india_apis'])}")
        print(f"Global APIs found: {len(all_endpoints['global_apis'])}")
        
        return all_endpoints
    
    def extract_all_apis(self) -> Dict:
        """Extract all discovered APIs"""
        
        # Discover all APIs first
        endpoints = self.discover_all_apis()
        
        all_data = {"india_apis": [], "global_apis": []}
        
        # Extract India APIs
        print(f"\n=== Extracting India APIs ===")
        for i, url in enumerate(endpoints["india_apis"], 1):
            print(f"[{i}/{len(endpoints['india_apis'])}] Extracting: {url}")
            try:
                api_details = self.scraper.extract_api_details(url)
                all_data["india_apis"].append(api_details)
                time.sleep(1)  # Be respectful
            except Exception as e:
                print(f"  Error: {str(e)}")
        
        # Extract Global APIs
        print(f"\n=== Extracting Global APIs ===")
        for i, url in enumerate(endpoints["global_apis"], 1):
            print(f"[{i}/{len(endpoints['global_apis'])}] Extracting: {url}")
            try:
                api_details = self.scraper.extract_api_details(url)
                all_data["global_apis"].append(api_details)
                time.sleep(1)  # Be respectful
            except Exception as e:
                print(f"  Error: {str(e)}")
        
        return all_data
    
    def save_results(self, data: Dict, filename: str = "comprehensive_hyperverge_api_documentation.json"):
        """Save results to file"""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print(f"\n=== Results Saved ===")
        print(f"File: {filename}")
        print(f"India APIs: {len(data['india_apis'])}")
        print(f"Global APIs: {len(data['global_apis'])}")
        print(f"Total APIs: {len(data['india_apis']) + len(data['global_apis'])}")


def main():
    """Main execution function"""
    crawler = ComprehensiveAPICrawler()
    
    print("🔍 Starting comprehensive HyperVerge API documentation crawl...")
    print("This will systematically discover and extract ALL APIs under india_api and global_api")
    
    try:
        # Extract all APIs
        all_data = crawler.extract_all_apis()
        
        # Save results
        crawler.save_results(all_data)
        
        print("\n✅ Comprehensive crawl completed successfully!")
        
    except KeyboardInterrupt:
        print("\n❌ Crawling interrupted by user")
    except Exception as e:
        print(f"\n❌ Unexpected error: {str(e)}")


if __name__ == "__main__":
    main()