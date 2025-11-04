# Integration Guide

## Connect Autopilot Extensions to Your Suite

### Step 1: Copy Files

```bash
cp -r field_mappings/* ../backend/data/field_mappings/
cp -r playwright_scripts/* ../scripts/playwright/
cp -r packet_templates/* ../backend/data/packet_templates/
```

### Step 2: Install Dependencies

```bash
cd ../scripts/playwright
pip install playwright
python -m playwright install chromium
```

### Step 3: Test

```bash
python buy_indiana_portal.py --dry-run
```

### Step 4: Submit

```bash
# From dashboard or via API
curl -X POST http://localhost:7070/api/packets/{id}/submit
```

Done!
