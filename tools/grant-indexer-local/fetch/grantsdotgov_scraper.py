import json
import os
import time
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional

import requests
from bs4 import BeautifulSoup
from tqdm import tqdm

class GrantsDotGovScraper:
    BASE_URL = "https://www.grants.gov/search-grants"
    HEADERS = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    def __init__(self, output_dir: str = "../data"):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.session = requests.Session()
        self.session.headers.update(self.HEADERS)

    def fetch_page(self, page: int = 1) -> Optional[BeautifulSoup]:
        """Fetch a single page of grants."""
        try:
            params = {
                "page": page,
                "sortBy": "openDate|desc"
            }
            response = self.session.get(self.BASE_URL, params=params)
            response.raise_for_status()
            return BeautifulSoup(response.text, 'html.parser')
        except requests.RequestException as e:
            print(f"Error fetching page {page}: {e}")
            return None

    def parse_grant(self, grant_element) -> Dict:
        """Parse a single grant element from the page."""
        try:
            title = grant_element.find("h3", class_="grant-title").text.strip()
            agency = grant_element.find("div", class_="grant-agency").text.strip()
            description = grant_element.find("div", class_="grant-description").text.strip()
            
            # Extract dates and other metadata
            metadata = grant_element.find_all("div", class_="grant-meta")
            dates = {}
            for meta in metadata:
                label = meta.find("span", class_="meta-label").text.strip()
                value = meta.find("span", class_="meta-value").text.strip()
                dates[label] = value

            return {
                "title": title,
                "agency": agency,
                "description": description,
                "metadata": dates,
                "scraped_at": datetime.now().isoformat()
            }
        except Exception as e:
            print(f"Error parsing grant: {e}")
            return {}

    def scrape_grants(self, num_pages: int = 3) -> List[Dict]:
        """Scrape multiple pages of grants."""
        all_grants = []
        
        for page in tqdm(range(1, num_pages + 1), desc="Scraping pages"):
            soup = self.fetch_page(page)
            if not soup:
                continue

            grant_elements = soup.find_all("div", class_="grant-item")
            for element in grant_elements:
                grant_data = self.parse_grant(element)
                if grant_data:
                    all_grants.append(grant_data)

            # Be nice to the server
            time.sleep(2)

        return all_grants

    def save_grants(self, grants: List[Dict]):
        """Save grants to JSON file."""
        output_file = self.output_dir / "raw_grants.json"
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(grants, f, indent=2, ensure_ascii=False)
        print(f"Saved {len(grants)} grants to {output_file}")

def main():
    scraper = GrantsDotGovScraper()
    grants = scraper.scrape_grants(num_pages=3)
    scraper.save_grants(grants)

if __name__ == "__main__":
    main() 