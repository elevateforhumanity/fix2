# Load Testing Suite

This directory contains load testing scripts using k6 for performance testing.

## Prerequisites

Install k6:

```bash
# macOS
brew install k6

# Linux
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6

# Windows
choco install k6
```

## Test Scripts

### 1. Basic Load Test (`basic-load.js`)

Tests normal user load with gradual ramp-up.

**Run:**

```bash
k6 run tests/load/basic-load.js
```

**Configuration:**

- Ramps up to 50 concurrent users
- Tests homepage, programs, and about pages
- Thresholds: 95% requests < 500ms, <10% error rate

### 2. API Load Test (`api-load.js`)

Tests API endpoints under load.

**Run:**

```bash
k6 run tests/load/api-load.js
```

**Configuration:**

- Ramps up to 100 concurrent users
- Tests authentication, course listing, and profile endpoints
- Thresholds: 99% requests < 1s, <5% error rate

### 3. Stress Test (`stress-test.js`)

Pushes system to limits to find breaking point.

**Run:**

```bash
k6 run tests/load/stress-test.js
```

**Configuration:**

- Ramps up to 300 concurrent users
- Tests all major pages
- Thresholds: 99% requests < 2s, <20% error rate

### 4. Spike Test (`spike-test.js`)

Tests sudden traffic surge handling.

**Run:**

```bash
k6 run tests/load/spike-test.js
```

**Configuration:**

- Sudden spike from 10 to 500 users
- Tests homepage resilience
- Thresholds: 95% requests < 3s, <30% error rate

## Custom Configuration

Set custom base URL:

```bash
k6 run -e BASE_URL=https://www.elevateforhumanity.org tests/load/basic-load.js
```

Set custom API URL:

```bash
k6 run -e API_URL=https://api.elevateforhumanity.org tests/load/api-load.js
```

## Results

Test results are saved to:

- `load-test-results.json` - Basic load test
- `api-load-test-results.json` - API load test
- `api-load-test-results.html` - API load test HTML report
- `stress-test-results.json` - Stress test
- `spike-test-results.json` - Spike test

## Interpreting Results

### Key Metrics

- **http_req_duration**: Response time for requests
  - `avg`: Average response time
  - `p(95)`: 95th percentile (95% of requests faster than this)
  - `p(99)`: 99th percentile (99% of requests faster than this)
  - `max`: Maximum response time

- **http_req_failed**: Percentage of failed requests
  - Should be < 5% for production readiness

- **http_reqs**: Total number of requests made

- **vus**: Virtual users (concurrent users)

### Success Criteria

✅ **Production Ready:**

- p(95) < 500ms for page loads
- p(99) < 1s for API calls
- Error rate < 5%
- Handles 100+ concurrent users

⚠️ **Needs Optimization:**

- p(95) > 1s
- Error rate 5-10%
- Struggles with 50+ concurrent users

❌ **Not Ready:**

- p(95) > 2s
- Error rate > 10%
- Fails with < 50 concurrent users

## CI/CD Integration

Add to GitHub Actions:

```yaml
- name: Run Load Tests
  run: |
    k6 run tests/load/basic-load.js
    k6 run tests/load/api-load.js
```

## Monitoring

During load tests, monitor:

- CPU usage
- Memory usage
- Network bandwidth
- Database connections
- API response times
- Error logs

## Best Practices

1. **Start Small**: Begin with basic load test
2. **Gradual Increase**: Slowly increase load to find limits
3. **Monitor Resources**: Watch server metrics during tests
4. **Test Realistic Scenarios**: Simulate actual user behavior
5. **Regular Testing**: Run load tests before major releases
6. **Document Results**: Track performance over time

## Troubleshooting

**High Error Rates:**

- Check server logs
- Verify API endpoints are accessible
- Ensure database can handle connections

**Slow Response Times:**

- Check database query performance
- Review API endpoint efficiency
- Consider caching strategies
- Optimize frontend bundle size

**Connection Timeouts:**

- Increase timeout thresholds
- Check network configuration
- Verify server capacity
