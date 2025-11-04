"""
Buy Indiana Portal Automation
Simplest certification - good test case
"""

from playwright.sync_api import sync_playwright, Page
import json
import sys
from pathlib import Path

def load_profile(profile_path: str) -> dict:
    """Load master profile"""
    with open(profile_path, 'r') as f:
        return json.load(f)

def load_field_mapping(mapping_path: str) -> dict:
    """Load field mapping"""
    with open(mapping_path, 'r') as f:
        return json.load(f)

def get_value_from_profile(profile: dict, source: str):
    """Extract value from profile using dot notation"""
    if source.startswith("static:"):
        return source.split(":", 1)[1]
    
    keys = source.split(".")
    value = profile
    for key in keys:
        value = value.get(key, "")
    return value

def submit_buy_indiana(profile_path: str, mapping_path: str, attachments_dir: str, dry_run: bool = False):
    """Submit Buy Indiana application"""
    
    profile = load_profile(profile_path)
    mapping = load_field_mapping(mapping_path)
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        
        print(f"🌐 Navigating to {mapping['portal_url']}")
        page.goto(mapping['portal_url'])
        
        # Wait for human login
        print("\n⏸️  Please log in to the portal")
        print("Press Enter when ready to continue...")
        input()
        
        # Fill form fields
        print("\n📝 Filling form fields...")
        for field_name, field_config in mapping['fields'].items():
            value = get_value_from_profile(profile, field_config['source'])
            selector = field_config['selector']
            field_type = field_config['type']
            
            print(f"  - {field_name}: {value}")
            
            try:
                if field_type == 'text' or field_type == 'email' or field_type == 'tel':
                    page.fill(selector, str(value))
                elif field_type == 'select':
                    page.select_option(selector, str(value))
                elif field_type == 'radio':
                    page.click(selector)
                elif field_type == 'checkbox':
                    if value:
                        page.check(selector)
            except Exception as e:
                print(f"    ⚠️  Error filling {field_name}: {e}")
        
        # Upload attachments
        print("\n📎 Uploading attachments...")
        for attachment in mapping['attachments']:
            file_path = Path(attachments_dir) / f"{attachment['name']}.pdf"
            if file_path.exists():
                print(f"  - {attachment['description']}")
                page.set_input_files(attachment['selector'], str(file_path))
            else:
                print(f"    ⚠️  File not found: {file_path}")
        
        # Screenshot before submit
        page.screenshot(path="buy_indiana_before_submit.png")
        print("\n📸 Screenshot saved: buy_indiana_before_submit.png")
        
        if dry_run:
            print("\n🏁 DRY RUN - Not submitting")
        else:
            print("\n⏸️  Review the form")
            print("Press Enter to SUBMIT or Ctrl+C to cancel...")
            input()
            
            # Submit
            print("\n🚀 Submitting...")
            page.click(mapping['submit_button'])
            
            # Wait for confirmation
            page.wait_for_load_state('networkidle')
            
            # Screenshot confirmation
            page.screenshot(path="buy_indiana_confirmation.png")
            print("📸 Confirmation screenshot saved")
            
            # Try to extract confirmation number
            try:
                confirmation = page.locator("text=/confirmation|reference|number/i").first.text_content()
                print(f"\n✅ Confirmation: {confirmation}")
            except:
                print("\n✅ Submitted (no confirmation number found)")
        
        browser.close()
        print("\n✅ Done!")

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--profile", default="../../backend/data/master_profile.json")
    parser.add_argument("--mapping", default="../field_mappings/FIELD_MAPPING_BUY_INDIANA.json")
    parser.add_argument("--attachments", default="../../backend/data/attachments")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    
    submit_buy_indiana(args.profile, args.mapping, args.attachments, args.dry_run)
