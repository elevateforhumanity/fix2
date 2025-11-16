/* eslint-disable no-undef, @typescript-eslint/no-unused-expressions */
// k6 load testing script - uses k6 globals and expression patterns
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');
const apiResponseTime = new Trend('api_response_time');

// Test configuration
export const options = {
  stages: [
    { duration: '1m', target: 20 }, // Ramp up to 20 users
    { duration: '3m', target: 20 }, // Stay at 20 users
    { duration: '1m', target: 100 }, // Spike to 100 users
    { duration: '2m', target: 100 }, // Stay at 100 users
    { duration: '1m', target: 0 }, // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(99)<1000'], // 99% of requests under 1s
    http_req_failed: ['rate<0.05'], // Less than 5% errors
    errors: ['rate<0.05'],
    api_response_time: ['p(95)<800'], // 95% of API calls under 800ms
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5173';
const API_URL = __ENV.API_URL || 'http://localhost:3000';

export default function () {
  // Simulate user authentication
  const loginPayload = JSON.stringify({
    email: `test-${__VU}@example.com`,
    password: 'TestPassword123!',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Test login endpoint
  let res = http.post(`${API_URL}/api/auth/login`, loginPayload, params);
  const loginSuccess = check(res, {
    'login status is 200 or 401': (r) => r.status === 200 || r.status === 401,
    'login response time <1s': (r) => r.timings.duration < 1000,
  });

  if (!loginSuccess) errorRate.add(1);
  apiResponseTime.add(res.timings.duration);

  sleep(1);

  // Test course listing
  res = http.get(`${API_URL}/api/courses`);
  const coursesSuccess = check(res, {
    'courses status is 200': (r) => r.status === 200,
    'courses response time <500ms': (r) => r.timings.duration < 500,
    'courses returns array': (r) => {
      try {
        const body = JSON.parse(r.body);
        return Array.isArray(body) || Array.isArray(body.data);
      } catch {
        return false;
      }
    },
  });

  if (!coursesSuccess) errorRate.add(1);
  apiResponseTime.add(res.timings.duration);

  sleep(2);

  // Test course details
  res = http.get(`${API_URL}/api/courses/1`);
  check(res, {
    'course details status is 200 or 404': (r) =>
      r.status === 200 || r.status === 404,
    'course details response time <500ms': (r) => r.timings.duration < 500,
  }) || errorRate.add(1);

  apiResponseTime.add(res.timings.duration);

  sleep(1);

  // Test user profile
  res = http.get(`${API_URL}/api/user/profile`, {
    headers: {
      Authorization: 'Bearer mock-token',
    },
  });
  check(res, {
    'profile status is 200 or 401': (r) => r.status === 200 || r.status === 401,
    'profile response time <500ms': (r) => r.timings.duration < 500,
  }) || errorRate.add(1);

  apiResponseTime.add(res.timings.duration);

  sleep(2);
}

export function handleSummary(data) {
  return {
    'api-load-test-results.json': JSON.stringify(data, null, 2),
    'api-load-test-results.html': htmlReport(data),
  };
}

function htmlReport(data) {
  return `
<!DOCTYPE html>
<html>
<head>
  <title>API Load Test Results</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
    .metric { margin: 10px 0; padding: 10px; background: #f5f5f5; border-radius: 4px; }
    .pass { color: green; }
    .fail { color: red; }
  </style>
</head>
<body>
  <h1>API Load Test Results</h1>
  <div class="metric">
    <strong>Total Requests:</strong> ${data.metrics.http_reqs.values.count}
  </div>
  <div class="metric">
    <strong>Failed Requests:</strong> ${(data.metrics.http_req_failed.values.rate * 100).toFixed(2)}%
  </div>
  <div class="metric">
    <strong>Average Response Time:</strong> ${data.metrics.http_req_duration.values.avg.toFixed(2)}ms
  </div>
  <div class="metric">
    <strong>95th Percentile:</strong> ${data.metrics.http_req_duration.values['p(95)'].toFixed(2)}ms
  </div>
  <div class="metric">
    <strong>99th Percentile:</strong> ${data.metrics.http_req_duration.values['p(99)'].toFixed(2)}ms
  </div>
</body>
</html>
  `;
}
