// app/admin/hr/employees/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, Plus, Search, Filter } from 'lucide-react';

type Employee = {
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

export default function EmployeesListPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('active');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    loadEmployees();
  }, [statusFilter, pagination.page]);

  async function loadEmployees() {
    try {
      const params = new URLSearchParams({
        status: statusFilter,
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });

      if (search) {
        params.append('search', search);
      }

      const res = await fetch(`/api/hr/employees?${params}`);
      if (!res.ok) throw new Error('Failed to load employees');

      const data = await res.json();
      setEmployees(data.employees || []);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error loading employees:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setPagination({ ...pagination, page: 1 });
    loadEmployees();
  }

  const filteredEmployees = employees.filter((emp) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      emp.profile?.full_name?.toLowerCase().includes(searchLower) ||
      emp.profile?.email?.toLowerCase().includes(searchLower) ||
      emp.employee_number?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/admin/hr"
                className="text-sm text-gray-600 hover:text-gray-900 mb-2 inline-block"
              >
                ← Back to HR
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage employee records and information
              </p>
            </div>
            <Link
              href="/admin/hr/employees/new"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Employee
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-brandPrimary" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pagination.total}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    employees.filter((e) => e.employment_status === 'active')
                      .length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">On Leave</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    employees.filter((e) => e.employment_status === 'on_leave')
                      .length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Departments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    new Set(
                      employees.map((e) => e.department?.name).filter(Boolean)
                    ).size
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <form onSubmit={handleSearch} className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or employee ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPagination({ ...pagination, page: 1 });
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="active">Active</option>
              <option value="on_leave">On Leave</option>
              <option value="terminated">Terminated</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Search
            </button>
          </form>
        </div>

        {/* Employees Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading employees...</p>
            </div>
          ) : filteredEmployees.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Employee
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        ID
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Department
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Position
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Type
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Hire Date
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee) => (
                      <tr
                        key={employee.id}
                        className="border-t border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900">
                              {employee.profile?.full_name || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-600">
                              {employee.profile?.email || 'N/A'}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {employee.employee_number}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {employee.department?.name || 'N/A'}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {employee.position?.title || 'N/A'}
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {employee.employment_type}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(employee.hire_date).toLocaleDateString(
                            'en-US',
                            {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            }
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Link
                            href={`/admin/hr/employees/${employee.id}`}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Page {pagination.page} of {pagination.totalPages}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setPagination({
                          ...pagination,
                          page: pagination.page - 1,
                        })
                      }
                      disabled={pagination.page === 1}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        setPagination({
                          ...pagination,
                          page: pagination.page + 1,
                        })
                      }
                      disabled={pagination.page === pagination.totalPages}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">
                No Employees Found
              </h3>
              <p className="text-gray-600 mb-6">
                {search
                  ? 'Try adjusting your search'
                  : 'Add your first employee to get started'}
              </p>
              <Link
                href="/admin/hr/employees/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <Plus className="h-4 w-4" />
                Add Employee
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
