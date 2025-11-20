# Monitoring Stack Deployment

## Overview
Complete observability stack with Prometheus (metrics), Grafana (dashboards), and Jaeger (distributed tracing).

## Components

- **Prometheus**: Metrics collection and storage
- **Grafana**: Visualization and dashboards
- **Jaeger**: Distributed tracing

## Quick Deploy

```bash
# Create monitoring namespace
kubectl apply -f namespace.yaml

# Deploy Prometheus
kubectl apply -f prometheus-config.yaml
kubectl apply -f prometheus-deployment.yaml

# Create Grafana admin password secret
kubectl create secret generic grafana-secrets \
  --from-literal=admin-password='your-secure-password' \
  -n monitoring

# Deploy Grafana
kubectl apply -f grafana-deployment.yaml

# Deploy Jaeger
kubectl apply -f jaeger-deployment.yaml

# Create basic auth for ingress (optional)
htpasswd -c auth admin
kubectl create secret generic monitoring-basic-auth \
  --from-file=auth \
  -n monitoring

# Deploy ingress
kubectl apply -f ingress.yaml
```

## Access URLs

After deployment:
- **Grafana**: https://monitoring.elevateforhumanity.org/grafana
- **Prometheus**: https://monitoring.elevateforhumanity.org/prometheus
- **Jaeger**: https://monitoring.elevateforhumanity.org/jaeger

Default Grafana credentials:
- Username: `admin`
- Password: (set in secret above)

## Configure Application

Update your application deployment to send traces to Jaeger:

```yaml
env:
  - name: OTEL_EXPORTER_OTLP_ENDPOINT
    value: "http://jaeger-collector.monitoring.svc.cluster.local:4318/v1/traces"
```

## Grafana Dashboards

### Import Pre-built Dashboards

1. Login to Grafana
2. Go to Dashboards → Import
3. Import these dashboard IDs:
   - **1860**: Node Exporter Full
   - **3662**: Prometheus 2.0 Overview
   - **315**: Kubernetes cluster monitoring

### Custom EFH Dashboard

Create a new dashboard with these panels:

**HTTP Requests**:
```promql
rate(efh_http_requests_total[5m])
```

**Response Time** (if you add histogram metrics):
```promql
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))
```

**Active Users**:
```promql
count(up{job="efh-web"})
```

## Prometheus Queries

### Useful Queries

**CPU Usage**:
```promql
rate(container_cpu_usage_seconds_total{namespace="efh-prod"}[5m])
```

**Memory Usage**:
```promql
container_memory_usage_bytes{namespace="efh-prod"}
```

**Pod Count**:
```promql
count(kube_pod_info{namespace="efh-prod"})
```

**Request Rate**:
```promql
rate(efh_http_requests_total[5m])
```

## Alerting

### Create Alert Rules

Add to `prometheus-config.yaml`:

```yaml
rule_files:
  - /etc/prometheus/alerts.yml

alerting:
  alertmanagers:
    - static_configs:
        - targets:
            - alertmanager:9093
```

### Example Alerts

```yaml
groups:
  - name: efh-alerts
    interval: 30s
    rules:
      - alert: HighErrorRate
        expr: rate(efh_http_errors_total[5m]) > 0.05
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High error rate detected"
          description: "Error rate is {{ $value }} errors/sec"
      
      - alert: PodDown
        expr: up{job="efh-web"} == 0
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "EFH pod is down"
          description: "Pod {{ $labels.pod }} is not responding"
```

## Jaeger Tracing

### View Traces

1. Open Jaeger UI
2. Select service: `efh-next-app`
3. Click "Find Traces"
4. Explore trace details

### Trace Analysis

Look for:
- Slow database queries
- External API calls
- Error traces
- Service dependencies

## Maintenance

### Prometheus Data Retention

Default: 15 days. To change:

```yaml
args:
  - '--storage.tsdb.retention.time=30d'
```

### Backup Grafana Dashboards

```bash
# Export dashboard JSON
kubectl exec -n monitoring deployment/grafana -- \
  grafana-cli admin export-dashboard <dashboard-id>
```

### Scale Components

```bash
# Scale Prometheus
kubectl scale deployment prometheus --replicas=2 -n monitoring

# Scale Grafana
kubectl scale deployment grafana --replicas=2 -n monitoring
```

## Troubleshooting

### Prometheus Not Scraping

```bash
# Check targets
kubectl port-forward -n monitoring svc/prometheus 9090:9090
# Open http://localhost:9090/targets

# Check service discovery
kubectl logs -n monitoring deployment/prometheus
```

### Grafana Can't Connect to Prometheus

```bash
# Test connectivity
kubectl exec -n monitoring deployment/grafana -- \
  curl http://prometheus:9090/api/v1/status/config
```

### Jaeger Not Receiving Traces

```bash
# Check collector logs
kubectl logs -n monitoring deployment/jaeger

# Verify OTLP endpoint
kubectl get svc -n monitoring jaeger-collector
```

## Performance Tuning

### Prometheus

```yaml
resources:
  requests:
    cpu: 500m
    memory: 2Gi
  limits:
    cpu: 2
    memory: 4Gi
```

### Grafana

```yaml
resources:
  requests:
    cpu: 200m
    memory: 512Mi
  limits:
    cpu: 1
    memory: 1Gi
```

### Jaeger

For production, use Elasticsearch backend:

```yaml
env:
  - name: SPAN_STORAGE_TYPE
    value: elasticsearch
  - name: ES_SERVER_URLS
    value: http://elasticsearch:9200
```

## Security

### Enable TLS

```bash
# Create TLS secret
kubectl create secret tls monitoring-tls \
  --cert=monitoring.crt \
  --key=monitoring.key \
  -n monitoring
```

### Network Policies

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: monitoring-policy
  namespace: monitoring
spec:
  podSelector: {}
  policyTypes:
    - Ingress
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              name: efh-prod
        - namespaceSelector:
            matchLabels:
              name: ingress-nginx
```

## Cost Optimization

### Use Persistent Volumes

For production, use PVCs instead of emptyDir:

```yaml
volumes:
  - name: storage
    persistentVolumeClaim:
      claimName: prometheus-storage
```

### Reduce Retention

```yaml
args:
  - '--storage.tsdb.retention.time=7d'
  - '--storage.tsdb.retention.size=10GB'
```

## Support

For issues:
- Check pod logs: `kubectl logs -n monitoring <pod-name>`
- Review events: `kubectl get events -n monitoring`
- Prometheus docs: https://prometheus.io/docs/
- Grafana docs: https://grafana.com/docs/
- Jaeger docs: https://www.jaegertracing.io/docs/
