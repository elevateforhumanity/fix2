# Backup and Restore Runbook

## Backup Strategy

### Automated Backups (Supabase)

- **Daily backups**: Enabled by default on Supabase Pro/Team plans
- **Retention**: 7 days (Pro), 30 days (Team/Enterprise)
- **Location**: Supabase dashboard → Database → Backups

### Manual Backup

```bash
# Export full database schema + data
pg_dump -h db.PROJECT_REF.supabase.co \
  -U postgres \
  -d postgres \
  --clean --if-exists \
  --no-owner --no-privileges \
  > backup_$(date +%Y%m%d_%H%M%S).sql

# Export schema only
pg_dump -h db.PROJECT_REF.supabase.co \
  -U postgres \
  -d postgres \
  --schema-only \
  --no-owner --no-privileges \
  > schema_$(date +%Y%m%d_%H%M%S).sql

# Export specific table
pg_dump -h db.PROJECT_REF.supabase.co \
  -U postgres \
  -d postgres \
  -t public.organizations \
  > orgs_backup_$(date +%Y%m%d_%H%M%S).sql
```

### Backup Verification

```bash
# Check backup file size
ls -lh backup_*.sql

# Verify SQL syntax
psql -h localhost -U postgres -d test_db -f backup_*.sql --dry-run

# Count records in backup
grep "INSERT INTO" backup_*.sql | wc -l
```

## Restore Procedures

### Full Database Restore

```bash
# 1. Create new Supabase project (if disaster recovery)
# 2. Get connection string from project settings
# 3. Restore from backup

psql -h db.NEW_PROJECT_REF.supabase.co \
  -U postgres \
  -d postgres \
  -f backup_YYYYMMDD_HHMMSS.sql

# 4. Verify restoration
psql -h db.NEW_PROJECT_REF.supabase.co \
  -U postgres \
  -d postgres \
  -c "SELECT COUNT(*) FROM organizations;"
```

### Point-in-Time Recovery (PITR)

Available on Supabase Pro/Team plans:

1. Navigate to Supabase dashboard → Database → Backups
2. Select "Point in Time Recovery"
3. Choose timestamp (within retention window)
4. Confirm restoration

### Partial Restore (Single Table)

```bash
# Extract single table from backup
grep -A 10000 "CREATE TABLE public.organizations" backup.sql > orgs_only.sql

# Restore to existing database
psql -h db.PROJECT_REF.supabase.co \
  -U postgres \
  -d postgres \
  -f orgs_only.sql
```

## Disaster Recovery

### Scenario: Complete Database Loss

1. **Create new Supabase project**
2. **Restore from most recent backup**
3. **Update environment variables** in Vercel/hosting:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. **Run migrations** if backup is older than current schema:
   ```bash
   supabase db push
   ```
5. **Verify data integrity**:
   ```sql
   SELECT COUNT(*) FROM organizations;
   SELECT COUNT(*) FROM profiles;
   SELECT COUNT(*) FROM students;
   ```
6. **Test critical flows**:
   - User login
   - Organization creation
   - Student enrollment

### Scenario: Data Corruption

1. **Identify affected tables/records**
2. **Export current state** (for forensics):
   ```bash
   pg_dump -h db.PROJECT_REF.supabase.co -U postgres -d postgres \
     -t public.AFFECTED_TABLE > corrupted_$(date +%Y%m%d).sql
   ```
3. **Restore from backup** (see above)
4. **Verify restoration**
5. **Document incident** in system_errors table

### Scenario: Accidental Deletion

1. **Stop all writes** (maintenance mode if possible)
2. **Identify deletion timestamp**
3. **Use PITR** to restore to pre-deletion state
4. **Export deleted records** from restored backup
5. **Re-import to production**

## Backup Checklist

### Daily

- [ ] Verify automated backup completed (check Supabase dashboard)
- [ ] Check backup file size (should be consistent)

### Weekly

- [ ] Test restore to staging environment
- [ ] Verify data integrity post-restore
- [ ] Document any issues

### Monthly

- [ ] Full disaster recovery drill
- [ ] Update runbook with lessons learned
- [ ] Review backup retention policy

## Storage Locations

- **Automated backups**: Supabase infrastructure (encrypted at rest)
- **Manual backups**: Store in secure S3 bucket with versioning enabled
- **Off-site copies**: Recommended for compliance (e.g., AWS Glacier)

## Encryption

- All Supabase backups are encrypted at rest (AES-256)
- Manual backups should be encrypted before storage:
  ```bash
  gpg --symmetric --cipher-algo AES256 backup.sql
  ```

## Compliance Notes

- **FERPA**: Student data backups must be encrypted and access-controlled
- **Retention**: Follow organizational data retention policies
- **Audit trail**: Log all backup/restore operations in system_errors table
