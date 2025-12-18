/**
 * Load Testing Suite
 * Tests system performance under concurrent load
 * 
 * Run with: npx ts-node tests/load/load-test.ts
 */

interface LoadTestConfig {
  baseUrl: string;
  concurrentUsers: number;
  requestsPerUser: number;
  rampUpTime: number; // seconds
}

interface TestResult {
  endpoint: string;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  minResponseTime: number;
  maxResponseTime: number;
  requestsPerSecond: number;
}

class LoadTester {
  private config: LoadTestConfig;
  private results: Map<string, number[]> = new Map();

  constructor(config: LoadTestConfig) {
    this.config = config;
  }

  async testEndpoint(endpoint: string, method: 'GET' | 'POST' = 'GET', body?: any): Promise<void> {
    const startTime = Date.now();
    
    try {
      const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
        method,
        headers: body ? { 'Content-Type': 'application/json' } : {},
        body: body ? JSON.stringify(body) : undefined,
      });

      const duration = Date.now() - startTime;
      
      if (!this.results.has(endpoint)) {
        this.results.set(endpoint, []);
      }
      
      this.results.get(endpoint)!.push(response.ok ? duration : -1);
    } catch (error) {
      if (!this.results.has(endpoint)) {
        this.results.set(endpoint, []);
      }
      this.results.get(endpoint)!.push(-1);
    }
  }

  async runTest(endpoint: string, method: 'GET' | 'POST' = 'GET', body?: any): Promise<TestResult> {
    console.log(`\n🔄 Testing ${method} ${endpoint}`);
    console.log(`   Users: ${this.config.concurrentUsers}`);
    console.log(`   Requests per user: ${this.config.requestsPerUser}`);
    
    this.results.set(endpoint, []);
    
    const totalRequests = this.config.concurrentUsers * this.config.requestsPerUser;
    const delayBetweenUsers = (this.config.rampUpTime * 1000) / this.config.concurrentUsers;
    
    const startTime = Date.now();
    
    // Simulate concurrent users with ramp-up
    const userPromises: Promise<void>[] = [];
    
    for (let user = 0; user < this.config.concurrentUsers; user++) {
      const userDelay = user * delayBetweenUsers;
      
      const userPromise = new Promise<void>((resolve) => {
        setTimeout(async () => {
          const requestPromises: Promise<void>[] = [];
          
          for (let req = 0; req < this.config.requestsPerUser; req++) {
            requestPromises.push(this.testEndpoint(endpoint, method, body));
          }
          
          await Promise.all(requestPromises);
          resolve();
        }, userDelay);
      });
      
      userPromises.push(userPromise);
    }
    
    await Promise.all(userPromises);
    
    const totalTime = (Date.now() - startTime) / 1000;
    const times = this.results.get(endpoint)!;
    const successfulTimes = times.filter(t => t > 0);
    const failedCount = times.filter(t => t < 0).length;
    
    const result: TestResult = {
      endpoint,
      totalRequests,
      successfulRequests: successfulTimes.length,
      failedRequests: failedCount,
      averageResponseTime: successfulTimes.length > 0 
        ? successfulTimes.reduce((a, b) => a + b, 0) / successfulTimes.length 
        : 0,
      minResponseTime: successfulTimes.length > 0 ? Math.min(...successfulTimes) : 0,
      maxResponseTime: successfulTimes.length > 0 ? Math.max(...successfulTimes) : 0,
      requestsPerSecond: totalRequests / totalTime,
    };
    
    this.printResult(result);
    return result;
  }

  private printResult(result: TestResult): void {
    const successRate = ((result.successfulRequests / result.totalRequests) * 100).toFixed(2);
    
    console.log(`\n✅ Results for ${result.endpoint}:`);
    console.log(`   Total Requests: ${result.totalRequests}`);
    console.log(`   Successful: ${result.successfulRequests} (${successRate}%)`);
    console.log(`   Failed: ${result.failedRequests}`);
    console.log(`   Avg Response Time: ${result.averageResponseTime.toFixed(2)}ms`);
    console.log(`   Min Response Time: ${result.minResponseTime}ms`);
    console.log(`   Max Response Time: ${result.maxResponseTime}ms`);
    console.log(`   Requests/Second: ${result.requestsPerSecond.toFixed(2)}`);
    
    // Performance rating
    if (result.averageResponseTime < 200) {
      console.log(`   Rating: 🔥 EXCELLENT`);
    } else if (result.averageResponseTime < 500) {
      console.log(`   Rating: ✅ GOOD`);
    } else if (result.averageResponseTime < 1000) {
      console.log(`   Rating: ⚠️  ACCEPTABLE`);
    } else {
      console.log(`   Rating: ❌ NEEDS OPTIMIZATION`);
    }
  }
}

// Run load tests
async function runLoadTests() {
  console.log('🚀 Starting Load Tests\n');
  console.log('=' .repeat(60));
  
  const config: LoadTestConfig = {
    baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elevateforhumanity.org',
    concurrentUsers: 50,
    requestsPerUser: 2,
    rampUpTime: 10, // 10 seconds to ramp up all users
  };
  
  const tester = new LoadTester(config);
  
  const results: TestResult[] = [];
  
  // Test critical endpoints
  results.push(await tester.runTest('/'));
  results.push(await tester.runTest('/apply'));
  results.push(await tester.runTest('/programs'));
  results.push(await tester.runTest('/api/health'));
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 LOAD TEST SUMMARY\n');
  
  const totalRequests = results.reduce((sum, r) => sum + r.totalRequests, 0);
  const totalSuccessful = results.reduce((sum, r) => sum + r.successfulRequests, 0);
  const avgResponseTime = results.reduce((sum, r) => sum + r.averageResponseTime, 0) / results.length;
  
  console.log(`Total Requests: ${totalRequests}`);
  console.log(`Success Rate: ${((totalSuccessful / totalRequests) * 100).toFixed(2)}%`);
  console.log(`Average Response Time: ${avgResponseTime.toFixed(2)}ms`);
  
  if (avgResponseTime < 300 && (totalSuccessful / totalRequests) > 0.99) {
    console.log('\n🎉 SYSTEM PERFORMANCE: EXCEPTIONAL');
  } else if (avgResponseTime < 500 && (totalSuccessful / totalRequests) > 0.95) {
    console.log('\n✅ SYSTEM PERFORMANCE: GOOD');
  } else {
    console.log('\n⚠️  SYSTEM PERFORMANCE: NEEDS ATTENTION');
  }
  
  console.log('\n' + '='.repeat(60));
}

// Health check endpoint test
async function testHealthEndpoint() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elevateforhumanity.org';
  
  try {
    const response = await fetch(`${baseUrl}/api/health`);
    if (response.ok) {
      console.log('✅ Health endpoint responding');
    } else {
      console.log('⚠️  Health endpoint returned non-200 status');
    }
  } catch (error) {
    console.log('❌ Health endpoint not accessible - creating one...');
  }
}

// Run tests
if (require.main === module) {
  testHealthEndpoint().then(() => {
    runLoadTests().catch(console.error);
  });
}

export { LoadTester, LoadTestConfig, TestResult };
