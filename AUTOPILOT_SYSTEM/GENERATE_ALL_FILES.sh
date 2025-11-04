#!/bin/bash
# Generate all remaining autopilot system files

echo "Generating all autopilot system files..."

# Create directory structure
mkdir -p backend/api/routers
mkdir -p backend/automation
mkdir -p backend/database
mkdir -p frontend/src/components
mkdir -p frontend/src/pages
mkdir -p frontend/src/hooks
mkdir -p frontend/src/lib
mkdir -p scripts
mkdir -p data/templates
mkdir -p data/packets
mkdir -p docs

# Backend - Remaining routers
cat > backend/api/routers/audit.py << 'EOF'
from fastapi import APIRouter
from typing import List
from datetime import datetime

router = APIRouter()

@router.get("/")
async def list_audit_logs(limit: int = 50, offset: int = 0):
    """List all audit logs"""
    return {"logs": [], "total": 0}

@router.get("/{audit_id}")
async def get_audit_log(audit_id: str):
    """Get specific audit log"""
    return {"id": audit_id, "action": "update", "created_at": datetime.now()}

@router.get("/packet/{packet_id}")
async def get_packet_audit_trail(packet_id: str):
    """Get audit trail for specific packet"""
    return {"packet_id": packet_id, "logs": []}
EOF

cat > backend/api/routers/auth.py << 'EOF'
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
async def login(request: LoginRequest):
    """User login"""
    return {"access_token": "token", "user": {"email": request.email, "role": "worker"}}

@router.post("/logout")
async def logout():
    """User logout"""
    return {"status": "ok"}

@router.get("/me")
async def get_current_user():
    """Get current user"""
    return {"id": "uuid", "email": "user@example.com", "role": "worker"}
EOF

# Backend - Automation scripts
cat > backend/automation/pdf_filler.py << 'EOF'
"""
PDF Field Filler
Fill PDF forms with data from master profile
"""

from pypdf import PdfReader, PdfWriter
import json

def list_pdf_fields(pdf_path: str) -> dict:
    """List all fillable fields in PDF"""
    reader = PdfReader(pdf_path)
    fields = reader.get_fields()
    return {name: field.get('/T', '') for name, field in fields.items()}

def fill_pdf(template_path: str, output_path: str, data: dict):
    """Fill PDF with data"""
    reader = PdfReader(template_path)
    writer = PdfWriter()
    
    # Fill fields
    writer.append_pages_from_reader(reader)
    writer.update_page_form_field_values(writer.pages[0], data)
    
    # Write output
    with open(output_path, 'wb') as output_file:
        writer.write(output_file)
    
    return output_path

def flatten_pdf(pdf_path: str, output_path: str):
    """Flatten PDF to prevent editing"""
    reader = PdfReader(pdf_path)
    writer = PdfWriter()
    
    for page in reader.pages:
        writer.add_page(page)
    
    # Flatten
    writer.flatten()
    
    with open(output_path, 'wb') as output_file:
        writer.write(output_file)
    
    return output_path

if __name__ == "__main__":
    # Example usage
    fields = list_pdf_fields("template.pdf")
    print(json.dumps(fields, indent=2))
EOF

cat > backend/automation/portal_bot.py << 'EOF'
"""
Portal Automation Bot
Playwright automation for government portals
"""

from playwright.sync_api import sync_playwright, Page
import time

class PortalBot:
    def __init__(self, headless: bool = False):
        self.headless = headless
        self.playwright = None
        self.browser = None
        self.page = None
    
    def start(self):
        """Start browser"""
        self.playwright = sync_playwright().start()
        self.browser = self.playwright.chromium.launch(headless=self.headless)
        self.page = self.browser.new_page()
    
    def stop(self):
        """Stop browser"""
        if self.browser:
            self.browser.close()
        if self.playwright:
            self.playwright.stop()
    
    def navigate(self, url: str):
        """Navigate to URL"""
        self.page.goto(url)
    
    def fill_field(self, selector: str, value: str):
        """Fill form field"""
        self.page.fill(selector, value)
    
    def click(self, selector: str):
        """Click element"""
        self.page.click(selector)
    
    def upload_file(self, selector: str, file_path: str):
        """Upload file"""
        self.page.set_input_files(selector, file_path)
    
    def screenshot(self, path: str):
        """Take screenshot"""
        self.page.screenshot(path=path)
    
    def wait_for_manual_action(self, message: str = "Complete manual action"):
        """Pause for human intervention (e.g., MFA)"""
        print(f"\n{message}")
        print("Press Enter when ready to continue...")
        input()

# Example: SBA certify.sba.gov automation
def submit_to_sba(packet_data: dict):
    """Submit packet to SBA portal"""
    bot = PortalBot(headless=False)
    bot.start()
    
    try:
        # Navigate
        bot.navigate("https://certify.sba.gov")
        
        # Wait for manual login (MFA)
        bot.wait_for_manual_action("Please log in and complete MFA")
        
        # Fill form
        bot.fill_field("#business_name", packet_data.get("business_name", ""))
        bot.fill_field("#ein", packet_data.get("ein", ""))
        
        # Upload documents
        if "documents" in packet_data:
            for doc in packet_data["documents"]:
                bot.upload_file("#file_upload", doc)
        
        # Screenshot before submit
        bot.screenshot("before_submit.png")
        
        # Submit (or wait for manual)
        bot.wait_for_manual_action("Review and click Submit")
        
        # Screenshot confirmation
        bot.screenshot("confirmation.png")
        
        return {"status": "success", "confirmation": "screenshot saved"}
    
    finally:
        bot.stop()

if __name__ == "__main__":
    # Test
    data = {"business_name": "Test Business", "ein": "12-3456789"}
    submit_to_sba(data)
EOF

cat > backend/automation/packet_generator.py << 'EOF'
"""
Packet Generator
Generate certification packets from master profile
"""

import json
from datetime import datetime

def generate_packet(profile_path: str, certification_type: str) -> dict:
    """Generate packet from master profile"""
    
    # Load master profile
    with open(profile_path, 'r') as f:
        profile = json.load(f)
    
    # Map profile data to certification fields
    packet = {
        "packet_number": f"PKT_{datetime.now().strftime('%Y%m%d')}_{1:03d}",
        "certification_type": certification_type,
        "status": "draft",
        "created_at": datetime.now().isoformat(),
        "fields": {}
    }
    
    # Map common fields
    if certification_type == "buy_indiana":
        packet["fields"] = {
            "business_name": profile.get("entities", {}).get("2exclusive", {}).get("legal_name"),
            "ein": profile.get("entities", {}).get("2exclusive", {}).get("ein"),
            "address": profile.get("business", {}).get("primary_address", {}).get("street"),
            "phone": profile.get("owner", {}).get("contact", {}).get("business_phone"),
        }
    
    elif certification_type == "8a_business_development":
        packet["fields"] = {
            "business_name": profile.get("entities", {}).get("selfish_inc", {}).get("legal_name"),
            "ein": profile.get("entities", {}).get("selfish_inc", {}).get("ein"),
            "owner_name": profile.get("owner", {}).get("full_name"),
            "owner_ssn": profile.get("owner", {}).get("ssn"),
            "owner_race": profile.get("owner", {}).get("race_ethnicity"),
        }
    
    return packet

if __name__ == "__main__":
    packet = generate_packet("../../data/master_profile.json", "buy_indiana")
    print(json.dumps(packet, indent=2))
EOF

# Frontend package.json
cat > frontend/package.json << 'EOF'
{
  "name": "autopilot-dashboard",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.0",
    "@tanstack/react-query": "^5.17.0",
    "axios": "^1.6.5",
    "zustand": "^4.4.7",
    "date-fns": "^3.0.6",
    "lucide-react": "^0.309.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.33",
    "tailwindcss": "^3.4.1",
    "vite": "^5.0.11"
  }
}
EOF

# Frontend vite.config.js
cat > frontend/vite.config.js << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  }
})
EOF

# Frontend tailwind.config.js
cat > frontend/tailwind.config.js << 'EOF'
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

# Frontend index.html
cat > frontend/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Certification Autopilot</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

# Frontend main files
cat > frontend/src/main.tsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF

cat > frontend/src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF

cat > frontend/src/App.tsx << 'EOF'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import PacketDetail from './pages/PacketDetail'
import AuditTrail from './pages/AuditTrail'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold">Certification Autopilot</h1>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/packets/:id" element={<PacketDetail />} />
          <Route path="/audit" element={<AuditTrail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
EOF

cat > frontend/src/pages/Dashboard.tsx << 'EOF'
import React from 'react'

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Certification Packets</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <p>Packet list will appear here</p>
        <p className="text-sm text-gray-500 mt-2">
          Connect to API at /api/packets to load data
        </p>
      </div>
    </div>
  )
}
EOF

cat > frontend/src/pages/PacketDetail.tsx << 'EOF'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function PacketDetail() {
  const { id } = useParams()
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Packet Details</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <p>Packet ID: {id}</p>
        <p className="text-sm text-gray-500 mt-2">
          Field editor and file upload will appear here
        </p>
      </div>
    </div>
  )
}
EOF

cat > frontend/src/pages/AuditTrail.tsx << 'EOF'
import React from 'react'

export default function AuditTrail() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Audit Trail</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <p>Audit logs will appear here</p>
      </div>
    </div>
  )
}
EOF

# Scripts
cat > scripts/list_pdf_fields.py << 'EOF'
#!/usr/bin/env python3
"""List all fields in a PDF"""
import sys
from pypdf import PdfReader

if len(sys.argv) < 2:
    print("Usage: python list_pdf_fields.py <pdf_file>")
    sys.exit(1)

pdf_path = sys.argv[1]
reader = PdfReader(pdf_path)
fields = reader.get_fields()

print(f"Found {len(fields)} fields in {pdf_file}:")
for name, field in fields.items():
    print(f"  - {name}")
EOF

chmod +x scripts/list_pdf_fields.py

# Documentation
cat > docs/SETUP.md << 'EOF'
# Setup Guide

## Prerequisites
- Python 3.10+
- Node.js 18+
- Supabase account
- Git

## Backend Setup
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your credentials
python -m uvicorn api.main:app --reload
```

## Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Database Setup
1. Create Supabase project
2. Run schema.sql in SQL Editor
3. Copy connection details to .env

## Testing
- Backend: http://localhost:8000/docs
- Frontend: http://localhost:3000
EOF

cat > docs/API.md << 'EOF'
# API Documentation

## Authentication
All endpoints require Bearer token in Authorization header.

## Endpoints

### Profiles
- GET /api/profiles/{org_id} - Get profile
- PATCH /api/profiles/{org_id} - Update profile
- GET /api/profiles/{org_id}/history - Get history

### Packets
- GET /api/packets - List packets
- POST /api/packets - Create packet
- GET /api/packets/{id} - Get packet
- PATCH /api/packets/{id} - Update packet
- POST /api/packets/{id}/approve - Approve
- POST /api/packets/{id}/submit - Submit

### Injection
- POST /api/inject/packets/{id}/inject - Inject data
- POST /api/inject/profiles/{org_id}/inject - Inject profile

### Audit
- GET /api/audit - List logs
- GET /api/audit/{id} - Get log
- GET /api/audit/packet/{id} - Get packet trail
EOF

cat > docs/WORKER_GUIDE.md << 'EOF'
# Worker Guide

## Getting Started
1. Log in to dashboard
2. View packet list
3. Click packet to edit

## Editing Packets
1. Review pre-filled fields
2. Fill in [PLACEHOLDER] items
3. Upload required documents
4. Click "Mark Ready for Review"

## Uploading Files
1. Click "Upload" button
2. Select file
3. Wait for confirmation
4. File appears in attachments list

## Approval Process
1. Worker marks ready
2. Reviewer approves
3. System submits to portal
4. Confirmation received
EOF

cat > docs/DEPLOYMENT.md << 'EOF'
# Deployment Guide

## Production Checklist
- [ ] Environment variables set
- [ ] Database migrations run
- [ ] SSL certificates configured
- [ ] Backup strategy in place
- [ ] Monitoring enabled

## Deploy Backend
```bash
# Using Docker
docker build -t autopilot-api .
docker run -p 8000:8000 autopilot-api

# Or using systemd
sudo systemctl start autopilot-api
```

## Deploy Frontend
```bash
npm run build
# Deploy dist/ to CDN or static host
```

## Database Backups
```bash
# Daily backups
pg_dump -h supabase-url -U postgres > backup.sql
```
EOF

# Environment example
cat > backend/.env.example << 'EOF'
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
JWT_SECRET=your-random-secret-key
S3_BUCKET=your-bucket-name
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASSWORD=your-password
SLACK_WEBHOOK=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
EOF

echo "✅ All files generated!"
echo ""
echo "Next steps:"
echo "1. cd backend && pip install -r requirements.txt"
echo "2. cd frontend && npm install"
echo "3. Setup Supabase and run schema.sql"
echo "4. Copy .env.example to .env and fill in values"
echo "5. Start backend: python -m uvicorn api.main:app --reload"
echo "6. Start frontend: npm run dev"
