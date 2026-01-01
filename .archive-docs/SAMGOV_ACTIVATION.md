# SAM.gov API Activation Guide

## Quick Start

Your SAM.gov grants system is built and ready. Follow these steps to activate it:

---

## Option 1: Automated Activation (Recommended)

### Prerequisites

- Vercel account access
- Vercel CLI installed

### Steps

1. **Login to Vercel CLI:**

   ```bash
   vercel login
   ```

2. **Run the activation script:**

   ```bash
   cd /workspaces/fix2
   ./scripts/activate-samgov.sh
   ```

3. **Done!** The script will:
   - Add SAM_GOV_API_KEY to Vercel
   - Add SAM_API_TOKEN to Vercel
   - Trigger a production deployment

---

## Option 2: Manual Activation via Vercel Dashboard

### Steps

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/team_wnZ7iyQz1kUNni7yIDVUnhZf/fix2/settings/environment-variables

2. **Add Environment Variables:**

   **Variable 1:**
   - Name: `SAM_GOV_API_KEY`
   - Value: `Vyi2/MKIhgOcxxrjHzZMtAZUFeW3AqW5Pa1IOmFYEHo=`
   - Environment: ✅ Production, ✅ Preview, ✅ Development

   **Variable 2:**
   - Name: `SAM_API_TOKEN`
   - Value: `SAM-736d2153-2d8a-475a-ad02-9e4eee1d0e99`
   - Environment: ✅ Production, ✅ Preview, ✅ Development

3. **Redeploy:**
   - Go to Deployments tab
   - Click "Redeploy" on the latest deployment
   - Or push a new commit to trigger automatic deployment

---

## Option 3: Manual Activation via Vercel CLI

### Steps

```bash
# Login to Vercel
vercel login

# Navigate to project
cd /workspaces/fix2

# Add SAM_GOV_API_KEY
echo "Vyi2/MKIhgOcxxrjHzZMtAZUFeW3AqW5Pa1IOmFYEHo=" | vercel env add SAM_GOV_API_KEY production

# Add SAM_API_TOKEN
echo "SAM-736d2153-2d8a-475a-ad02-9e4eee1d0e99" | vercel env add SAM_API_TOKEN production

# Deploy
vercel --prod
```

---

## Verification

### 1. Check Environment Variables

Visit your Vercel dashboard and verify both variables are set:

- https://vercel.com/team_wnZ7iyQz1kUNni7yIDVUnhZf/fix2/settings/environment-variables

### 2. Test the API

Once deployed, test the integration:

```bash
# Test entity eligibility check
curl -X POST https://elevateforhumanity.org/api/grants/eligibility \
  -H "Content-Type: application/json" \
  -d '{
    "action": "check_entity",
    "entityId": "test-entity-id"
  }'

# Test SAM.gov entity search
curl "https://elevateforhumanity.org/api/sam-gov/search?name=Elevate"
```

### 3. Check Logs

Monitor the deployment logs in Vercel dashboard for any errors.

---

## What Gets Activated

Once the API key is active, these features will work:

### ✅ Entity Eligibility Checks

- SAM.gov registration validation
- UEI (Unique Entity Identifier) verification
- CAGE code validation
- Federal exclusions list checking
- Registration expiration monitoring

### ✅ Grant Matching

- Automatic matching of entities to eligible grants
- NAICS code matching
- Geographic eligibility
- Entity type matching

### ✅ Federal Forms Auto-Fill

- SF-424 (Application for Federal Assistance)
- SF-424A (Budget Information)
- SF-LLL (Disclosure of Lobbying Activities)
- Auto-populated with SAM.gov data

### ✅ Grant Sync

- Sync grant opportunities from SAM.gov
- Track grant deadlines
- Monitor new opportunities

---

## API Endpoints Available

Once activated, these endpoints will be functional:

| Endpoint                  | Method | Description              |
| ------------------------- | ------ | ------------------------ |
| `/api/grants/eligibility` | POST   | Check entity eligibility |
| `/api/grants/match`       | POST   | Match entities to grants |
| `/api/grants/sync`        | POST   | Sync grants from SAM.gov |
| `/api/grants/forms`       | POST   | Generate federal forms   |
| `/api/grants/package`     | POST   | Build grant packages     |
| `/api/grants/submit`      | POST   | Submit applications      |
| `/api/sam-gov/search`     | GET    | Search SAM.gov entities  |

---

## Troubleshooting

### Issue: "SAM.gov API key not configured"

**Solution:** Verify the environment variable is set in Vercel:

1. Go to Project Settings → Environment Variables
2. Check that `SAM_GOV_API_KEY` exists
3. Redeploy the application

### Issue: "Entity not found in SAM.gov registry"

**Solution:** The entity needs to be registered in SAM.gov:

1. Visit https://sam.gov
2. Register your organization
3. Obtain UEI (Unique Entity Identifier)
4. Add UEI to your entity record in the database

### Issue: API returns 401 Unauthorized

**Solution:** The API key may be invalid or expired:

1. Verify the API key is correct
2. Check SAM.gov API key status at https://open.gsa.gov/api/sam-entity-api/
3. Generate a new API key if needed

---

## Database Setup

Ensure these tables exist in Supabase:

```sql
-- Entities (organizations applying for grants)
CREATE TABLE entities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  uei TEXT UNIQUE,
  ein TEXT,
  entity_type TEXT,
  naics_list TEXT[],
  state TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Grant opportunities
CREATE TABLE grant_opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_id UUID REFERENCES grant_sources(id),
  external_id TEXT NOT NULL,
  title TEXT NOT NULL,
  agency TEXT,
  summary TEXT,
  eligibility TEXT,
  naics_tags TEXT[],
  categories TEXT[],
  location_limit TEXT,
  due_date DATE,
  url TEXT,
  raw_json JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(source_id, external_id)
);

-- Eligibility checks
CREATE TABLE entity_eligibility_checks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_id UUID REFERENCES entities(id),
  uei TEXT,
  sam_registered BOOLEAN,
  sam_active BOOLEAN,
  uei_valid BOOLEAN,
  cage_valid BOOLEAN,
  not_excluded BOOLEAN,
  reps_certs_current BOOLEAN,
  registration_not_expired BOOLEAN,
  issues TEXT[],
  warnings TEXT[],
  eligible BOOLEAN,
  score INTEGER,
  checked_at TIMESTAMPTZ,
  sam_data JSONB,
  UNIQUE(entity_id)
);
```

---

## Support

For issues or questions:

- Check logs in Vercel dashboard
- Review SAM.gov API documentation: https://open.gsa.gov/api/sam-entity-api/
- Contact support: support@elevateforhumanity.org

---

## Next Steps After Activation

1. **Add Entities** - Register organizations in the `entities` table
2. **Sync Grants** - Run `/api/grants/sync` to populate opportunities
3. **Check Eligibility** - Use `/api/grants/eligibility` to validate entities
4. **Match Grants** - Run matching algorithm to find eligible grants
5. **Generate Forms** - Auto-fill federal forms with SAM.gov data

---

## Security Notes

- ✅ API keys are stored securely in Vercel environment variables
- ✅ Keys are never exposed to the client
- ✅ All API calls are server-side only
- ✅ Rate limiting is implemented
- ✅ Audit logs track all eligibility checks

---

**Status:** Ready to activate! 🚀

Choose your preferred activation method above and follow the steps.
