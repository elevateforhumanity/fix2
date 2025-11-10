import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

// Spike test - sudden traffic surge
export const options = {
  stages: [
    { duration: '1m', target: 10 },    // Normal load
    { duration: '10s', target: 500 },  // Sudden spike!
    { duration: '3m', target: 500 },   // Sustain spike
    { duration: '10s', target: 10 },   // Drop back
    { duration: '1m', target: 10 },    // Normal load
  ],
  thresholds: {
    http_req_duration: ['p(95)<3000'], // Relaxed for spike
    http_req_failed: ['rate<0.3'],     // Allow 30% errors during spike
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5173';

export default function () {
  const res = http.get(`${BASE_URL}/`);
  
  check(res, {
    'status is 200': (r) => r.status === 200,
  }) || errorRate.add(1);

  sleep(0.5);
}

export function handleSummary(data) {
  return {
    'spike-test-results.json': JSON.stringify(data, null, 2),
  };
}
