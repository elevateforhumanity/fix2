# Self-Managed Infrastructure (Open LMS-Style)

## Executive Summary

**Goal**: Build Open LMS-quality infrastructure ourselves  
**Approach**: Modern DevOps stack with full automation  
**Cost**: $50-$200/month (vs $3,000-$4,000/year for Open LMS)  
**Result**: Same capabilities, 95% cost savings, full control

---

## 1. Infrastructure Architecture

### Complete Stack

```
┌─────────────────────────────────────────────────────────────┐
│ SELF-MANAGED INFRASTRUCTURE                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  LAYER 1: FRONTEND (Netlify/Vercel - $0/month)             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ - React + TypeScript                                 │ │
│  │ - Docebo-style UI                                    │ │
│  │ - Global CDN                                         │ │
│  │ - Automatic HTTPS                                    │ │
│  │ - Deploy previews                                    │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  LAYER 2: API + BACKEND (Railway/Render - $20-$50/month)   │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ - Node.js/Express API                                │ │
│  │ - Docker containers                                  │ │
│  │ - Auto-scaling                                       │ │
│  │ - Load balancing                                     │ │
│  │ - Health checks                                      │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  LAYER 3: DATABASE (Supabase - $25/month)                  │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ - PostgreSQL (managed)                               │ │
│  │ - Automatic backups                                  │ │
│  │ - Point-in-time recovery                             │ │
│  │ - Connection pooling                                 │ │
│  │ - Read replicas                                      │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  LAYER 4: FILE STORAGE (Cloudflare R2 - $15/month)         │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ - S3-compatible storage                              │ │
│  │ - CDN integration                                    │ │
│  │ - Automatic backups                                  │ │
│  │ - Zero egress fees                                   │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  LAYER 5: MONITORING (Grafana Cloud - $0/month)            │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ - Metrics (Prometheus)                               │ │
│  │ - Logs (Loki)                                        │ │
│  │ - Traces (Tempo)                                     │ │
│  │ - Alerts (Slack/Email)                               │ │
│  │ - Dashboards                                         │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  LAYER 6: CI/CD (GitHub Actions - $0/month)                │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ - Automated testing                                  │ │
│  │ - Docker builds                                      │ │
│  │ - Deployment automation                              │ │
│  │ - Database migrations                                │ │
│  │ - Rollback capability                                │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  TOTAL COST: $60-$90/month ($720-$1,080/year)              │
│  vs Open LMS: $3,000-$4,000/year                           │
│  SAVINGS: $2,000-$3,000/year (75% cheaper)                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Infrastructure as Code

### Docker Setup

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build application
RUN npm run build

# Production image
FROM node:18-alpine

WORKDIR /app

# Copy built files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Run application
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  # Frontend (for local dev)
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - '5173:5173'
    environment:
      - VITE_API_URL=http://localhost:3000
    volumes:
      - ./src:/app/src
    depends_on:
      - api

  # API Backend
  api:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - postgres
      - redis
    restart: unless-stopped
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost:3000/health']
      interval: 30s
      timeout: 10s
      retries: 3

  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    ports:
      - '5432:5432'
    environment:
      - POSTGRES_DB=efh_lms
      - POSTGRES_USER=efh_user
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backups:/backups
    restart: unless-stopped
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U efh_user']
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis Cache
  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data
    restart: unless-stopped
    healthcheck:
      test: ['CMD', 'redis-cli', 'ping']
      interval: 10s
      timeout: 5s
      retries: 5

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    ports:
      - '80:80'
      - '443:443'
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - api
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

---

## 3. Automated Deployment

### Railway Configuration

```toml
# railway.toml
[build]
builder = "DOCKERFILE"
dockerfilePath = "Dockerfile"

[deploy]
startCommand = "node dist/server.js"
healthcheckPath = "/health"
healthcheckTimeout = 100
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10

[[services]]
name = "api"
source = "."

[services.env]
NODE_ENV = "production"

[[services.volumes]]
mountPath = "/app/uploads"
name = "uploads"

[[services.healthcheck]]
path = "/health"
interval = 30
timeout = 10
```

### Render Configuration

```yaml
# render.yaml
services:
  # API Service
  - type: web
    name: efh-api
    env: node
    buildCommand: npm ci && npm run build
    startCommand: node dist/server.js
    healthCheckPath: /health
    autoDeploy: true
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: efh-postgres
          property: connectionString

  # Worker Service (for background jobs)
  - type: worker
    name: efh-worker
    env: node
    buildCommand: npm ci && npm run build
    startCommand: node dist/worker.js
    envVars:
      - key: NODE_ENV
        value: production

databases:
  - name: efh-postgres
    databaseName: efh_lms
    user: efh_user
    plan: starter
```

---

## 4. Automated Backups

### Backup Script

```typescript
// scripts/backup.ts
import { exec } from 'child_process';
import { promisify } from 'util';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { createReadStream } from 'fs';
import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';

const execAsync = promisify(exec);

interface BackupConfig {
  databaseUrl: string;
  s3Bucket: string;
  s3Region: string;
  retentionDays: number;
}

class BackupService {
  private s3: S3Client;
  private config: BackupConfig;

  constructor(config: BackupConfig) {
    this.config = config;
    this.s3 = new S3Client({ region: config.s3Region });
  }

  /**
   * Create database backup
   */
  async backupDatabase(): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `backup-${timestamp}.sql`;
    const filepath = `/tmp/${filename}`;

    console.log('📦 Creating database backup...');

    // Create PostgreSQL dump
    await execAsync(`pg_dump ${this.config.databaseUrl} > ${filepath}`);

    console.log('✅ Database backup created:', filename);
    return filepath;
  }

  /**
   * Compress backup file
   */
  async compressBackup(filepath: string): Promise<string> {
    const compressedPath = `${filepath}.gz`;

    console.log('🗜️  Compressing backup...');

    await pipeline(
      createReadStream(filepath),
      createGzip(),
      createWriteStream(compressedPath)
    );

    console.log('✅ Backup compressed');
    return compressedPath;
  }

  /**
   * Upload to S3/R2
   */
  async uploadToCloud(filepath: string): Promise<void> {
    const filename = filepath.split('/').pop()!;

    console.log('☁️  Uploading to cloud storage...');

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.config.s3Bucket,
        Key: `backups/${filename}`,
        Body: createReadStream(filepath),
        StorageClass: 'STANDARD_IA', // Infrequent access (cheaper)
      })
    );

    console.log('✅ Backup uploaded to cloud');
  }

  /**
   * Clean up old backups
   */
  async cleanupOldBackups(): Promise<void> {
    console.log('🧹 Cleaning up old backups...');

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - this.config.retentionDays);

    // List and delete old backups from S3
    // Implementation here...

    console.log('✅ Old backups cleaned up');
  }

  /**
   * Run full backup process
   */
  async run(): Promise<void> {
    try {
      console.log('🚀 Starting backup process...\n');

      // 1. Create database backup
      const backupPath = await this.backupDatabase();

      // 2. Compress backup
      const compressedPath = await this.compressBackup(backupPath);

      // 3. Upload to cloud
      await this.uploadToCloud(compressedPath);

      // 4. Clean up old backups
      await this.cleanupOldBackups();

      // 5. Send success notification
      await this.sendNotification('✅ Backup completed successfully');

      console.log('\n✅ Backup process completed!');
    } catch (error) {
      console.error('❌ Backup failed:', error);
      await this.sendNotification('🚨 Backup failed: ' + error.message);
      throw error;
    }
  }

  /**
   * Send notification
   */
  async sendNotification(message: string): Promise<void> {
    // Send to Slack, email, etc.
    if (process.env.SLACK_WEBHOOK) {
      await fetch(process.env.SLACK_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message }),
      });
    }
  }
}

// Run backup
const backup = new BackupService({
  databaseUrl: process.env.DATABASE_URL!,
  s3Bucket: process.env.S3_BUCKET!,
  s3Region: process.env.S3_REGION!,
  retentionDays: 30,
});

backup.run().catch((error) => {
  console.error(error);
  process.exit(1);
});
```

### Automated Backup Schedule

```yaml
# .github/workflows/backup.yml
name: Automated Database Backup

on:
  schedule:
    # Run daily at 2 AM UTC
    - cron: '0 2 * * *'
  workflow_dispatch: # Manual trigger

jobs:
  backup:
    name: Backup Database
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run backup
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          S3_BUCKET: ${{ secrets.S3_BUCKET }}
          S3_REGION: ${{ secrets.S3_REGION }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
        run: npm run backup

      - name: Verify backup
        run: npm run backup:verify

      - name: Notify on failure
        if: failure()
        uses: 8398a7/action-slack@v3
        with:
          status: custom
          custom_payload: |
            {
              text: '🚨 Database backup failed!',
              attachments: [{
                color: 'danger',
                text: 'Check the workflow logs immediately.'
              }]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

---

## 5. Monitoring & Alerting

### Prometheus Configuration

```yaml
# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  # API metrics
  - job_name: 'api'
    static_configs:
      - targets: ['api:3000']
    metrics_path: '/metrics'

  # PostgreSQL metrics
  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres-exporter:9187']

  # Redis metrics
  - job_name: 'redis'
    static_configs:
      - targets: ['redis-exporter:9121']

  # Node exporter (system metrics)
  - job_name: 'node'
    static_configs:
      - targets: ['node-exporter:9100']

# Alerting rules
rule_files:
  - 'alerts.yml'

alerting:
  alertmanagers:
    - static_configs:
        - targets: ['alertmanager:9093']
```

### Alert Rules

```yaml
# alerts.yml
groups:
  - name: api_alerts
    interval: 30s
    rules:
      # High error rate
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: 'High error rate detected'
          description: 'Error rate is {{ $value }} errors/sec'

      # High response time
      - alert: HighResponseTime
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 2
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: 'High response time'
          description: '95th percentile response time is {{ $value }}s'

      # API down
      - alert: APIDown
        expr: up{job="api"} == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: 'API is down'
          description: 'API has been down for more than 1 minute'

  - name: database_alerts
    interval: 30s
    rules:
      # High database connections
      - alert: HighDatabaseConnections
        expr: pg_stat_database_numbackends > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: 'High database connections'
          description: 'Database has {{ $value }} active connections'

      # Database down
      - alert: DatabaseDown
        expr: up{job="postgres"} == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: 'Database is down'
          description: 'Database has been down for more than 1 minute'

      # Low disk space
      - alert: LowDiskSpace
        expr: (node_filesystem_avail_bytes / node_filesystem_size_bytes) < 0.1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: 'Low disk space'
          description: 'Disk space is below 10%'
```

### Grafana Dashboard

```json
// grafana-dashboard.json
{
  "dashboard": {
    "title": "EFH LMS Monitoring",
    "panels": [
      {
        "title": "API Request Rate",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])"
          }
        ],
        "type": "graph"
      },
      {
        "title": "Response Time (95th percentile)",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))"
          }
        ],
        "type": "graph"
      },
      {
        "title": "Error Rate",
        "targets": [
          {
            "expr": "rate(http_requests_total{status=~\"5..\"}[5m])"
          }
        ],
        "type": "graph"
      },
      {
        "title": "Database Connections",
        "targets": [
          {
            "expr": "pg_stat_database_numbackends"
          }
        ],
        "type": "graph"
      },
      {
        "title": "Memory Usage",
        "targets": [
          {
            "expr": "process_resident_memory_bytes"
          }
        ],
        "type": "graph"
      },
      {
        "title": "CPU Usage",
        "targets": [
          {
            "expr": "rate(process_cpu_seconds_total[5m])"
          }
        ],
        "type": "graph"
      }
    ]
  }
}
```

---

## 6. Auto-Scaling Configuration

### Kubernetes Setup (Optional)

```yaml
# kubernetes/deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: efh-api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: efh-api
  template:
    metadata:
      labels:
        app: efh-api
    spec:
      containers:
        - name: api
          image: ghcr.io/elevateforhumanity/efh-api:latest
          ports:
            - containerPort: 3000
          env:
            - name: NODE_ENV
              value: 'production'
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: efh-secrets
                  key: database-url
          resources:
            requests:
              memory: '256Mi'
              cpu: '250m'
            limits:
              memory: '512Mi'
              cpu: '500m'
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /ready
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: efh-api
spec:
  selector:
    app: efh-api
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer

---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: efh-api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: efh-api
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
```

---

## 7. Security Hardening

### Security Configuration

```typescript
// src/middleware/security.ts
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import { Express } from 'express';

export function setupSecurity(app: Express) {
  // Helmet - Security headers
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", 'data:', 'https:'],
        },
      },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
    })
  );

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP',
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.use('/api/', limiter);

  // Strict rate limit for auth endpoints
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts',
  });

  app.use('/api/auth/', authLimiter);

  // Sanitize user input
  app.use(mongoSanitize());

  // CORS configuration
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
}
```

### SSL/TLS Configuration

```nginx
# nginx-ssl.conf
server {
    listen 80;
    server_name elevateforhumanity.org;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name elevateforhumanity.org;

    # SSL certificates (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/elevateforhumanity.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/elevateforhumanity.org/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Proxy to API
    location /api {
        proxy_pass http://api:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 8. Cost Breakdown

### Monthly Costs

| Service          | Provider       | Cost        | Purpose               |
| ---------------- | -------------- | ----------- | --------------------- |
| Frontend Hosting | Netlify        | $0          | Static site hosting   |
| API Hosting      | Railway        | $20-$50     | Backend API           |
| Database         | Supabase       | $25         | PostgreSQL + backups  |
| File Storage     | Cloudflare R2  | $15         | User uploads, backups |
| Monitoring       | Grafana Cloud  | $0          | Metrics, logs, alerts |
| CI/CD            | GitHub Actions | $0          | Automated deployment  |
| SSL Certificates | Let's Encrypt  | $0          | HTTPS                 |
| **Total**        |                | **$60-$90** | **Full stack**        |

### Annual Costs

- **Year 1**: $720-$1,080
- **Years 2-5**: $720-$1,080/year

### Comparison

| Solution         | Year 1            | 5 Years             |
| ---------------- | ----------------- | ------------------- |
| **Open LMS**     | $3,000-$4,000     | $15,000-$20,000     |
| **Self-Managed** | $720-$1,080       | $3,600-$5,400       |
| **Savings**      | **$2,000-$3,000** | **$11,400-$14,600** |

**75-80% cost savings!**

---

## 9. Implementation Timeline

### Week 1: Infrastructure Setup

- [ ] Set up Railway/Render account
- [ ] Configure Supabase database
- [ ] Set up Cloudflare R2 storage
- [ ] Configure domain and SSL

### Week 2: Docker & CI/CD

- [ ] Create Dockerfiles
- [ ] Set up docker-compose
- [ ] Configure GitHub Actions
- [ ] Test automated deployment

### Week 3: Monitoring & Backups

- [ ] Set up Grafana Cloud
- [ ] Configure Prometheus
- [ ] Create backup scripts
- [ ] Test disaster recovery

### Week 4: Security & Testing

- [ ] Implement security hardening
- [ ] Set up rate limiting
- [ ] Configure SSL/TLS
- [ ] Load testing

---

## 10. Advantages vs Open LMS

### What You Get

✅ **Same Capabilities**:

- Managed hosting (Railway/Render)
- Automatic backups (Supabase + scripts)
- Monitoring (Grafana)
- Auto-scaling (Railway/Render)
- SSL/TLS (Let's Encrypt)

✅ **Better Control**:

- Full infrastructure access
- Custom configurations
- No vendor lock-in
- Choose your own tools

✅ **Lower Cost**:

- $60-$90/month vs $250-$333/month
- 75% cheaper
- $11,400-$14,600 saved over 5 years

✅ **Modern Stack**:

- Docker containers
- Kubernetes-ready
- Infrastructure as code
- GitOps workflow

---

## 11. Next Steps

1. ✅ Review infrastructure design
2. ⏳ Set up Railway/Render account
3. ⏳ Configure Supabase database
4. ⏳ Create Docker configuration
5. ⏳ Set up CI/CD pipeline
6. ⏳ Configure monitoring
7. ⏳ Implement backups
8. ⏳ Deploy to production

**Timeline**: 4 weeks to full production  
**Cost**: $60-$90/month  
**Result**: Open LMS-quality infrastructure at 75% lower cost

🚀 **Let's build it!**
