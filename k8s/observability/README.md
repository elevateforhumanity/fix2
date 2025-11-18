# Observability Stack Deployment

## Overview

Alternative observability stack using Helm charts for easier deployment and management.

## Components

- **Prometheus**: Metrics collection via kube-prometheus-stack
- **Grafana**: Visualization dashboards
- **Alertmanager**: Alert routing and management
- **Jaeger**: Distributed tracing

## Quick Deploy

### 1. Create Namespace

```bash
kubectl apply -f namespace.yaml
```

### 2. Deploy Prometheus + Grafana (Helm)

```bash
# Add Helm repo
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

# Install kube-prometheus-stack
helm upgrade --install efh-monitoring prometheus-community/kube-prometheus-stack \
  --namespace observability \
  -f prometheus-grafana-values.yaml \
  --wait
```

### 3. Deploy Jaeger

```bash
kubectl apply -f jaeger.yaml
kubectl apply -f jaeger-ingress.yaml
```

### 4. Create TLS Secrets

```bash
# For Grafana
kubectl create secret tls efh-grafana-tls \
  --cert=grafana.crt \
  --key=grafana.key \
  -n observability

# For Prometheus
kubectl create secret tls efh-prometheus-tls \
  --cert=prometheus.crt \
  --key=prometheus.key \
  -n observability

# For Alertmanager
kubectl create secret tls efh-alertmanager-tls \
  --cert=alertmanager.crt \
  --key=alertmanager.key \
  -n observability

# For Jaeger
kubectl create secret tls efh-jaeger-tls \
  --cert=jaeger.crt \
  --key=jaeger.key \
  -n observability
```

## Access URLs

After deployment:

- **Grafana**: https://grafana.elevateconnectsdirectory.org
- **Prometheus**: https://prometheus.elevateconnectsdirectory.org
- **Alertmanager**: https://alertmanager.elevateconnectsdirectory.org
- **Jaeger**: https://jaeger.elevateconnectsdirectory.org

Default Grafana credentials:

- Username: `admin`
- Password: `change-me-in-production` (update in values file)

## Configure Application

Update your EFH deployment to send traces to Jaeger:

```yaml
env:
  - name: OTEL_EXPORTER_OTLP_ENDPOINT
    value: 'http://jaeger.observability.svc.cluster.local:4318/v1/traces'
```

## Grafana Dashboards

### Import Pre-built Dashboards

1. Login to Grafana
2. Go to Dashboards → Import
3. Import these dashboard IDs:
   - **1860**: Node Exporter Full
   - **3662**: Prometheus 2.0 Overview
   - **315**: Kubernetes cluster monitoring
   - **13770**: Kubernetes API Server

## Prometheus Queries

### Useful Queries

**EFH HTTP Requests**:

```promql
rate(efh_http_requests_total[5m])
```

**Pod CPU Usage**:

```promql
rate(container_cpu_usage_seconds_total{namespace="efh-prod"}[5m])
```

**Pod Memory Usage**:

```promql
container_memory_usage_bytes{namespace="efh-prod"}
```

**Pod Count**:

```promql
count(kube_pod_info{namespace="efh-prod"})
```

## Alerting

### Configure Slack Alerts

Edit `prometheus-grafana-values.yaml`:

```yaml
alertmanager:
  config:
    global:
      slack_api_url: 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK'
    route:
      receiver: 'slack-notifications'
      group_by: ['alertname', 'cluster', 'service']
    receivers:
      - name: 'slack-notifications'
        slack_configs:
          - channel: '#alerts'
            title: 'Alert: {{ .GroupLabels.alertname }}'
            text: '{{ range .Alerts }}{{ .Annotations.description }}{{ end }}'
```

Then upgrade the Helm release:

```bash
helm upgrade efh-monitoring prometheus-community/kube-prometheus-stack \
  --namespace observability \
  -f prometheus-grafana-values.yaml
```

## Maintenance

### Upgrade Stack

```bash
helm upgrade efh-monitoring prometheus-community/kube-prometheus-stack \
  --namespace observability \
  -f prometheus-grafana-values.yaml
```

### Backup Grafana Dashboards

```bash
# Get Grafana pod name
GRAFANA_POD=$(kubectl get pods -n observability -l app.kubernetes.io/name=grafana -o jsonpath='{.items[0].metadata.name}')

# Export dashboard
kubectl exec -n observability $GRAFANA_POD -- \
  grafana-cli admin export-dashboard <dashboard-id> > dashboard-backup.json
```

### Scale Components

```bash
# Scale Prometheus
kubectl scale statefulset prometheus-efh-monitoring-kube-prom-prometheus \
  --replicas=2 -n observability

# Scale Grafana
kubectl scale deployment efh-monitoring-grafana \
  --replicas=2 -n observability
```

## Troubleshooting

### Prometheus Not Scraping

```bash
# Check Prometheus targets
kubectl port-forward -n observability svc/efh-monitoring-kube-prom-prometheus 9090:9090
# Open http://localhost:9090/targets
```

### Grafana Can't Connect

```bash
# Test connectivity
kubectl exec -n observability deployment/efh-monitoring-grafana -- \
  curl http://efh-monitoring-kube-prom-prometheus:9090/api/v1/status/config
```

### Jaeger Not Receiving Traces

```bash
# Check Jaeger logs
kubectl logs -n observability deployment/jaeger -f

# Verify service
kubectl get svc -n observability jaeger
```

## Uninstall

```bash
# Remove Helm release
helm uninstall efh-monitoring -n observability

# Remove Jaeger
kubectl delete -f jaeger.yaml
kubectl delete -f jaeger-ingress.yaml

# Remove namespace
kubectl delete namespace observability
```

## Support

For issues:

- Helm chart docs: https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack
- Jaeger docs: https://www.jaegertracing.io/docs/
- Prometheus docs: https://prometheus.io/docs/
- Grafana docs: https://grafana.com/docs/
