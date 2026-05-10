#!/usr/bin/env python3
"""
HyperVerge API Documentation Scraper

This script scrapes the HyperVerge API documentation portal to extract:
1. API inputs
2. API outputs  
3. API curl examples
4. API success responses
5. API failure responses
6. Error response details (status codes, error messages)

Supports both India APIs and Global APIs.
"""

import requests
import json
import time
import os
from typing import Dict, List, Optional, Any
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
import re


class HyperVergeAPIScraper:
    def __init__(self, base_url: str = "https://documentation.hyperverge.co"):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        })
        self.api_data = {
            "india_apis": [],
            "global_apis": []
        }
    
    def authenticate(self, username: str, password: str) -> bool:
        """
        Authenticate with the HyperVerge documentation portal.
        Returns True if authentication successful.
        """
        print("Attempting to authenticate with HyperVerge documentation portal...")
        
        # First, explore the base URL to understand the site structure
        try:
            print("Exploring site structure...")
            base_response = self.session.get(self.base_url, timeout=30)
            print(f"Base URL status: {base_response.status_code}")
            
            # Try different common login URLs
            login_urls = [
                "/login", "/auth/login", "/signin", "/authentication", 
                "/user/login", "/account/login", "/portal/login"
            ]
            
            login_found = False
            for login_path in login_urls:
                login_url = urljoin(self.base_url, login_path)
                try:
                    response = self.session.get(login_url, timeout=30)
                    if response.status_code == 200:
                        print(f"Found login page at: {login_url}")
                        soup = BeautifulSoup(response.content, 'html.parser')
                        
                        # Look for login form
                        login_form = soup.find('form')
                        if login_form:
                            login_found = True
                            break
                    else:
                        print(f"Tried {login_url}: {response.status_code}")
                except:
                    continue
            
            if not login_found:
                print("No login form found. Checking if API reference is publicly accessible...")
                # Try accessing the API reference directly
                api_ref_url = urljoin(self.base_url, "/api-reference/")
                test_response = self.session.get(api_ref_url, timeout=30)
                print(f"API reference status: {test_response.status_code}")
                
                if test_response.status_code == 200:
                    print("API reference is publicly accessible!")
                    return True
                else:
                    print("API reference requires authentication but no login form found.")
                    print("This might be a different type of authentication (API key, OAuth, etc.)")
                    return False
            
            # If we found a login form, proceed with authentication
            print("Attempting to authenticate with found login form...")
            
            # Extract form data and CSRF tokens if present
            form_data = {
                'username': username,
                'password': password,
                'email': username  # Some forms might use email instead
            }
            
            # Look for hidden fields (CSRF tokens, etc.)
            for hidden_input in login_form.find_all('input', type='hidden'):
                name = hidden_input.get('name')
                value = hidden_input.get('value')
                if name and value:
                    form_data[name] = value
            
            # Look for input field names to match the form
            input_fields = login_form.find_all('input')
            for input_field in input_fields:
                field_name = input_field.get('name', '').lower()
                if 'email' in field_name and 'username' not in field_name:
                    form_data['email'] = username
                elif 'user' in field_name:
                    form_data[input_field.get('name')] = username
                elif 'pass' in field_name:
                    form_data[input_field.get('name')] = password
            
            # Submit login form
            form_action = login_form.get('action') or login_url
            if not form_action.startswith('http'):
                form_action = urljoin(self.base_url, form_action)
            
            print(f"Submitting login form to: {form_action}")
            login_response = self.session.post(form_action, data=form_data, timeout=30)
            
            # Check if login was successful
            if login_response.status_code == 200:
                # Verify by trying to access protected content
                api_ref_url = urljoin(self.base_url, "/api-reference/")
                test_response = self.session.get(api_ref_url, timeout=30)
                
                if test_response.status_code == 200 and "api" in test_response.text.lower():
                    print("Authentication successful!")
                    return True
                else:
                    print("Authentication may have failed - unable to access API reference")
                    return False
            else:
                print(f"Login request failed with status code: {login_response.status_code}")
                return False
                
        except Exception as e:
            print(f"Authentication error: {str(e)}")
            return False
    
    def get_api_endpoints(self) -> Dict[str, List[str]]:
        """
        Discover all API endpoints from the documentation.
        Returns dict with 'india_apis' and 'global_apis' lists.
        """
        print("Discovering API endpoints...")
        
        api_ref_url = urljoin(self.base_url, "/api-reference/")
        
        try:
            response = self.session.get(api_ref_url, timeout=30)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            endpoints = {
                "india_apis": [],
                "global_apis": []
            }
            
            # Find all links on the page
            all_links = soup.find_all('a', href=True)
            
            print(f"Found {len(all_links)} total links on the page")
            
            # First, collect category pages
            category_urls = {
                "india_apis": [],
                "global_apis": []
            }
            
            for link in all_links:
                href = link.get('href')
                text = link.get_text().strip().lower()
                
                if href and href.startswith('/api-reference/'):
                    full_url = urljoin(self.base_url, href)
                    
                    if 'india' in text.lower():
                        category_urls["india_apis"].append(full_url)
                        print(f"Found India API category: {full_url}")
                    elif any(region in text.lower() for region in ['global', 'africa', 'vietnam', 'usa', 'asia']):
                        category_urls["global_apis"].append(full_url)
                        print(f"Found Global API category: {full_url}")
            
            # Now explore each category page to find actual API endpoints
            for category in ["india_apis", "global_apis"]:
                print(f"\nExploring {category} category pages...")
                
                for category_url in category_urls[category]:
                    try:
                        print(f"Exploring category: {category_url}")
                        cat_response = self.session.get(category_url, timeout=30)
                        cat_soup = BeautifulSoup(cat_response.content, 'html.parser')
                        
                        # Look for individual API endpoint links
                        api_links = cat_soup.find_all('a', href=True)
                        
                        # Also track sub-category pages for deeper crawling
                        sub_categories = []
                        
                        for api_link in api_links:
                            api_href = api_link.get('href')
                            api_text = api_link.get_text().strip()
                            
                            # Skip navigation and general links
                            if api_href and api_href.startswith('/api-reference/'):
                                full_api_url = urljoin(self.base_url, api_href)
                                
                                # Check if it's a sub-category page (e.g., DigiLocker APIs, Bank Account Verification APIs)
                                if api_href.count('/') == 2 and api_href.endswith('/') and 'API' in api_text:
                                    sub_categories.append((full_api_url, api_text))
                                    print(f"Found sub-category: {api_text} -> {full_api_url}")
                                
                                # Look for specific API endpoints (usually have longer paths)
                                elif api_href.count('/') > 1 and api_href != '/api-reference/':
                                    # Check if it's actually an API endpoint by looking for certain keywords or patterns
                                    is_api_endpoint = (
                                        any(keyword in api_text.lower() for keyword in [
                                            'kyc', 'face', 'document', 'verification', 'liveness',
                                            'bank', 'pan', 'aadhaar', 'passport', 'license',
                                            'gst', 'upi', 'ocr', 'extract', 'validate', 'fetch',
                                            'api', 'nin', 'ssn', 'driving', 'digilocker'
                                        ]) or 
                                        api_href.endswith('_api') or 
                                        api_href.endswith('_api/') or
                                        'api' in api_href.lower()
                                    )
                                    
                                    if is_api_endpoint:
                                        endpoints[category].append(full_api_url)
                                        print(f"Found API endpoint: {api_text} -> {full_api_url}")
                        
                        # Crawl sub-categories for nested APIs
                        for sub_cat_url, sub_cat_name in sub_categories:
                            try:
                                print(f"  Exploring sub-category: {sub_cat_name}")
                                sub_response = self.session.get(sub_cat_url, timeout=30)
                                sub_soup = BeautifulSoup(sub_response.content, 'html.parser')
                                
                                sub_api_links = sub_soup.find_all('a', href=True)
                                for sub_link in sub_api_links:
                                    sub_href = sub_link.get('href')
                                    sub_text = sub_link.get_text().strip()
                                    
                                    if sub_href and sub_href.startswith('/api-reference/'):
                                        sub_full_url = urljoin(self.base_url, sub_href)
                                        
                                        # Look for actual API endpoints in sub-categories
                                        is_nested_api = (
                                            sub_href.count('/') > 2 and
                                            (any(keyword in sub_text.lower() for keyword in [
                                                'kyc', 'face', 'document', 'verification', 'liveness',
                                                'bank', 'pan', 'aadhaar', 'passport', 'license',
                                                'gst', 'upi', 'ocr', 'extract', 'validate', 'fetch',
                                                'api', 'nin', 'ssn', 'driving', 'digilocker'
                                            ]) or 
                                            sub_href.endswith('_api') or 
                                            sub_href.endswith('_api/') or
                                            'api' in sub_href.lower())
                                        )
                                        
                                        if is_nested_api:
                                            endpoints[category].append(sub_full_url)
                                            print(f"    Found nested API: {sub_text} -> {sub_full_url}")
                                
                                time.sleep(0.5)  # Be respectful
                                
                            except Exception as e:
                                print(f"    Error exploring sub-category {sub_cat_url}: {str(e)}")
                                continue
                        
                        time.sleep(0.5)  # Be respectful
                        
                    except Exception as e:
                        print(f"Error exploring category {category_url}: {str(e)}")
                        continue
            
            # Remove duplicates
            endpoints["india_apis"] = list(set(endpoints["india_apis"]))
            endpoints["global_apis"] = list(set(endpoints["global_apis"]))
            
            print(f"\nFinal count:")
            print(f"India API endpoints: {len(endpoints['india_apis'])}")
            print(f"Global API endpoints: {len(endpoints['global_apis'])}")
            
            return endpoints
            
        except Exception as e:
            print(f"Error discovering endpoints: {str(e)}")
            return {"india_apis": [], "global_apis": []}
    
    def extract_api_details(self, url: str) -> Dict[str, Any]:
        """
        Extract detailed API information from a documentation page.
        """
        print(f"Extracting details from: {url}")
        
        try:
            response = self.session.get(url, timeout=30)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            api_details = {
                "url": url,
                "name": "",
                "description": "",
                "inputs": [],
                "outputs": [],
                "curl_example": "",
                "success_response": {},
                "failure_responses": [],
                "error_details": []
            }
            
            # Extract API name from title or heading
            title = soup.find('h1') or soup.find('h2') or soup.find('title')
            if title:
                api_details["name"] = title.get_text().strip()
            
            # Extract description - look in multiple places
            description_sources = [
                soup.find(['p', 'div'], class_=re.compile(r'description', re.I)),
                soup.find(['p', 'div'], class_=re.compile(r'summary', re.I)),
                soup.find('p')  # First paragraph as fallback
            ]
            
            for desc_elem in description_sources:
                if desc_elem and desc_elem.get_text().strip():
                    api_details["description"] = desc_elem.get_text().strip()
                    break
            
            # More comprehensive search for parameters/inputs
            print(f"  Searching for input parameters...")
            
            # Look for tables with parameters
            tables = soup.find_all('table')
            for table in tables:
                headers = [th.get_text().strip().lower() for th in table.find_all(['th', 'td'])]
                if any(header in ['parameter', 'name', 'field', 'input'] for header in headers[:5]):
                    inputs = self._extract_parameters_from_table(table)
                    api_details["inputs"].extend(inputs)
            
            # Look for parameter sections with different patterns
            param_patterns = [
                re.compile(r'(param|input|request|body|field)', re.I),
                re.compile(r'(headers?|authorization)', re.I)
            ]
            
            for pattern in param_patterns:
                param_sections = soup.find_all(['div', 'section', 'article'], class_=pattern)
                param_sections.extend(soup.find_all(['h2', 'h3', 'h4'], string=pattern))
                
                for section in param_sections:
                    inputs = self._extract_parameters(section)
                    api_details["inputs"].extend(inputs)
            
            # Extract cURL examples - more comprehensive search
            print(f"  Searching for cURL examples...")
            
            # Look for code blocks containing curl
            code_blocks = soup.find_all(['code', 'pre'])
            for code_block in code_blocks:
                text = code_block.get_text().strip()
                if 'curl' in text.lower() and len(text) > 10:
                    api_details["curl_example"] = text
                    break
            
            # Look for cURL in specific sections
            if not api_details["curl_example"]:
                curl_sections = soup.find_all(['div', 'section'], string=re.compile(r'curl', re.I))
                for section in curl_sections:
                    if section.parent:
                        code = section.parent.find(['code', 'pre'])
                        if code:
                            api_details["curl_example"] = code.get_text().strip()
                            break
            
            # Extract success/failure responses more comprehensively
            print(f"  Searching for API responses...")
            
            # Look for response examples in JSON format
            json_blocks = []
            for code_block in code_blocks:
                text = code_block.get_text().strip()
                if text.startswith('{') and text.endswith('}') and len(text) > 10:
                    json_blocks.append(text)
            
            # Try to categorize JSON blocks as success/error responses
            for json_text in json_blocks:
                try:
                    parsed = json.loads(json_text)
                    
                    # Check if it's likely a success response
                    if any(key in str(parsed).lower() for key in ['success', 'result', 'data', 'status']):
                        if not api_details["success_response"]:
                            api_details["success_response"] = parsed
                    
                    # Check if it's likely an error response
                    elif any(key in str(parsed).lower() for key in ['error', 'fail', 'message']):
                        api_details["failure_responses"].append(parsed)
                        
                except:
                    # If not valid JSON, store as raw text
                    if 'error' in json_text.lower() or 'fail' in json_text.lower():
                        api_details["failure_responses"].append({"raw": json_text})
                    elif not api_details["success_response"]:
                        api_details["success_response"] = {"raw": json_text}
            
            # Extract HTTP status codes and error details
            print(f"  Searching for error details...")
            
            # Look for HTTP status codes
            status_code_pattern = re.compile(r'\b([1-5]\d{2})\b')
            page_text = soup.get_text()
            status_codes = status_code_pattern.findall(page_text)
            
            for code in set(status_codes):
                if code.startswith(('4', '5')):  # Error codes
                    error_info = {
                        "status_code": code,
                        "description": "",
                        "example_response": ""
                    }
                    
                    # Try to find context around the status code
                    code_context = self._extract_error_context(soup, code)
                    if code_context:
                        error_info["description"] = code_context
                    
                    api_details["error_details"].append(error_info)
            
            # Extract output/response fields
            print(f"  Searching for output fields...")
            
            # Look for response structure tables or sections
            response_patterns = [
                re.compile(r'(response|output|return|result)', re.I)
            ]
            
            for pattern in response_patterns:
                response_sections = soup.find_all(['div', 'section', 'article'], class_=pattern)
                response_sections.extend(soup.find_all(['h2', 'h3', 'h4'], string=pattern))
                
                for section in response_sections:
                    outputs = self._extract_parameters(section)
                    api_details["outputs"].extend(outputs)
            
            # Remove duplicates
            api_details["inputs"] = self._remove_duplicate_params(api_details["inputs"])
            api_details["outputs"] = self._remove_duplicate_params(api_details["outputs"])
            
            print(f"  Extracted: {len(api_details['inputs'])} inputs, {len(api_details['outputs'])} outputs")
            
            return api_details
            
        except Exception as e:
            print(f"Error extracting API details from {url}: {str(e)}")
            return {"url": url, "error": str(e)}
    
    def _extract_parameters(self, section) -> List[Dict[str, str]]:
        """Extract parameter information from a documentation section."""
        parameters = []
        
        # Look for table rows or list items containing parameter info
        rows = section.find_all(['tr', 'li', 'div'])
        
        for row in rows:
            param_info = {}
            
            # Try to extract parameter name, type, description
            cells = row.find_all(['td', 'th', 'span', 'code'])
            
            if len(cells) >= 2:
                param_info["name"] = cells[0].get_text().strip()
                param_info["type"] = cells[1].get_text().strip() if len(cells) > 1 else ""
                param_info["description"] = cells[2].get_text().strip() if len(cells) > 2 else ""
                param_info["required"] = "required" in row.get_text().lower()
                
                if param_info["name"]:
                    parameters.append(param_info)
        
        return parameters
    
    def _extract_error_details(self, section) -> List[Dict[str, str]]:
        """Extract error response details from a documentation section."""
        errors = []
        
        # Look for status codes and error messages
        code_pattern = re.compile(r'(\d{3})')
        text = section.get_text()
        
        # Find status codes
        status_codes = code_pattern.findall(text)
        
        for code in status_codes:
            error_info = {
                "status_code": code,
                "description": "",
                "example_response": ""
            }
            
            # Try to find associated error description
            code_elem = section.find(string=re.compile(code))
            if code_elem:
                parent = code_elem.parent
                if parent:
                    error_info["description"] = parent.get_text().strip()
            
            # Look for JSON error response examples
            json_blocks = section.find_all(['code', 'pre'])
            for block in json_blocks:
                block_text = block.get_text().strip()
                if block_text.startswith('{') and block_text.endswith('}'):
                    error_info["example_response"] = block_text
                    break
            
            errors.append(error_info)
        
        return errors
    
    def _extract_parameters_from_table(self, table) -> List[Dict[str, str]]:
        """Extract parameters from an HTML table."""
        parameters = []
        
        # Get table headers
        headers = []
        header_row = table.find('tr')
        if header_row:
            for th in header_row.find_all(['th', 'td']):
                headers.append(th.get_text().strip().lower())
        
        # Map common header names
        name_col = next((i for i, h in enumerate(headers) if h in ['name', 'parameter', 'field', 'key']), -1)
        type_col = next((i for i, h in enumerate(headers) if h in ['type', 'data type', 'format']), -1)
        desc_col = next((i for i, h in enumerate(headers) if h in ['description', 'desc', 'details']), -1)
        req_col = next((i for i, h in enumerate(headers) if h in ['required', 'mandatory', 'optional']), -1)
        
        # Extract data rows
        rows = table.find_all('tr')[1:]  # Skip header row
        
        for row in rows:
            cells = row.find_all(['td', 'th'])
            if len(cells) > max(name_col, 0):
                param_info = {
                    "name": cells[name_col].get_text().strip() if name_col >= 0 else "",
                    "type": cells[type_col].get_text().strip() if type_col >= 0 else "",
                    "description": cells[desc_col].get_text().strip() if desc_col >= 0 else "",
                    "required": False
                }
                
                # Determine if required
                if req_col >= 0 and req_col < len(cells):
                    req_text = cells[req_col].get_text().strip().lower()
                    param_info["required"] = 'yes' in req_text or 'true' in req_text or 'required' in req_text
                
                if param_info["name"]:
                    parameters.append(param_info)
        
        return parameters
    
    def _extract_error_context(self, soup, status_code: str) -> str:
        """Extract context/description for a given HTTP status code."""
        page_text = soup.get_text()
        
        # Find the status code in the text and get surrounding context
        pattern = rf'\b{status_code}\b'
        matches = list(re.finditer(pattern, page_text))
        
        for match in matches:
            start = max(0, match.start() - 100)
            end = min(len(page_text), match.end() + 200)
            context = page_text[start:end].strip()
            
            # Clean up the context
            context = ' '.join(context.split())
            if len(context) > 20:  # Make sure we have meaningful content
                return context
        
        return ""
    
    def _remove_duplicate_params(self, params: List[Dict[str, str]]) -> List[Dict[str, str]]:
        """Remove duplicate parameters based on name."""
        seen_names = set()
        unique_params = []
        
        for param in params:
            name = param.get('name', '').lower().strip()
            if name and name not in seen_names:
                seen_names.add(name)
                unique_params.append(param)
        
        return unique_params
    
    def scrape_all_apis(self, username: str, password: str, additional_apis: Dict[str, List[str]] = None) -> Dict[str, Any]:
        """
        Main method to scrape all API documentation.
        """
        print("Starting HyperVerge API documentation scrape...")
        
        # Authenticate
        if not self.authenticate(username, password):
            return {"error": "Authentication failed"}
        
        # Discover endpoints
        endpoints = self.get_api_endpoints()
        
        # Add additional specific APIs
        if additional_apis:
            print(f"Adding {len(additional_apis.get('india_apis', []))} additional India APIs...")
            endpoints["india_apis"].extend(additional_apis.get("india_apis", []))
            
            print(f"Adding {len(additional_apis.get('global_apis', []))} additional Global APIs...")
            endpoints["global_apis"].extend(additional_apis.get("global_apis", []))
        
        # Remove duplicates
        endpoints["india_apis"] = list(set(endpoints["india_apis"]))
        endpoints["global_apis"] = list(set(endpoints["global_apis"]))
        
        print(f"Total APIs to scrape - India: {len(endpoints['india_apis'])}, Global: {len(endpoints['global_apis'])}")
        
        # Scrape India APIs
        print("\nScraping India APIs...")
        for url in endpoints["india_apis"]:
            api_details = self.extract_api_details(url)
            self.api_data["india_apis"].append(api_details)
            time.sleep(1)  # Be respectful to the server
        
        # Scrape Global APIs  
        print("\nScraping Global APIs...")
        for url in endpoints["global_apis"]:
            api_details = self.extract_api_details(url)
            self.api_data["global_apis"].append(api_details)
            time.sleep(1)  # Be respectful to the server
        
        return self.api_data
    
    def save_to_file(self, filename: str = "hyperverge_api_data.json"):
        """Save scraped data to JSON file."""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(self.api_data, f, indent=2, ensure_ascii=False)
        print(f"Data saved to {filename}")


def main():
    """
    Main function to run the scraper.
    """
    scraper = HyperVergeAPIScraper()
    
    # Get credentials from environment variables or prompt user
    username = "aaron.m@hyperverge.co"
    password = "Thankyoujesusfor-2024"
    
    # Add specific APIs that might be missed by discovery
    additional_apis = {
        "india_apis": [
            "https://documentation.hyperverge.co/api-reference/india_api/geoCoding_apiV2",
            "https://documentation.hyperverge.co/api-reference/india_api/Digilocker%20APIs/digilocker_fetch_eaadhaar_api",
            "https://documentation.hyperverge.co/api-reference/india_api/Digilocker%20APIs/digilocker_fetch_driving_license_pan_api/"
        ],
        "global_apis": []
    }
    
    if not username or not password:
        print("Please set HYPERVERGE_USERNAME and HYPERVERGE_PASSWORD environment variables")
        print("Or modify this script to include your credentials")
        return
    
    try:
        # Scrape all APIs
        result = scraper.scrape_all_apis(username, password, additional_apis)
        
        if "error" in result:
            print(f"Scraping failed: {result['error']}")
            return
        
        # Save results
        output_file = "hyperverge_api_documentation.json"
        scraper.save_to_file(output_file)
        
        print(f"\nScraping completed successfully!")
        print(f"India APIs: {len(result['india_apis'])}")
        print(f"Global APIs: {len(result['global_apis'])}")
        print(f"Results saved to: {output_file}")
        
    except KeyboardInterrupt:
        print("\nScraping interrupted by user")
    except Exception as e:
        print(f"Unexpected error: {str(e)}")


if __name__ == "__main__":
    main()