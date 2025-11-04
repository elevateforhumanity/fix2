"""Test field mappings are valid"""
import json
from pathlib import Path

def test_all_mappings():
    """Test all field mapping files"""
    mappings_dir = Path("../field_mappings")
    
    for mapping_file in mappings_dir.glob("FIELD_MAPPING_*.json"):
        print(f"Testing {mapping_file.name}...")
        
        with open(mapping_file) as f:
            mapping = json.load(f)
        
        # Check required keys
        assert "certification_type" in mapping
        assert "portal_url" in mapping
        assert "fields" in mapping
        assert "submit_button" in mapping
        
        # Check fields
        for field_name, field_config in mapping["fields"].items():
            assert "source" in field_config
            assert "selector" in field_config
            assert "type" in field_config
            assert "required" in field_config
        
        print(f"  ✅ {mapping_file.name} valid")

if __name__ == "__main__":
    test_all_mappings()
    print("\n✅ All field mappings valid!")
