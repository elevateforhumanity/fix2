// app/employee/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User,
  DollarSign,
  Calendar,
  FileText,
  Clock,
  Briefcase,
} from 'lucide-react';

type EmployeeData = {
  id: string;
  employee_number: string;
  hire_date: string;
  employment_type: string;
  employment_status: string;
  salary?: number;
  hourly_rate?: number;
  profile: {
    full_name: string;
    email: string;
  };
  department?: {
    name: string;
  };
  position?: {
    title: string;
  };
};

type PayrollRecord = {
  id: string;
  pay_period_start: string;
  pay_period_end: string;
  gross_pay: number;
  net_pay: number;
  status: string;
};

export default function EmployeePortalPage() {
  const [employee, setEmployee] = useState<EmployeeData | null>(null);
  const [payrolls, setPayrolls] = useState<PayrollRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployeeData();
  }, []);

  async function loadEmployeeData() {
    try {
      // Load employee profile
      const empRes = await fetch('/api/employee/me');
      if (empRes.ok) {
        const empData = await empRes.json();
        setEmployee(empData.employee);
      }

      // Load recent payroll
      const payRes = await fetch('/api/employee/payroll');
      if (payRes.ok) {
        const payData = await payRes.json();
        setPayrolls(payData.payrolls || []);
      }
    } catch (error) {
      console.error('Error loading employee data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Employee Profile Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            Please contact HR to set up your employee profile.
          </p>
          <Link
            href="/"
            className="inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const recentPayroll = payrolls[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Employee Portal
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Welcome back, {employee.profile?.full_name}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/employee/payroll"
                className="text-gray-700 hover:text-red-600 font-medium"
              >
                Payroll
              </Link>
              <Link
                href="/employee/time-off"
                className="text-gray-700 hover:text-red-600 font-medium"
              >
                Time Off
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-2xl font-bold">
              {employee.profile?.full_name?.charAt(0) || 'E'}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {employee.profile?.full_name}
              </h2>
              <p className="text-gray-600 mb-4">{employee.profile?.email}</p>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-gray-600">Employee ID</p>
                  <p className="font-medium text-gray-900">
                    {employee.employee_number}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Department</p>
                  <p className="font-medium text-gray-900">
                    {employee.department?.name || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Position</p>
                  <p className="font-medium text-gray-900">
                    {employee.position?.title || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Employment Type</p>
                  <p className="font-medium text-gray-900 capitalize">
                    {employee.employment_type}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Hire Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(employee.hire_date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {employee.employment_status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Link
            href="/employee/payroll"
            className="bg-white rounded-lg border border-gray-200 p-6 hover:border-red-300 transition"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">View Payroll</p>
                <p className="text-lg font-bold text-gray-900">Pay Stubs</p>
              </div>
            </div>
          </Link>

          <Link
            href="/employee/time-off"
            className="bg-white rounded-lg border border-gray-200 p-6 hover:border-red-300 transition"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-brandPrimary" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Request Time Off</p>
                <p className="text-lg font-bold text-gray-900">Leave</p>
              </div>
            </div>
          </Link>

          <Link
            href="/employee/documents"
            className="bg-white rounded-lg border border-gray-200 p-6 hover:border-red-300 transition"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">View Documents</p>
                <p className="text-lg font-bold text-gray-900">Files</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Payroll */}
        {recentPayroll && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-4">Recent Payroll</h2>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Pay Period</p>
                <p className="font-medium text-gray-900">
                  {new Date(recentPayroll.pay_period_start).toLocaleDateString(
                    'en-US',
                    {
                      month: 'short',
                      day: 'numeric',
                    }
                  )}{' '}
                  -{' '}
                  {new Date(recentPayroll.pay_period_end).toLocaleDateString(
                    'en-US',
                    {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    }
                  )}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Net Pay</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${recentPayroll.net_pay.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/employee/payroll"
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                View All Pay Stubs →
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
