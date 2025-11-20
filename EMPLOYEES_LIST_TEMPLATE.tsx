/**
 * FULL WORKING TEMPLATE: Employees List Page
 *
 * File: app/(admin)/hr/employees/page.tsx
 *
 * This is a complete, production-ready implementation that your builder
 * can use as a pattern for all other admin pages.
 *
 * FEATURES:
 * - Server-side data fetching
 * - Client-side filtering with URL params
 * - Search, department filter, status filter
 * - Pagination
 * - Responsive table
 * - Loading states
 * - Error handling
 * - Type-safe
 *
 * TO ADAPT FOR OTHER PAGES:
 * 1. Change the API endpoint
 * 2. Update the TypeScript types
 * 3. Modify table columns
 * 4. Adjust filters
 * 5. Update action buttons
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

// ============================================================================
// TYPES - Update these for your specific page
// ============================================================================

type Employee = {
  id: string;
  employee_number: string;
  profile: {
    full_name: string;
    email: string;
  };
  department: string;
  position: string;
  manager: {
    full_name: string;
  } | null;
  employment_status: string;
  hire_date: string;
};

type EmployeesResponse = {
  employees: Employee[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function EmployeesListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ============================================================================
  // STATE
  // ============================================================================

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters from URL params
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [department, setDepartment] = useState(
    searchParams.get('department') || ''
  );
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  // ============================================================================
  // DATA FETCHING
  // ============================================================================

  useEffect(() => {
    fetchEmployees();
  }, [searchParams]); // Re-fetch when URL params change

  async function fetchEmployees() {
    setLoading(true);
    setError(null);

    try {
      // Build query string from URL params
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (department) params.set('department', department);
      if (status) params.set('status', status);
      params.set('page', currentPage.toString());
      params.set('limit', pagination.limit.toString());

      const response = await fetch(`/api/hr/employees?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }

      const data: EmployeesResponse = await response.json();
      setEmployees(data.employees);
      setPagination(data.pagination);
    } catch (err: any) {
      console.error('Error fetching employees:', err);
      setError(err.message || 'Failed to load employees');
    } finally {
      setLoading(false);
    }
  }

  // ============================================================================
  // FILTER HANDLERS
  // ============================================================================

  function updateFilters(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());

    // Update or remove each filter
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // Reset to page 1 when filters change
    params.set('page', '1');

    // Update URL
    router.push(`?${params.toString()}`);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    updateFilters({ search: value, department, status });
  }

  function handleDepartmentChange(value: string) {
    setDepartment(value);
    updateFilters({ search, department: value, status });
  }

  function handleStatusChange(value: string) {
    setStatus(value);
    updateFilters({ search, department, status: value });
  }

  function handlePageChange(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  }

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  function getStatusBadge(status: string) {
    const styles: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      terminated: 'bg-red-100 text-red-800',
      on_leave: 'bg-yellow-100 text-yellow-800',
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-semibold rounded-full ${
          styles[status] || 'bg-gray-100 text-gray-800'
        }`}
      >
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ====================================================================
            HEADER
        ==================================================================== */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
            <p className="mt-2 text-gray-600">
              {pagination.total} total employees
            </p>
          </div>
          <Link
            href="/admin/hr/employees/new"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            + Add Employee
          </Link>
        </div>

        {/* ====================================================================
            FILTERS
        ==================================================================== */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Name or email..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Department Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => handleDepartmentChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Departments</option>
                <option value="HR">HR</option>
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
                <option value="Training">Training</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="on_leave">On Leave</option>
                <option value="terminated">Terminated</option>
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          {(search || department || status) && (
            <div className="mt-4">
              <button
                onClick={() => {
                  setSearch('');
                  setDepartment('');
                  setStatus('');
                  router.push('/admin/hr/employees');
                }}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* ====================================================================
            LOADING STATE
        ==================================================================== */}
        {loading && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading employees...</p>
          </div>
        )}

        {/* ====================================================================
            ERROR STATE
        ==================================================================== */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800 font-medium">Error: {error}</p>
            <button
              onClick={fetchEmployees}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* ====================================================================
            EMPLOYEES TABLE
        ==================================================================== */}
        {!loading && !error && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Manager
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hire Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {employees.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        No employees found. Try adjusting your filters.
                      </td>
                    </tr>
                  ) : (
                    employees.map((employee) => (
                      <tr key={employee.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {employee.profile.full_name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {employee.profile.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {employee.employee_number}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {employee.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {employee.position}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {employee.manager?.full_name || '—'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(employee.employment_status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(employee.hire_date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Link
                            href={`/admin/hr/employees/${employee.id}`}
                            className="text-blue-600 hover:text-blue-900 font-medium"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* ================================================================
                PAGINATION
            ================================================================ */}
            {pagination.totalPages > 1 && (
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                <div className="text-sm text-gray-700">
                  Showing page {pagination.page} of {pagination.totalPages} (
                  {pagination.total} total)
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pagination.totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * ============================================================================
 * ADAPTATION GUIDE FOR OTHER PAGES
 * ============================================================================
 *
 * To create a new admin list page (e.g., Payroll, Leave Requests, etc.):
 *
 * 1. COPY THIS FILE to your new location
 *
 * 2. UPDATE TYPES:
 *    - Change `Employee` type to match your data
 *    - Change `EmployeesResponse` to match your API response
 *
 * 3. UPDATE API ENDPOINT:
 *    - Change `/api/hr/employees` to your endpoint
 *
 * 4. UPDATE FILTERS:
 *    - Modify the filter dropdowns to match your data
 *    - Add/remove filters as needed
 *
 * 5. UPDATE TABLE COLUMNS:
 *    - Change table headers
 *    - Update table cells to display your data
 *    - Modify action buttons
 *
 * 6. UPDATE HELPER FUNCTIONS:
 *    - Modify `getStatusBadge()` for your status types
 *    - Add any custom formatting functions
 *
 * 7. TEST:
 *    - Test all filters
 *    - Test pagination
 *    - Test search
 *    - Test error states
 *
 * ============================================================================
 * EXAMPLE: Converting to Payroll Runs List
 * ============================================================================
 *
 * 1. Change types:
 *    type PayrollRun = {
 *      id: string;
 *      run_number: string;
 *      pay_period_start: string;
 *      pay_period_end: string;
 *      pay_date: string;
 *      status: string;
 *      employee_count: number;
 *      total_gross: number;
 *      total_net: number;
 *    };
 *
 * 2. Change API: `/api/hr/payroll`
 *
 * 3. Update filters:
 *    - Year dropdown instead of department
 *    - Status: draft/processing/approved/paid
 *
 * 4. Update table columns:
 *    - Run number, pay period, pay date, status, counts, totals
 *
 * 5. Update actions:
 *    - "View" → `/admin/hr/payroll/${id}`
 *    - "Process" button if status is draft
 *
 * ============================================================================
 */
