import { NextResponse } from 'next/server';

/**
 * Run All Production Tests
 * GET /api/run-all-tests
 *
 * Runs all test endpoints and aggregates results
 */
export async function GET(request: Request) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    const results: any = {
      timestamp: new Date().toISOString(),
      base_url: baseUrl,
      test_suites: [],
      overall_summary: {
        total_suites: 0,
        passed_suites: 0,
        failed_suites: 0,
        total_tests: 0,
        passed_tests: 0,
        failed_tests: 0,
      },
    };

    // Test 1: Multi-Tenant
    try {
      const response = await fetch(`${baseUrl}/api/test-multi-tenant`);
      const data = await response.json();
      results.test_suites.push({
        name: 'Multi-Tenant Isolation',
        status: data.summary?.all_passed ? 'PASSED' : 'FAILED',
        ...data,
      });
      results.overall_summary.total_tests += data.summary?.total || 0;
      results.overall_summary.passed_tests += data.summary?.passed || 0;
      results.overall_summary.failed_tests += data.summary?.failed || 0;
    } catch (error: any) {
      results.test_suites.push({
        name: 'Multi-Tenant Isolation',
        status: 'ERROR',
        error: error.message,
      });
    }

    // Test 2: License Enforcement
    try {
      const response = await fetch(`${baseUrl}/api/test-license-enforcement`);
      const data = await response.json();
      results.test_suites.push({
        name: 'License Enforcement',
        status: data.summary?.all_passed ? 'PASSED' : 'FAILED',
        ...data,
      });
      results.overall_summary.total_tests += data.summary?.total || 0;
      results.overall_summary.passed_tests += data.summary?.passed || 0;
      results.overall_summary.failed_tests += data.summary?.failed || 0;
    } catch (error: any) {
      results.test_suites.push({
        name: 'License Enforcement',
        status: 'ERROR',
        error: error.message,
      });
    }

    // Test 3: Compliance Reporting
    try {
      const response = await fetch(`${baseUrl}/api/test-compliance`);
      const data = await response.json();
      results.test_suites.push({
        name: 'Compliance Reporting',
        status: data.summary?.all_passed ? 'PASSED' : 'FAILED',
        ...data,
      });
      results.overall_summary.total_tests += data.summary?.total || 0;
      results.overall_summary.passed_tests += data.summary?.passed || 0;
      results.overall_summary.failed_tests += data.summary?.failed || 0;
    } catch (error: any) {
      results.test_suites.push({
        name: 'Compliance Reporting',
        status: 'ERROR',
        error: error.message,
      });
    }

    // Calculate overall summary
    results.overall_summary.total_suites = results.test_suites.length;
    results.overall_summary.passed_suites = results.test_suites.filter(
      (s: any) => s.status === 'PASSED'
    ).length;
    results.overall_summary.failed_suites =
      results.overall_summary.total_suites -
      results.overall_summary.passed_suites;

    const successRate =
      results.overall_summary.total_tests > 0
        ? (
            (results.overall_summary.passed_tests /
              results.overall_summary.total_tests) *
            100
          ).toFixed(1)
        : '0';

    results.overall_summary.success_rate = successRate + '%';
    results.overall_summary.all_passed =
      results.overall_summary.failed_tests === 0;

    // Production readiness assessment
    results.production_readiness = {
      multi_tenant:
        results.test_suites[0]?.status === 'PASSED' ? '10/10' : '7/10',
      license_enforcement:
        results.test_suites[1]?.status === 'PASSED' ? '10/10' : '7/10',
      compliance:
        results.test_suites[2]?.status === 'PASSED' ? '10/10' : '7/10',
      overall: results.overall_summary.all_passed
        ? '10/10 - PRODUCTION READY ✅'
        : '8/10 - NEEDS FIXES ⚠️',
    };

    return NextResponse.json(results, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
