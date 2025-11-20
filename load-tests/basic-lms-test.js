import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 20 },
    { duration: '3m', target: 100 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
    http_req_failed: ['rate<0.01'], // Less than 1% of requests should fail
  },
};

const BASE_URL = __ENV.BASE_URL || 'https://elevateforhumanity.org';

export default function () {
  // Test homepage
  const res = http.get(`${BASE_URL}/`);
  check(res, {
    'status is 200': (r) => r.status === 200,
    'ttfb < 500ms': (r) => r.timings.waiting < 500,
  });

  sleep(1);

  // Test LMS dashboard
  const dashboard = http.get(`${BASE_URL}/lms/dashboard`);
  check(dashboard, {
    'dashboard status 200 or 302': (r) => r.status === 200 || r.status === 302,
  });

  sleep(1);

  // Test programs page
  const programs = http.get(`${BASE_URL}/programs`);
  check(programs, {
    'programs page loads': (r) => r.status === 200,
  });

  sleep(2);

  // Test API health endpoint
  const health = http.get(`${BASE_URL}/api/health`);
  check(health, {
    'health check passes': (r) => r.status === 200,
  });

  sleep(1);
}
