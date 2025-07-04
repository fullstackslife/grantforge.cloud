import json
import logging
import math
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional, Tuple

from tqdm import tqdm

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('grant_classification.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class GrantClassifier:
    def __init__(self, data_dir: str = "../data", context_file: str = "../context.md"):
        self.data_dir = Path(data_dir)
        self.context_file = Path(context_file)
        self.raw_grants_file = self.data_dir / "raw_grants.json"
        self.tagged_grants_file = self.data_dir / "tagged_grants.json"
        self.batch_size = 3  # Number of grants per batch

    def load_raw_grants(self) -> List[Dict]:
        """Load raw grants from JSON file."""
        try:
            with open(self.raw_grants_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            logger.error(f"Raw grants file not found: {self.raw_grants_file}")
            return []
        except json.JSONDecodeError:
            logger.error(f"Invalid JSON in raw grants file: {self.raw_grants_file}")
            return []

    def create_batches(self, grants: List[Dict]) -> List[List[Dict]]:
        """Split grants into batches of specified size."""
        return [grants[i:i + self.batch_size] for i in range(0, len(grants), self.batch_size)]

    def format_grant_for_prompt(self, grant: Dict) -> str:
        """Format a single grant into a prompt-friendly string."""
        metadata = grant.get('metadata', {})
        return f"""
Title: {grant.get('title', 'N/A')}
Agency: {grant.get('agency', 'N/A')}
Summary: {grant.get('description', 'N/A')}
Deadline: {metadata.get('Close Date', 'N/A')}
Award: {metadata.get('Award Ceiling', 'N/A')} - {metadata.get('Award Floor', 'N/A')}
"""

    def create_batch_prompt(self, batch: List[Dict], batch_num: int) -> str:
        """Create a formatted prompt for a batch of grants."""
        grants_text = "\n".join(self.format_grant_for_prompt(grant) for grant in batch)
        return f"""
---
## 🧠 Grant Batch #{batch_num}

{grants_text}

Please classify each grant with:
- Category (e.g., Tech, Health, Nonprofit)
- Tags (comma-separated)
- Eligibility Summary
- Urgency Score (1–5, based on days until deadline)
- JSON output

---

"""

    def append_to_context(self, prompt: str):
        """Append the batch prompt to context.md."""
        try:
            with open(self.context_file, 'a', encoding='utf-8') as f:
                f.write(prompt)
            logger.info(f"Appended batch prompt to {self.context_file}")
        except Exception as e:
            logger.error(f"Error appending to context file: {e}")

    def load_tagged_grants(self) -> List[Dict]:
        """Load previously tagged grants if they exist."""
        try:
            with open(self.tagged_grants_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            return []

    def save_tagged_grants(self, tagged_grants: List[Dict]):
        """Save tagged grants to JSON file."""
        try:
            with open(self.tagged_grants_file, 'w', encoding='utf-8') as f:
                json.dump(tagged_grants, f, indent=2, ensure_ascii=False)
            logger.info(f"Saved {len(tagged_grants)} tagged grants to {self.tagged_grants_file}")
        except Exception as e:
            logger.error(f"Error saving tagged grants: {e}")

    def process_batches(self, start_batch: int = 0):
        """Process grants in batches and prepare for GPT classification."""
        raw_grants = self.load_raw_grants()
        if not raw_grants:
            logger.error("No raw grants to process")
            return

        batches = self.create_batches(raw_grants)
        total_batches = len(batches)
        
        logger.info(f"Processing {total_batches} batches of grants")
        logger.info(f"Starting from batch {start_batch + 1}")

        for i, batch in enumerate(batches[start_batch:], start=start_batch + 1):
            prompt = self.create_batch_prompt(batch, i)
            self.append_to_context(prompt)
            logger.info(f"Created prompt for batch {i}/{total_batches}")
            
            # Wait for user to process the batch
            input(f"\nBatch {i}/{total_batches} has been added to context.md. "
                  f"Please process it in Cursor and press Enter to continue...")

def main():
    classifier = GrantClassifier()
    
    # Check if we have any existing tagged grants
    tagged_grants = classifier.load_tagged_grants()
    start_batch = len(tagged_grants) // classifier.batch_size
    
    if start_batch > 0:
        print(f"\nFound {len(tagged_grants)} previously tagged grants.")
        resume = input("Would you like to resume from where you left off? (y/n): ").lower()
        if resume != 'y':
            start_batch = 0
    
    classifier.process_batches(start_batch)

if __name__ == "__main__":
    main() 