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
