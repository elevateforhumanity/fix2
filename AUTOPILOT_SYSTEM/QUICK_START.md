# Quick Start Guide

## Get Your Autopilot System Running in 30 Minutes

---

## ✅ What You're Building

**Human-in-the-Loop Certification System:**

- Autopilot pre-fills applications from master profile
- Workers review/edit/inject missing data via dashboard
- System submits to government portals
- Complete audit trail of all changes

---

## 📦 What's Included

```
AUTOPILOT_SYSTEM/
├── README.md                    - Full documentation
├── QUICK_START.md              - This file
├── backend/
│   ├── database/
│   │   └── schema.sql          - Complete Supabase schema
│   ├── api/                    - FastAPI endpoints (to build)
│   └── automation/             - PDF & portal bots (to build)
├── frontend/                   - React dashboard (to build)
├── data/
│   └── master_profile.json     - Your business data
└── CERTIFICATION_APPLICATIONS_BUNDLE/  - All 6 applications
```

---

## 🚀 30-Minute Setup

### **Step 1: Setup Supabase (5 min)**

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy your project URL and anon key
4. Go to SQL Editor
5. Paste contents of `backend/database/schema.sql`
6. Click "Run"
7. ✅ Database ready!

### **Step 2: Fill Master Profile (10 min)**

1. Open `data/master_profile.json`
2. Search for `[PLACEHOLDER]`
3. Fill in your information:
   - EINs
   - SSN (keep secure!)
   - Dates of birth/formation
   - Financial information
   - Addresses
4. Save file
5. ✅ Profile ready!

### **Step 3: Install Dependencies (5 min)**

```bash
# Backend
cd backend
pip install fastapi uvicorn supabase pypdf playwright

# Frontend (if building dashboard)
cd ../frontend
npm install
```

### **Step 4: Configure Environment (5 min)**

Create `.env` file:

```bash
SUPABASE_URL=your-project-url
SUPABASE_KEY=your-anon-key
JWT_SECRET=your-random-secret
```

### **Step 5: Start System (5 min)**

```bash
# Start backend
cd backend
python -m uvicorn main:app --reload

# Start frontend (separate terminal)
cd frontend
npm run dev
```

✅ **System running at http://localhost:3000**

---

## 🎯 What To Do Next

### **Option A: Manual Applications (Today)**

Use the `CERTIFICATION_APPLICATIONS_BUNDLE/`:

1. Open each application file
2. Fill in remaining [PLACEHOLDER] items
3. Use ChatGPT script to format
4. Print and manually submit

**Timeline:** Submit all 6 in 1-2 weeks

### **Option B: Build Full Autopilot (This Week)**

1. **Build Worker Dashboard** (React)
   - Packet list view
   - Field editor
   - File upload
   - Approval workflow

2. **Build API Endpoints** (FastAPI)
   - Profile management
   - Packet CRUD
   - Data injection
   - Audit logging

3. **Build PDF Automation** (Python)
   - List PDF fields
   - Fill from master profile
   - Flatten final PDF

4. **Build Portal Bot** (Playwright)
   - Navigate to portals
   - Fill web forms
   - Upload documents
   - Submit applications

**Timeline:** Full system in 1-2 weeks

### **Option C: Hybrid Approach (Recommended)**

**Week 1:** Submit Buy Indiana & MBE/WBE manually  
**Week 2:** Build autopilot for remaining 4  
**Week 3:** Submit WOSB, DBE, 8(a), HUBZone via autopilot

---

## 📋 Checklist

**Setup:**

- [ ] Supabase project created
- [ ] Schema.sql executed
- [ ] Master profile filled
- [ ] Dependencies installed
- [ ] Environment configured

**Applications:**

- [ ] Buy Indiana ready
- [ ] Indiana MBE/WBE ready
- [ ] WOSB/EDWOSB ready
- [ ] DBE/ACDBE ready
- [ ] 8(a) ready
- [ ] HUBZone ready (if applicable)

**System:**

- [ ] Database working
- [ ] API endpoints built
- [ ] Worker dashboard built
- [ ] PDF automation working
- [ ] Portal bot tested

---

## 🆘 Need Help?

**Can't setup Supabase?**

- Watch: [Supabase Quickstart](https://supabase.com/docs/guides/getting-started)
- Alternative: Use PostgreSQL locally

**Don't want to code?**

- Use manual applications from bundle
- Hire developer to build system
- Use no-code tools (Zapier, Make)

**Questions about applications?**

- Each application file has agency contacts
- Call SBA: 1-800-827-5722
- Use APEX Accelerators: apexaccelerators.us

---

## 💡 Pro Tips

**Start Simple:**

- Submit Buy Indiana manually first (easiest)
- Build autopilot for complex ones (8(a), DBE)
- Iterate and improve

**Security First:**

- Never commit .env file
- Encrypt sensitive data
- Use strong passwords
- Enable MFA everywhere

**Test Everything:**

- Test with blank PDFs first
- Verify all fields map correctly
- Do dry runs before real submissions
- Keep backups of everything

---

## 🎉 Success Metrics

**Week 1:**

- [ ] System setup complete
- [ ] 1-2 applications submitted manually

**Month 1:**

- [ ] All 6 applications submitted
- [ ] 1-2 approvals received
- [ ] Autopilot working for future renewals

**Month 3:**

- [ ] 4-5 certifications approved
- [ ] Using certifications on bids
- [ ] First contract won

**Month 6:**

- [ ] All certifications approved
- [ ] Multiple active contracts
- [ ] $500K+ in contract revenue

---

## 📞 Support

**Technical:** Review README.md and API.md  
**Applications:** See CERTIFICATION_APPLICATIONS_BUNDLE/  
**Business:** Contact Elizabeth Greene

---

**You've got this! Let's get those certifications! 🚀**
