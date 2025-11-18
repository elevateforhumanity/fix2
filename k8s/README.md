# Kubernetes Deployment

## Overview
This directory contains Kubernetes manifests for deploying the Elevate for Humanity LMS to a production Kubernetes cluster.

## Prerequisites

- Kubernetes cluster (GKE, EKS, AKS, or self-hosted)
- `kubectl` configured to access your cluster
- Docker image built and pushed to `ghcr.io/elevateforhumanity/efh-web:latest`
- TLS certificate stored as secret `efh-tls`
- Application secrets stored as secret `efh-secrets`

## Quick Start

### 1. Create Secrets

```bash
# Create namespace first
kubectl apply -f namespace.yaml

# Create TLS secret (if using cert-manager, skip this)
kubectl create secret tls efh-tls \
  --cert=path/to/tls.crt \
  --key=path/to/tls.key \
  -n efh-prod

# Create application secrets
kubectl create secret generic efh-secrets \
  --from-literal=DATABASE_URL='postgresql://...' \
  --from-literal=SENTRY_DSN='https://...' \
  --from-literal=STRIPE_SECRET_KEY='sk_live_...' \
  -n efh-prod
```

### 2. Deploy Application

```bash
# Apply all manifests
kubectl apply -f namespace.yaml
kubectl apply -f deployment-app.yaml
kubectl apply -f service-app.yaml
kubectl apply -f ingress-app.yaml
kubectl apply -f hpa-app.yaml
```

### 3. Verify Deployment

```bash
# Check pods
kubectl get pods -n efh-prod

# Check service
kubectl get svc -n efh-prod

# Check ingress
kubectl get ingress -n efh-prod

# Check HPA
kubectl get hpa -n efh-prod

# View logs
kubectl logs -f deployment/efh-web -n efh-prod
```

## Architecture

### Components

- **Namespace**: `efh-prod` - Isolated environment for production
- **Deployment**: `efh-web` - 3 replicas with rolling updates
- **Service**: `efh-web` - ClusterIP service on port 80
- **Ingress**: `efh-web` - NGINX ingress with TLS
- **HPA**: Auto-scaling from 3 to 15 pods based on CPU (65% threshold)

### Resource Limits

Per pod:
- **Requests**: 200m CPU, 512Mi memory
- **Limits**: 1 CPU, 1Gi memory

### Health Checks

- **Readiness Probe**: `/api/health` - 10s initial delay, 10s period
- **Liveness Probe**: `/api/health` - 30s initial delay, 20s period

## Scaling

### Manual Scaling

```bash
# Scale to 5 replicas
kubectl scale deployment efh-web --replicas=5 -n efh-prod
```

### Auto-Scaling

HPA automatically scales based on CPU utilization:
- **Min replicas**: 3
- **Max replicas**: 15
- **Target CPU**: 65%

## Rolling Updates

```bash
# Update image
kubectl set image deployment/efh-web \
  efh-web=ghcr.io/elevateforhumanity/efh-web:v2.0.0 \
  -n efh-prod

# Check rollout status
kubectl rollout status deployment/efh-web -n efh-prod

# Rollback if needed
kubectl rollout undo deployment/efh-web -n efh-prod
```

## Blue-Green Deployment

For zero-downtime deployments:

1. Create a new deployment with a different label (e.g., `version: green`)
2. Wait for new pods to be ready
3. Update service selector to point to new version
4. Delete old deployment

```bash
# Example
kubectl apply -f deployment-app-green.yaml
kubectl patch service efh-web -n efh-prod -p '{"spec":{"selector":{"version":"green"}}}'
kubectl delete deployment efh-web-blue -n efh-prod
```

## Monitoring

### View Metrics

```bash
# CPU and memory usage
kubectl top pods -n efh-prod

# HPA status
kubectl describe hpa efh-web -n efh-prod
```

### Logs

```bash
# All pods
kubectl logs -l app=efh-web -n efh-prod --tail=100

# Specific pod
kubectl logs efh-web-xxxxx-yyyyy -n efh-prod -f

# Previous container (if crashed)
kubectl logs efh-web-xxxxx-yyyyy -n efh-prod --previous
```

## Troubleshooting

### Pods Not Starting

```bash
# Describe pod
kubectl describe pod efh-web-xxxxx-yyyyy -n efh-prod

# Check events
kubectl get events -n efh-prod --sort-by='.lastTimestamp'
```

### Image Pull Errors

```bash
# Create image pull secret
kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=YOUR_GITHUB_USERNAME \
  --docker-password=YOUR_GITHUB_TOKEN \
  -n efh-prod

# Add to deployment
# spec.template.spec.imagePullSecrets:
#   - name: ghcr-secret
```

### Health Check Failures

Ensure `/api/health` endpoint exists and returns 200:

```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({ status: 'ok' });
}
```

## Security

### Network Policies

Add network policies to restrict traffic:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: efh-web-policy
  namespace: efh-prod
spec:
  podSelector:
    matchLabels:
      app: efh-web
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              name: ingress-nginx
  egress:
    - to:
        - namespaceSelector: {}
      ports:
        - protocol: TCP
          port: 443
        - protocol: TCP
          port: 5432
```

### Pod Security

Add security context to deployment:

```yaml
securityContext:
  runAsNonRoot: true
  runAsUser: 1000
  fsGroup: 1000
  capabilities:
    drop:
      - ALL
```

## Backup and Disaster Recovery

### Database Backups

Ensure regular database backups:

```bash
# Example with pg_dump
kubectl run pg-backup --rm -i --restart=Never \
  --image=postgres:15 \
  --env="PGPASSWORD=$DB_PASSWORD" \
  -- pg_dump -h $DB_HOST -U $DB_USER $DB_NAME > backup.sql
```

### Persistent Volumes

If using persistent volumes, ensure they're backed up:

```bash
# List PVCs
kubectl get pvc -n efh-prod

# Create snapshot (cloud provider specific)
# GKE example:
gcloud compute disks snapshot DISK_NAME --snapshot-names=SNAPSHOT_NAME
```

## Cost Optimization

### Resource Tuning

Monitor actual usage and adjust requests/limits:

```bash
# View resource usage over time
kubectl top pods -n efh-prod --containers
```

### Cluster Autoscaler

Enable cluster autoscaler to scale nodes based on pod demands:

```bash
# GKE example
gcloud container clusters update CLUSTER_NAME \
  --enable-autoscaling \
  --min-nodes=3 \
  --max-nodes=10
```

## CI/CD Integration

### GitHub Actions Example

```yaml
- name: Deploy to Kubernetes
  run: |
    kubectl set image deployment/efh-web \
      efh-web=ghcr.io/elevateforhumanity/efh-web:${{ github.sha }} \
      -n efh-prod
    kubectl rollout status deployment/efh-web -n efh-prod
```

## Support

For issues or questions:
- Check pod logs: `kubectl logs -l app=efh-web -n efh-prod`
- Review events: `kubectl get events -n efh-prod`
- Contact DevOps team: devops@elevateforhumanity.org
