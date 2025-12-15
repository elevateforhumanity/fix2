# How to Build Your Database URL Manually

## You Need 3 Things:

### 1. Your Project Reference (Project ID)
- Go to: Settings → General
- Look for "Reference ID" or "Project ID"
- It's a short string like: `abcdefghijk`

### 2. Your Database Password
- You're already on the Database settings page
- Click "Reset database password" button
- **COPY THE PASSWORD IMMEDIATELY** (you won't see it again!)
- Example: `MySecurePass123`

### 3. Your Region
- Look at your project URL in the browser
- Or go to Settings → General
- Common regions:
  - `aws-0-us-east-1` (US East)
  - `aws-0-us-west-1` (US West)
  - `aws-0-eu-west-1` (Europe)
  - `aws-0-ap-southeast-1` (Asia)

## Build Your Connection String:

### Format for Pooled Connection (Recommended):
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

### Format for Direct Connection:
```
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

## Example:

If your:
- Project Reference: `abcdefghijk`
- Password: `MySecurePass123`
- Region: `us-east-1`

### Pooled Connection:
```
postgresql://postgres.abcdefghijk:MySecurePass123@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

### Direct Connection:
```
postgresql://postgres:MySecurePass123@db.abcdefghijk.supabase.co:5432/postgres
```

## Add to .env.local:

```bash
DATABASE_URL=postgresql://postgres.abcdefghijk:MySecurePass123@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```
