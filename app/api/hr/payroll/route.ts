import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Calculate payroll taxes using 2024 tax tables
 * Note: This is a simplified implementation. For production use:
 * - Integrate with a payroll tax service (Gusto, ADP, etc.)
 * - Account for employee W-4 withholding allowances
 * - Handle state-specific tax rules
 * - Update tax tables annually
 */
function calculateTaxes(
  grossPay: number,
  payFrequency: 'weekly' | 'bi-weekly' | 'semi-monthly' | 'monthly' = 'bi-weekly',
  filingStatus: 'single' | 'married' | 'head_of_household' = 'single'
) {
  // Annualize the gross pay for tax bracket calculation
  const periodsPerYear = {
    weekly: 52,
    'bi-weekly': 26,
    'semi-monthly': 24,
    monthly: 12,
  };
  
  const annualizedGross = grossPay * periodsPerYear[payFrequency];
  
  // 2024 Federal Income Tax Brackets (Single filer)
  let federalTax = 0;
  if (filingStatus === 'single') {
    if (annualizedGross <= 11600) {
      federalTax = annualizedGross * 0.10;
    } else if (annualizedGross <= 47150) {
      federalTax = 1160 + (annualizedGross - 11600) * 0.12;
    } else if (annualizedGross <= 100525) {
      federalTax = 5426 + (annualizedGross - 47150) * 0.22;
    } else if (annualizedGross <= 191950) {
      federalTax = 17168.50 + (annualizedGross - 100525) * 0.24;
    } else if (annualizedGross <= 243725) {
      federalTax = 39110.50 + (annualizedGross - 191950) * 0.32;
    } else if (annualizedGross <= 609350) {
      federalTax = 55678.50 + (annualizedGross - 243725) * 0.35;
    } else {
      federalTax = 183647.25 + (annualizedGross - 609350) * 0.37;
    }
  } else if (filingStatus === 'married') {
    // 2024 Married Filing Jointly brackets
    if (annualizedGross <= 23200) {
      federalTax = annualizedGross * 0.10;
    } else if (annualizedGross <= 94300) {
      federalTax = 2320 + (annualizedGross - 23200) * 0.12;
    } else if (annualizedGross <= 201050) {
      federalTax = 10852 + (annualizedGross - 94300) * 0.22;
    } else if (annualizedGross <= 383900) {
      federalTax = 34337 + (annualizedGross - 201050) * 0.24;
    } else if (annualizedGross <= 487450) {
      federalTax = 78221 + (annualizedGross - 383900) * 0.32;
    } else if (annualizedGross <= 731200) {
      federalTax = 111357 + (annualizedGross - 487450) * 0.35;
    } else {
      federalTax = 196669.50 + (annualizedGross - 731200) * 0.37;
    }
  }
  
  // Convert annual tax to per-period
  federalTax = federalTax / periodsPerYear[payFrequency];
  
  // State tax (example: 5% flat - adjust per state)
  // TODO: Implement state-specific tax tables
  const stateTax = grossPay * 0.05;
  
  // Local tax (example: 1% - adjust per locality)
  // TODO: Implement locality-specific tax rates
  const localTax = grossPay * 0.01;
  
  // FICA taxes (fixed rates for 2024)
  // Social Security: 6.2% up to $168,600 wage base
  const socialSecurityWageBase = 168600;
  const annualSocialSecurityWages = Math.min(annualizedGross, socialSecurityWageBase);
  const socialSecurity = (annualSocialSecurityWages * 0.062) / periodsPerYear[payFrequency];
  
  // Medicare: 1.45% on all wages + 0.9% additional on wages over $200k
  let medicare = grossPay * 0.0145;
  if (annualizedGross > 200000) {
    const additionalMedicareWages = annualizedGross - 200000;
    medicare += (additionalMedicareWages * 0.009) / periodsPerYear[payFrequency];
  }

  const totalTaxes = federalTax + stateTax + localTax + socialSecurity + medicare;

  return {
    federalTax: Math.round(federalTax * 100) / 100,
    stateTax: Math.round(stateTax * 100) / 100,
    localTax: Math.round(localTax * 100) / 100,
    socialSecurity: Math.round(socialSecurity * 100) / 100,
    medicare: Math.round(medicare * 100) / 100,
    totalTaxes: Math.round(totalTaxes * 100) / 100,
  };
}

// GET /api/hr/payroll - List payroll runs
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const searchParams = request.nextUrl.searchParams;

    const year = searchParams.get('year');
    const status = searchParams.get('status');

    let query = supabase
      .from('payroll_runs')
      .select(
        `
        *,
        processed_by_profile:profiles!processed_by(full_name, email),
        approved_by_profile:profiles!approved_by(full_name, email),
        pay_stubs(count)
      `
      )
      .order('pay_date', { ascending: false });

    if (year) {
      query = query
        .gte('pay_date', `${year}-01-01`)
        .lte('pay_date', `${year}-12-31`);
    }

    if (status) {
      query = query.eq('status', status);
    }

    const { data: payrollRuns, error } = await query;

    if (error) throw error;

    return NextResponse.json({ payrollRuns });
  } catch (error: any) {
    console.error('Error fetching payroll runs:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch payroll runs' },
      { status: 500 }
    );
  }
}

// POST /api/hr/payroll - Create new payroll run & pay stubs
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();

    const { pay_period_start, pay_period_end, pay_date } = body;

    if (!pay_period_start || !pay_period_end || !pay_date) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: pay_period_start, pay_period_end, pay_date',
        },
        { status: 400 }
      );
    }

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) throw userError;

    // Generate run number
    const runNumber = `PR-${new Date().getFullYear()}-${String(
      Date.now()
    ).slice(-6)}`;

    // Create payroll run (draft)
    const { data: payrollRun, error: runError } = await supabase
      .from('payroll_runs')
      .insert({
        run_number: runNumber,
        pay_period_start,
        pay_period_end,
        pay_date,
        status: 'processing',
        processed_by: user?.id ?? null,
      })
      .select('*')
      .single();

    if (runError) throw runError;

    // 1) Fetch all active employees
    const { data: employees, error: empError } = await supabase
      .from('employees')
      .select(
        `
        id,
        salary,
        hourly_rate,
        pay_type,
        pay_frequency
      `
      )
      .eq('employment_status', 'active');

    if (empError) throw empError;

    // 2) Fetch approved time entries in that period
    const { data: timeEntries, error: timeError } = await supabase
      .from('time_entries')
      .select('*')
      .gte('entry_date', pay_period_start)
      .lte('entry_date', pay_period_end)
      .eq('status', 'approved');

    if (timeError) throw timeError;

    const payStubsToInsert: any[] = [];
    let totalGross = 0;
    let totalNet = 0;
    let totalTaxes = 0;
    let totalDeductions = 0;

    // 3) Build pay stubs
    for (const employee of employees || []) {
      const empTime = (timeEntries || []).filter(
        (te) => te.employee_id === employee.id
      );

      const regularHours = empTime.reduce(
        (sum: number, te: any) => sum + (te.regular_hours || 0),
        0
      );
      const overtimeHours = empTime.reduce(
        (sum: number, te: any) => sum + (te.overtime_hours || 0),
        0
      );

      let regularPay = 0;
      let overtimePay = 0;
      let grossPay = 0;

      if (employee.pay_type === 'hourly') {
        const rate = employee.hourly_rate || 0;
        regularPay = regularHours * rate;
        overtimePay = overtimeHours * rate * 1.5;
        grossPay = regularPay + overtimePay;
      } else {
        const annualSalary = employee.salary || 0;

        if (employee.pay_frequency === 'weekly') {
          grossPay = annualSalary / 52;
        } else if (employee.pay_frequency === 'bi-weekly') {
          grossPay = annualSalary / 26;
        } else if (employee.pay_frequency === 'semi-monthly') {
          grossPay = annualSalary / 24;
        } else {
          grossPay = annualSalary / 12;
        }

        regularPay = grossPay;
      }

      const taxes = calculateTaxes(grossPay);

      const totalBenefitsDeductions = 0; // hook benefits logic here later
      const garnishments = 0; // hook garnishment logic here later
      const otherDeductions = 0;

      const totalStubDeductions =
        taxes.totalTaxes +
        totalBenefitsDeductions +
        garnishments +
        otherDeductions;

      const netPay = grossPay - totalStubDeductions;

      totalGross += grossPay;
      totalNet += netPay;
      totalTaxes += taxes.totalTaxes;
      totalDeductions += totalStubDeductions;

      payStubsToInsert.push({
        payroll_run_id: payrollRun.id,
        employee_id: employee.id,
        regular_hours: regularHours,
        overtime_hours: overtimeHours,
        regular_pay: regularPay,
        overtime_pay: overtimePay,
        bonus: 0,
        commission: 0,
        other_earnings: 0,
        gross_pay: grossPay,
        federal_income_tax: taxes.federalTax,
        state_income_tax: taxes.stateTax,
        local_income_tax: taxes.localTax,
        social_security_tax: taxes.socialSecurity,
        medicare_tax: taxes.medicare,
        total_taxes: taxes.totalTaxes,
        health_insurance: 0,
        dental_insurance: 0,
        vision_insurance: 0,
        retirement_401k: 0,
        retirement_401k_match: 0,
        hsa_contribution: 0,
        fsa_contribution: 0,
        life_insurance: 0,
        disability_insurance: 0,
        garnishments,
        other_deductions: otherDeductions,
        total_deductions: totalStubDeductions,
        net_pay: netPay,
        ytd_gross: 0, // Note: compute YTD from prior stubs
        ytd_taxes: 0,
        ytd_deductions: 0,
        ytd_net: 0,
        payment_method: 'direct_deposit',
        status: 'pending',
      });
    }

    // 4) Insert pay stubs
    if (payStubsToInsert.length > 0) {
      const { error: stubError } = await supabase
        .from('pay_stubs')
        .insert(payStubsToInsert);

      if (stubError) throw stubError;
    }

    // 5) Update payroll run totals
    const { data: updatedRun, error: updateError } = await supabase
      .from('payroll_runs')
      .update({
        total_gross: totalGross,
        total_net: totalNet,
        total_taxes: totalTaxes,
        total_deductions: totalDeductions,
        employee_count: payStubsToInsert.length,
        status: 'draft',
      })
      .eq('id', payrollRun.id)
      .select('*')
      .single();

    if (updateError) throw updateError;

    return NextResponse.json(
      {
        payrollRun: updatedRun,
        summary: {
          totalGross,
          totalNet,
          totalTaxes,
          totalDeductions,
          employeeCount: payStubsToInsert.length,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating payroll run:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create payroll run' },
      { status: 500 }
    );
  }
}
