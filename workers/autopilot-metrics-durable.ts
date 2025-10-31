// Durable Object for Autopilot Metrics Storage
// Stores all inline check results with historical data

export interface CheckResult {
  timestamp: string;
  runId: string;
  branch: string;
  commit: string;
  checks: {
    typecheck: 'passed' | 'failed';
    eslint: 'passed' | 'failed';
    build: 'passed' | 'failed';
    durableHealth: 'passed' | 'failed';
    durableTests: 'passed' | 'failed';
    envCheck: 'passed' | 'failed';
    fileCheck: 'passed' | 'failed';
    jsonCheck: 'passed' | 'failed';
  };
  overall: {
    status: 'healthy' | 'degraded' | 'critical';
    passed: number;
    failed: number;
    total: number;
    successRate: number;
  };
  autoFixAttempted: boolean;
  alertSent: boolean;
  issuCreated: boolean;
}

export interface MetricsSummary {
  totalChecks: number;
  healthyCount: number;
  degradedCount: number;
  criticalCount: number;
  averageSuccessRate: number;
  lastCheck: CheckResult | null;
  recentChecks: CheckResult[];
  uptimePercentage: number;
  mtbf: number; // Mean Time Between Failures (in hours)
  mttr: number; // Mean Time To Recovery (in hours)
}

export class AutopilotMetrics {
  private state: DurableObjectState;
  private env: any;
  private checks: CheckResult[] = [];
  private maxStoredChecks = 1000; // Store last 1000 checks

  constructor(state: DurableObjectState, env: any) {
    this.state = state;
    this.env = env;
    
    // Block concurrent requests during initialization
    this.state.blockConcurrencyWhile(async () => {
      const stored = await this.state.storage.get<CheckResult[]>('checks');
      this.checks = stored || [];
    });
  }

  async fetch(request: Request): Promise<Response> {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      switch (path) {
        case '/store':
          return await this.handleStore(request, corsHeaders);
        
        case '/summary':
          return await this.handleSummary(corsHeaders);
        
        case '/recent':
          return await this.handleRecent(url, corsHeaders);
        
        case '/history':
          return await this.handleHistory(url, corsHeaders);
        
        case '/trends':
          return await this.handleTrends(url, corsHeaders);
        
        case '/alerts':
          return await this.handleAlerts(corsHeaders);
        
        default:
          return new Response(JSON.stringify({ error: 'Not found' }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
      }
    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  }

  // Store a new check result
  private async handleStore(request: Request, corsHeaders: any): Promise<Response> {
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const checkResult: CheckResult = await request.json();
    
    // Add to checks array
    this.checks.push(checkResult);
    
    // Keep only last N checks
    if (this.checks.length > this.maxStoredChecks) {
      this.checks = this.checks.slice(-this.maxStoredChecks);
    }
    
    // Persist to storage
    await this.state.storage.put('checks', this.checks);
    
    // Update last check timestamp
    await this.state.storage.put('lastCheckTimestamp', checkResult.timestamp);
    
    return new Response(JSON.stringify({ 
      ok: true, 
      stored: true,
      totalChecks: this.checks.length 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Get summary metrics
  private async handleSummary(corsHeaders: any): Promise<Response> {
    const summary = this.calculateSummary();
    
    return new Response(JSON.stringify(summary), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Get recent checks
  private async handleRecent(url: URL, corsHeaders: any): Promise<Response> {
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const recentChecks = this.checks.slice(-limit).reverse();
    
    return new Response(JSON.stringify({ 
      checks: recentChecks,
      total: this.checks.length 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Get historical data
  private async handleHistory(url: URL, corsHeaders: any): Promise<Response> {
    const hours = parseInt(url.searchParams.get('hours') || '24');
    const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
    
    const historicalChecks = this.checks.filter(check => 
      new Date(check.timestamp) >= cutoffTime
    );
    
    return new Response(JSON.stringify({ 
      checks: historicalChecks,
      period: `${hours} hours`,
      count: historicalChecks.length 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Get trend analysis
  private async handleTrends(url: URL, corsHeaders: any): Promise<Response> {
    const hours = parseInt(url.searchParams.get('hours') || '24');
    const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
    
    const recentChecks = this.checks.filter(check => 
      new Date(check.timestamp) >= cutoffTime
    );
    
    if (recentChecks.length === 0) {
      return new Response(JSON.stringify({ 
        error: 'No data available for the specified period' 
      }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    // Calculate trends
    const hourlyBuckets = new Map<string, CheckResult[]>();
    
    recentChecks.forEach(check => {
      const hour = new Date(check.timestamp).toISOString().slice(0, 13);
      if (!hourlyBuckets.has(hour)) {
        hourlyBuckets.set(hour, []);
      }
      hourlyBuckets.get(hour)!.push(check);
    });
    
    const trends = Array.from(hourlyBuckets.entries()).map(([hour, checks]) => {
      const avgSuccessRate = checks.reduce((sum, c) => sum + c.overall.successRate, 0) / checks.length;
      const healthyCount = checks.filter(c => c.overall.status === 'healthy').length;
      const degradedCount = checks.filter(c => c.overall.status === 'degraded').length;
      const criticalCount = checks.filter(c => c.overall.status === 'critical').length;
      
      return {
        hour,
        checksCount: checks.length,
        avgSuccessRate: Math.round(avgSuccessRate * 10) / 10,
        healthyCount,
        degradedCount,
        criticalCount,
      };
    });
    
    return new Response(JSON.stringify({ 
      trends,
      period: `${hours} hours`,
      totalChecks: recentChecks.length 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Get alert history
  private async handleAlerts(corsHeaders: any): Promise<Response> {
    const alerts = this.checks.filter(check => 
      check.alertSent || check.issueCreated
    );
    
    return new Response(JSON.stringify({ 
      alerts: alerts.reverse(),
      total: alerts.length 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Calculate summary metrics
  private calculateSummary(): MetricsSummary {
    if (this.checks.length === 0) {
      return {
        totalChecks: 0,
        healthyCount: 0,
        degradedCount: 0,
        criticalCount: 0,
        averageSuccessRate: 0,
        lastCheck: null,
        recentChecks: [],
        uptimePercentage: 0,
        mtbf: 0,
        mttr: 0,
      };
    }

    const healthyCount = this.checks.filter(c => c.overall.status === 'healthy').length;
    const degradedCount = this.checks.filter(c => c.overall.status === 'degraded').length;
    const criticalCount = this.checks.filter(c => c.overall.status === 'critical').length;
    
    const avgSuccessRate = this.checks.reduce((sum, c) => sum + c.overall.successRate, 0) / this.checks.length;
    
    const uptimePercentage = (healthyCount / this.checks.length) * 100;
    
    // Calculate MTBF (Mean Time Between Failures)
    const failures = this.checks.filter(c => c.overall.status === 'critical');
    let mtbf = 0;
    if (failures.length > 1) {
      const timeBetweenFailures = [];
      for (let i = 1; i < failures.length; i++) {
        const diff = new Date(failures[i].timestamp).getTime() - new Date(failures[i - 1].timestamp).getTime();
        timeBetweenFailures.push(diff / (1000 * 60 * 60)); // Convert to hours
      }
      mtbf = timeBetweenFailures.reduce((sum, t) => sum + t, 0) / timeBetweenFailures.length;
    }
    
    // Calculate MTTR (Mean Time To Recovery)
    let mttr = 0;
    const recoveries = [];
    for (let i = 0; i < this.checks.length - 1; i++) {
      if (this.checks[i].overall.status === 'critical' && this.checks[i + 1].overall.status === 'healthy') {
        const diff = new Date(this.checks[i + 1].timestamp).getTime() - new Date(this.checks[i].timestamp).getTime();
        recoveries.push(diff / (1000 * 60 * 60)); // Convert to hours
      }
    }
    if (recoveries.length > 0) {
      mttr = recoveries.reduce((sum, t) => sum + t, 0) / recoveries.length;
    }

    return {
      totalChecks: this.checks.length,
      healthyCount,
      degradedCount,
      criticalCount,
      averageSuccessRate: Math.round(avgSuccessRate * 10) / 10,
      lastCheck: this.checks[this.checks.length - 1],
      recentChecks: this.checks.slice(-10).reverse(),
      uptimePercentage: Math.round(uptimePercentage * 10) / 10,
      mtbf: Math.round(mtbf * 10) / 10,
      mttr: Math.round(mttr * 10) / 10,
    };
  }

  // Alarm handler for scheduled tasks
  async alarm(): Promise<void> {
    // Clean up old data (older than 30 days)
    const cutoffTime = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    this.checks = this.checks.filter(check => 
      new Date(check.timestamp) >= cutoffTime
    );
    
    await this.state.storage.put('checks', this.checks);
    
    // Schedule next cleanup in 24 hours
    await this.state.storage.setAlarm(Date.now() + 24 * 60 * 60 * 1000);
  }
}

// Worker to route requests to Durable Object
export interface Env {
  AUTOPILOT_METRICS: DurableObjectNamespace;
  AUTOPILOT_TOKEN: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Verify authorization for write operations
    const url = new URL(request.url);
    if (url.pathname === '/store') {
      const authHeader = request.headers.get('Authorization');
      if (!authHeader || !authHeader.includes(env.AUTOPILOT_TOKEN)) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Get Durable Object instance (single instance for all metrics)
    const id = env.AUTOPILOT_METRICS.idFromName('global-metrics');
    const stub = env.AUTOPILOT_METRICS.get(id);
    
    // Forward request to Durable Object
    return stub.fetch(request);
  },
};
