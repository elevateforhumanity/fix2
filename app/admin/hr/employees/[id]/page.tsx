// app/admin/hr/employees/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Calendar, DollarSign, Save, ArrowLeft } from 'lucide-react';

type Employee = {
  id: string;
  employee_number: string;
  hire_date: string;
  employment_type: string;
  employment_status: string;
  pay_type: string;
  pay_frequency: string;
  salary?: number;
  hourly_rate?: number;
  department_id?: string;
  position_id?: string;
  profile: {
    full_name: string;
    email: string;
    phone?: string;
  };
  department?: {
    id: string;
    name: string;
  };
  position?: {
    id: string;
    title: string;
  };
};

export default function EmployeeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const employeeId = params.id as string;

  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    employment_type: '',
    employment_status: '',
    pay_type: '',
    pay_frequency: '',
    salary: '',
    hourly_rate: '',
    department_id: '',
    position_id: '',
  });

  useEffect(() => {
    loadEmployee();
  }, [employeeId]);

  async function loadEmployee() {
    try {
      const res = await fetch(`/api/hr/employees/${employeeId}`);
      if (!res.ok) throw new Error('Failed to load employee');
      const data = await res.json();
      setEmployee(data.employee);
      
      // Initialize form data
      setFormData({
        employment_type: data.employee.employment_type || '',
        employment_status: data.employee.employment_status || '',
        pay_type: data.employee.pay_type || '',
        pay_frequency: data.employee.pay_frequency || '',
        salary: data.employee.salary?.toString() || '',
        hourly_rate: data.employee.hourly_rate?.toString() || '',
        department_id: data.employee.department_id || '',
        position_id: data.employee.position_id || '',
      });
    } catch (e: any) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setError(null);

    try {
      const payload: any = {
        employment_type: formData.employment_type,
        employment_status: formData.employment_status,
        pay_type: formData.pay_type,
        pay_frequency: formData.pay_frequency,
        department_id: formData.department_id || null,
        position_id: formData.position_id || null,
      };

      if (formData.pay_type === 'salary') {
        payload.salary = parseFloat(formData.salary) || 0;
        payload.hourly_rate = null;
      } else {
        payload.hourly_rate = parseFloat(formData.hourly_rate) || 0;
        payload.salary = null;
      }

      const res = await fetch(`/api/hr/employees/${employeeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to update employee');

      await loadEmployee();
      setEditing(false);
    } catch (e: any) {
      setError(e.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading employee...</p>
        </div>
      </div>
    );
  }

  if (error && !employee) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link
            href="/admin/hr/employees"
            className="text-red-600 hover:text-red-700 font-medium"
          >
            ← Back to Employees
          </Link>
        </div>
      </div>
    );
  }

  if (!employee) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/admin/hr/employees"
                className="text-sm text-gray-600 hover:text-gray-900 mb-2 inline-flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Employees
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 mt-2">
                {employee.profile?.full_name}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Employee ID: {employee.employee_number}
              </p>
            </div>
            <div className="flex gap-3">
              {editing ? (
                <>
                  <button
                    onClick={() => {
                      setEditing(false);
                      loadEmployee();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Edit Employee
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {/* Personal Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-medium text-gray-900">{employee.profile?.full_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900">{employee.profile?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-gray-900">
                  {employee.profile?.phone || 'Not provided'}
                </p>
              </div>
            </div>
          </div>

          {/* Employment Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Employment Details
            </h2>
            <div className="space-y-3">
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
                <p className="text-sm text-gray-600">Employment Type</p>
                {editing ? (
                  <select
                    value={formData.employment_type}
                    onChange={(e) =>
                      setFormData({ ...formData, employment_type: e.target.value })
                    }
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="temporary">Temporary</option>
                  </select>
                ) : (
                  <p className="font-medium text-gray-900 capitalize">
                    {employee.employment_type}
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                {editing ? (
                  <select
                    value={formData.employment_status}
                    onChange={(e) =>
                      setFormData({ ...formData, employment_status: e.target.value })
                    }
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="on_leave">On Leave</option>
                    <option value="terminated">Terminated</option>
                  </select>
                ) : (
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      employee.employment_status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : employee.employment_status === 'on_leave'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {employee.employment_status}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Compensation */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Compensation
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Pay Type</p>
                {editing ? (
                  <select
                    value={formData.pay_type}
                    onChange={(e) =>
                      setFormData({ ...formData, pay_type: e.target.value })
                    }
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="salary">Salary</option>
                    <option value="hourly">Hourly</option>
                  </select>
                ) : (
                  <p className="font-medium text-gray-900 capitalize">{employee.pay_type}</p>
                )}
              </div>

              {(editing ? formData.pay_type === 'salary' : employee.pay_type === 'salary') && (
                <div>
                  <p className="text-sm text-gray-600">Annual Salary</p>
                  {editing ? (
                    <input
                      type="number"
                      value={formData.salary}
                      onChange={(e) =>
                        setFormData({ ...formData, salary: e.target.value })
                      }
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="font-medium text-gray-900">
                      ${employee.salary?.toLocaleString()}
                    </p>
                  )}
                </div>
              )}

              {(editing ? formData.pay_type === 'hourly' : employee.pay_type === 'hourly') && (
                <div>
                  <p className="text-sm text-gray-600">Hourly Rate</p>
                  {editing ? (
                    <input
                      type="number"
                      step="0.01"
                      value={formData.hourly_rate}
                      onChange={(e) =>
                        setFormData({ ...formData, hourly_rate: e.target.value })
                      }
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="font-medium text-gray-900">
                      ${employee.hourly_rate?.toFixed(2)}/hr
                    </p>
                  )}
                </div>
              )}

              <div>
                <p className="text-sm text-gray-600">Pay Frequency</p>
                {editing ? (
                  <select
                    value={formData.pay_frequency}
                    onChange={(e) =>
                      setFormData({ ...formData, pay_frequency: e.target.value })
                    }
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Bi-weekly</option>
                    <option value="semi-monthly">Semi-monthly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                ) : (
                  <p className="font-medium text-gray-900 capitalize">
                    {employee.pay_frequency}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Department & Position */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Department & Position</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Department</p>
                <p className="font-medium text-gray-900">
                  {employee.department?.name || 'Not assigned'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Position</p>
                <p className="font-medium text-gray-900">
                  {employee.position?.title || 'Not assigned'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Link
            href={`/admin/hr/time?employee_id=${employeeId}`}
            className="p-4 bg-white border border-gray-200 rounded-lg hover:border-red-300 transition"
          >
            <h3 className="font-bold text-gray-900 mb-1">Time Entries</h3>
            <p className="text-sm text-gray-600">View and approve time entries</p>
          </Link>
          <Link
            href={`/admin/hr/leave?employee_id=${employeeId}`}
            className="p-4 bg-white border border-gray-200 rounded-lg hover:border-red-300 transition"
          >
            <h3 className="font-bold text-gray-900 mb-1">Leave Requests</h3>
            <p className="text-sm text-gray-600">Manage PTO and leave requests</p>
          </Link>
          <Link
            href={`/admin/hr/payroll?employee_id=${employeeId}`}
            className="p-4 bg-white border border-gray-200 rounded-lg hover:border-red-300 transition"
          >
            <h3 className="font-bold text-gray-900 mb-1">Payroll History</h3>
            <p className="text-sm text-gray-600">View pay stubs and history</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
