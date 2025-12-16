/* eslint-disable no-undef, @typescript-eslint/no-unused-expressions */
// k6 load testing script - uses k6 globals and expression patterns
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');

// Test configuration
export const options = {
  stages: [
    { duration: '30s', target: 10 }, // Ramp up to 10 users
    { duration: '1m', target: 10 }, // Stay at 10 users
    { duration: '30s', target: 50 }, // Ramp up to 50 users
    { duration: '2m', target: 50 }, // Stay at 50 users
    { duration: '30s', target: 0 }, // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
    http_req_failed: ['rate<0.1'], // Error rate should be below 10%
    errors: ['rate<0.1'], // Custom error rate below 10%
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
  // Test homepage
  let res = http.get(`${BASE_URL}/`);
  check(res, {
    'homepage status is 200': (r) => r.status === 200,
    'homepage loads in <500ms': (r) => r.timings.duration < 500,
  }) || errorRate.add(1);

  sleep(1);

  // Test programs page
  res = http.get(`${BASE_URL}/programs`);
  check(res, {
    'programs status is 200': (r) => r.status === 200,
    'programs loads in <500ms': (r) => r.timings.duration < 500,
  }) || errorRate.add(1);

  sleep(1);

  // Test about page
  res = http.get(`${BASE_URL}/about`);
  check(res, {
    'about status is 200': (r) => r.status === 200,
    'about loads in <500ms': (r) => r.timings.duration < 500,
  }) || errorRate.add(1);

  sleep(1);
}

export function handleSummary(data) {
  return {
    'load-test-results.json': JSON.stringify(data, null, 2),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}

function textSummary(data, options = {}) {
  const indent = options.indent || '';
  const enableColors = options.enableColors || false;

  let summary = '\n';
  summary += `${indent}Test Summary:\n`;
  summary += `${indent}  Checks............: ${data.metrics.checks.values.passes} passed, ${data.metrics.checks.values.fails} failed\n`;
  summary += `${indent}  HTTP Requests.....: ${data.metrics.http_reqs.values.count} total\n`;
  summary += `${indent}  HTTP Failures.....: ${(data.metrics.http_req_failed.values.rate * 100).toFixed(2)}%\n`;
  summary += `${indent}  Avg Duration......: ${data.metrics.http_req_duration.values.avg.toFixed(2)}ms\n`;
  summary += `${indent}  95th Percentile...: ${data.metrics.http_req_duration.values['p(95)'].toFixed(2)}ms\n`;

  return summary;
}
