/* eslint-disable no-undef, @typescript-eslint/no-unused-expressions */
// k6 load testing script - uses k6 globals and expression patterns
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');

// Stress test configuration - push system to limits
export const options = {
  stages: [
    { duration: '2m', target: 100 }, // Ramp up to 100 users
    { duration: '5m', target: 100 }, // Stay at 100 users
    { duration: '2m', target: 200 }, // Ramp up to 200 users
    { duration: '5m', target: 200 }, // Stay at 200 users
    { duration: '2m', target: 300 }, // Ramp up to 300 users
    { duration: '5m', target: 300 }, // Stay at 300 users
    { duration: '5m', target: 0 }, // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(99)<2000'], // 99% under 2s (relaxed for stress)
    http_req_failed: ['rate<0.2'], // Allow up to 20% errors under stress
    errors: ['rate<0.2'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
  const pages = ['/', '/programs', '/about', '/contact', '/login', '/pricing'];

  // Random page selection
  const page = pages[Math.floor(Math.random() * pages.length)];

  const res = http.get(`${BASE_URL}${page}`);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time <2s': (r) => r.timings.duration < 2000,
  }) || errorRate.add(1);

  // Shorter sleep for stress test
  sleep(Math.random() * 2 + 0.5); // 0.5-2.5 seconds
}

export function handleSummary(data) {
  const passed = data.metrics.http_req_failed.values.rate < 0.2;

  return {
    'stress-test-results.json': JSON.stringify(data, null, 2),
    stdout: `
╔════════════════════════════════════════════════════════════╗
║                  STRESS TEST RESULTS                       ║
╠════════════════════════════════════════════════════════════╣
║ Total Requests:     ${data.metrics.http_reqs.values.count.toString().padEnd(35)}║
║ Failed Requests:    ${(data.metrics.http_req_failed.values.rate * 100).toFixed(2)}%${' '.repeat(32)}║
║ Avg Response Time:  ${data.metrics.http_req_duration.values.avg.toFixed(2)}ms${' '.repeat(29)}║
║ Max Response Time:  ${data.metrics.http_req_duration.values.max.toFixed(2)}ms${' '.repeat(29)}║
║ 95th Percentile:    ${data.metrics.http_req_duration.values['p(95)'].toFixed(2)}ms${' '.repeat(29)}║
║ 99th Percentile:    ${data.metrics.http_req_duration.values['p(99)'].toFixed(2)}ms${' '.repeat(29)}║
║                                                            ║
║ Result: ${passed ? '✅ PASSED' : '❌ FAILED'}${' '.repeat(42)}║
╚════════════════════════════════════════════════════════════╝
    `,
  };
}
