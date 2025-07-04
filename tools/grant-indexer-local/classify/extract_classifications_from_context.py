import json
import logging
import re
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional, Set, Tuple

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('classification_extraction.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class ClassificationExtractor:
    REQUIRED_FIELDS = {'category', 'tags', 'eligibility_summary', 'urgency_score'}
    
    def __init__(self, data_dir: str = "../data", context_file: str = "../context.md"):
        self.data_dir = Path(data_dir)
        self.context_file = Path(context_file)
        self.tagged_grants_file = self.data_dir / "tagged_grants.json"
        self.processed_titles: Set[str] = set()

    def load_context(self) -> str:
        """Load the context.md file content."""
        try:
            with open(self.context_file, 'r', encoding='utf-8') as f:
                return f.read()
        except FileNotFoundError:
            logger.error(f"Context file not found: {self.context_file}")
            return ""
        except Exception as e:
            logger.error(f"Error reading context file: {e}")
            return ""

    def load_existing_classifications(self) -> List[Dict]:
        """Load existing tagged grants to avoid duplicates."""
        try:
            with open(self.tagged_grants_file, 'r', encoding='utf-8') as f:
                grants = json.load(f)
                self.processed_titles = {grant.get('title', '') for grant in grants}
                return grants
        except (FileNotFoundError, json.JSONDecodeError):
            return []

    def extract_json_blocks(self, content: str) -> List[Tuple[str, Dict]]:
        """Extract JSON blocks from context.md content."""
        # Pattern to match JSON blocks that might be preceded by markdown
        json_pattern = r'```(?:json)?\s*(\{[\s\S]*?\})\s*```'
        matches = re.finditer(json_pattern, content)
        
        extracted = []
        for match in matches:
            try:
                json_str = match.group(1)
                data = json.loads(json_str)
                # Get the preceding grant title if available
                title = self._extract_preceding_title(content, match.start())
                extracted.append((title, data))
            except json.JSONDecodeError as e:
                logger.warning(f"Invalid JSON found: {e}")
                continue
        
        return extracted

    def _extract_preceding_title(self, content: str, json_start: int) -> str:
        """Extract the grant title preceding the JSON block."""
        # Look for the most recent "Title:" line before the JSON
        title_pattern = r'Title:\s*(.*?)(?:\n|$)'
        preceding_content = content[:json_start]
        matches = list(re.finditer(title_pattern, preceding_content))
        
        if matches:
            return matches[-1].group(1).strip()
        return ""

    def validate_schema(self, data: Dict) -> bool:
        """Validate that the JSON contains all required fields."""
        if not isinstance(data, dict):
            logger.warning("Classification is not a dictionary")
            return False

        missing_fields = self.REQUIRED_FIELDS - set(data.keys())
        if missing_fields:
            logger.warning(f"Missing required fields: {missing_fields}")
            return False

        # Validate field types
        if not isinstance(data['category'], str):
            logger.warning("Category must be a string")
            return False
        if not isinstance(data['tags'], list):
            logger.warning("Tags must be a list")
            return False
        if not isinstance(data['eligibility_summary'], str):
            logger.warning("Eligibility summary must be a string")
            return False
        if not isinstance(data['urgency_score'], (int, float)) or not 1 <= data['urgency_score'] <= 5:
            logger.warning("Urgency score must be a number between 1 and 5")
            return False

        return True

    def save_classifications(self, classifications: List[Dict], dry_run: bool = False):
        """Save validated classifications to tagged_grants.json."""
        if dry_run:
            logger.info("DRY RUN - Would save the following classifications:")
            for cls in classifications:
                logger.info(f"- {cls.get('title', 'Untitled')}: {cls.get('category')}")
            return

        try:
            with open(self.tagged_grants_file, 'w', encoding='utf-8') as f:
                json.dump(classifications, f, indent=2, ensure_ascii=False)
            logger.info(f"Saved {len(classifications)} classifications to {self.tagged_grants_file}")
        except Exception as e:
            logger.error(f"Error saving classifications: {e}")

    def process_context(self, dry_run: bool = False) -> List[Dict]:
        """Process context.md and extract valid classifications."""
        content = self.load_context()
        if not content:
            return []

        # Load existing classifications
        existing_classifications = self.load_existing_classifications()
        new_classifications = []

        # Extract and validate JSON blocks
        for title, data in self.extract_json_blocks(content):
            if title in self.processed_titles:
                logger.info(f"Skipping already processed grant: {title}")
                continue

            if self.validate_schema(data):
                # Add title and timestamp
                data['title'] = title
                data['classified_at'] = datetime.now().isoformat()
                new_classifications.append(data)
                self.processed_titles.add(title)
            else:
                logger.warning(f"Invalid classification schema for grant: {title}")

        # Combine existing and new classifications
        all_classifications = existing_classifications + new_classifications
        
        # Save results
        self.save_classifications(all_classifications, dry_run)
        
        return new_classifications

def main():
    import argparse
    parser = argparse.ArgumentParser(description='Extract grant classifications from context.md')
    parser.add_argument('--dry-run', action='store_true', help='Preview changes without saving')
    args = parser.parse_args()

    extractor = ClassificationExtractor()
    new_classifications = extractor.process_context(dry_run=args.dry_run)
    
    if args.dry_run:
        print(f"\nDry run complete. Would add {len(new_classifications)} new classifications.")
    else:
        print(f"\nExtraction complete. Added {len(new_classifications)} new classifications.")

if __name__ == "__main__":
    main() 