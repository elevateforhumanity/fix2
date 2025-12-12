/* eslint-disable @typescript-eslint/no-require-imports */
// Legacy test file using CommonJS
const request = require('supertest');
const app = require('./simple-server.cjs');


async function runTest() {
  try {
    const res = await request(app).get('/health');

    if (res.status === 200 && res.body && res.body.status === 'ok') {
      process.exit(0);
    } else {
      process.exit(1);
    }
  } catch (error) {
    console.error('Error during test:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

runTest();
