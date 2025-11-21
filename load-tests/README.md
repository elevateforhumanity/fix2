# Load Testing with k6

This directory contains k6 load testing scripts for the Elevate for Humanity LMS platform.

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

## Running Tests

### Basic LMS Test
Tests homepage, dashboard, programs page, and health endpoint:

```bash
k6 run load-tests/basic-lms-test.js
```

### Custom Base URL
```bash
k6 run --env BASE_URL=https://staging.elevateforhumanity.org load-tests/basic-lms-test.js
```

### CI/CD Integration
```bash
k6 run --out json=results.json load-tests/basic-lms-test.js
```

## Test Stages

The basic test runs through 3 stages:
1. **Ramp-up (1 min)**: 0 → 20 virtual users
2. **Peak load (3 min)**: 20 → 100 virtual users
3. **Ramp-down (1 min)**: 100 → 0 virtual users

## Thresholds

- 95% of requests must complete in < 500ms
- Less than 1% of requests can fail

## Adding New Tests

Create new test files in this directory following the k6 script format. See [k6 documentation](https://k6.io/docs/) for more details.
