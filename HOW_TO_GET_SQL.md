# 🗄️ HOW TO GET ALL DATABASE SQL

**File**: `ALL_MIGRATIONS_COMBINED.sql`
**Size**: 635 KB (15,972 lines)
**Location**: Root of repository

---

## 📥 METHOD 1: Download from GitHub (EASIEST)

1. Go to: https://github.com/elevateforhumanity/fix2
2. Click on `ALL_MIGRATIONS_COMBINED.sql`
3. Click "Raw" button (top right)
4. Right-click → "Save As"
5. Save to your computer

**Direct Link**: 
https://raw.githubusercontent.com/elevateforhumanity/fix2/main/ALL_MIGRATIONS_COMBINED.sql

---

## 📥 METHOD 2: Copy from Gitpod

**If you're in Gitpod**:

1. Open file explorer (left sidebar)
2. Find `ALL_MIGRATIONS_COMBINED.sql` in root
3. Right-click → "Download"
4. Save to your computer

---

## 📥 METHOD 3: View in GitHub

1. Go to: https://github.com/elevateforhumanity/fix2
2. Click on `ALL_MIGRATIONS_COMBINED.sql`
3. Click "Copy raw file" button
4. Paste into Supabase SQL Editor

---

## 📥 METHOD 4: Command Line

```bash
# If you have git installed locally
git clone https://github.com/elevateforhumanity/fix2.git
cd fix2
# File is at: ALL_MIGRATIONS_COMBINED.sql
```

---

## 🚀 WHAT TO DO WITH IT

### Once You Have the File:

1. **Open Supabase Dashboard**
   - Go to your Supabase project
   - Click "SQL Editor"

2. **Copy All Contents**
   - Open `ALL_MIGRATIONS_COMBINED.sql`
   - Select all (Ctrl+A / Cmd+A)
   - Copy (Ctrl+C / Cmd+C)

3. **Paste in Supabase**
   - Go to SQL Editor
   - Paste (Ctrl+V / Cmd+V)

4. **Run**
   - Click "Run" button
   - Wait 5-10 minutes
   - Watch for completion

---

## 📊 WHAT'S IN THE FILE

### 66 Migrations Total:

**Core System (8)**:
- Onboarding tutorials
- CIP/SOC codes
- Content moderation
- Webhooks
- Referrals
- Payments
- Invoicing

**Course Content (8)**:
- ETPL programs
- JRI courses
- NRF Rise Up courses
- LMS courses (4 parts)
- Medical assistant course

**Database Structure (10)**:
- Missing columns
- Program holder columns
- Student columns
- User columns
- Missing tables
- Type fixes
- Foreign key fixes
- RLS policies

**Advanced Features (34)**:
- Analytics tables
- Attendance tracking
- Audit logging
- Certificate templates
- Communication logs
- Compliance tracking
- Course prerequisites
- Document management
- Email templates
- Enrollment workflow
- Grant tracking
- Instructor assignments
- Learning paths
- Notifications
- Partner integrations
- Payment plans
- Performance metrics
- Program outcomes
- Resource library
- Skill assessments
- Student support
- Survey system
- Task management
- Video tracking
- Workforce board
- Apprenticeship tracking
- Career services
- Employer partnerships
- Financial aid
- Job placement
- And 4 more...

**Security & Permissions (6)**:
- Course security
- HR documents
- MOU system
- Program holder permissions (flexible)
- Program holder permissions
- Program holders table

---

## ✅ FILE DETAILS

**Filename**: `ALL_MIGRATIONS_COMBINED.sql`
**Size**: 635 KB
**Lines**: 15,972
**Migrations**: 66
**Format**: PostgreSQL SQL
**Encoding**: UTF-8

---

## 🔍 PREVIEW (First 50 Lines)

```sql
-- COMBINED MIGRATIONS FOR SUPABASE
-- Generated: Sun Dec  7 20:18:32 UTC 2025
-- Total migrations: 66

-- ============================================
-- Migration: 20240115_onboarding_tutorials.sql
-- ============================================

-- Create user_onboarding table
CREATE TABLE IF NOT EXISTS user_onboarding (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  flow_id TEXT NOT NULL,
  current_step INTEGER DEFAULT 0,
  completed_steps TEXT[] DEFAULT '{}',
  completed BOOLEAN DEFAULT FALSE,
  skipped BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, flow_id)
);

-- Create user_tutorials table
CREATE TABLE IF NOT EXISTS user_tutorials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tutorial_id TEXT NOT NULL,
  current_step INTEGER DEFAULT 0,
  completed_steps TEXT[] DEFAULT '{}',
  completed BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, tutorial_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_user_onboarding_user_id ON user_onboarding(user_id);
CREATE INDEX IF NOT EXISTS idx_user_onboarding_flow_id ON user_onboarding(flow_id);
CREATE INDEX IF NOT EXISTS idx_user_onboarding_completed ON user_onboarding(completed);

CREATE INDEX IF NOT EXISTS idx_user_tutorials_user_id ON user_tutorials(user_id);
CREATE INDEX IF NOT EXISTS idx_user_tutorials_tutorial_id ON user_tutorials(tutorial_id);
CREATE INDEX IF NOT EXISTS idx_user_tutorials_completed ON user_tutorials(completed);

-- Enable Row Level Security
ALTER TABLE user_onboarding ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tutorials ENABLE ROW LEVEL SECURITY;
```

... and 15,922 more lines!

---

## 🚨 IMPORTANT

**This file contains ALL 66 database migrations.**

**Running this will**:
- Create all database tables
- Set up RLS policies
- Add indexes
- Seed initial data
- Enable webhooks
- Configure payments
- Set up referral system
- Add all courses and programs
- And everything else!

**Time to run**: 5-10 minutes

---

## 📞 NEED HELP?

**File is in repository**: `/workspaces/fix2/ALL_MIGRATIONS_COMBINED.sql`

**On GitHub**: https://github.com/elevateforhumanity/fix2/blob/main/ALL_MIGRATIONS_COMBINED.sql

**Direct download**: https://raw.githubusercontent.com/elevateforhumanity/fix2/main/ALL_MIGRATIONS_COMBINED.sql

---

## 🎯 NEXT STEP

1. Download the file using one of the methods above
2. Open Supabase SQL Editor
3. Copy and paste all contents
4. Click "Run"
5. Wait for completion
6. Tell me "Migrations complete!"

---

**The file is ready and waiting for you! 🚀**
