import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  dueDate: string;
  createdAt: string;
}

// Sample data
const sampleInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-001',
    customerName: 'ABC Training Center',
    customerEmail: 'contact@abctraining.com',
    total: 5000,
    status: 'paid',
    dueDate: '2025-10-15',
    createdAt: '2025-09-15',
  },
  {
    id: '2',
    invoiceNumber: 'INV-002',
    customerName: 'XYZ Workforce Development',
    customerEmail: 'billing@xyzworkforce.org',
    total: 12000,
    status: 'sent',
    dueDate: '2025-11-30',
    createdAt: '2025-10-30',
  },
  {
    id: '3',
    invoiceNumber: 'INV-003',
    customerName: 'Community College District',
    customerEmail: 'accounts@ccd.edu',
    total: 25000,
    status: 'overdue',
    dueDate: '2025-10-01',
    createdAt: '2025-09-01',
  },
];

const statusColors = {
  draft: 'bg-gray-100 text-gray-800',
  sent: 'bg-blue-100 text-blue-800',
  paid: 'bg-green-100 text-green-800',
  overdue: 'bg-red-100 text-red-800',
};

const statusIcons = {
  draft: '📝',
  sent: '📧',
  paid: '✅',
  overdue: '⚠️',
};

export const InvoiceList: React.FC = () => {
  const navigate = useNavigate();
  const [invoices] = useState<Invoice[]>(sampleInvoices);
  const [filter, setFilter] = useState<
    'all' | 'draft' | 'sent' | 'paid' | 'overdue'
  >('all');

  const filteredInvoices =
    filter === 'all'
      ? invoices
      : invoices.filter((inv) => inv.status === filter);

  const totalRevenue = invoices
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.total, 0);

  const pendingRevenue = invoices
    .filter((inv) => inv.status === 'sent' || inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.total, 0);

  const handleViewInvoice = (id: string) => {
    // TODO: Navigate to invoice detail
  };

  const handleDownloadPDF = (invoice: Invoice) => {
    // TODO: Generate and download PDF
    alert(`Downloading PDF for ${invoice.invoiceNumber}`);
  };

  const handleSendReminder = (invoice: Invoice) => {
    // TODO: Send reminder email
    alert(`Reminder sent to ${invoice.customerEmail}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
              <p className="text-gray-600 mt-2">
                Manage and track your invoices
              </p>
            </div>
            <button
              onClick={() => navigate('/invoice/create')}
              className="mt-4 sm:mt-0 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              + Create Invoice
            </button>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ${totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ${pendingRevenue.toLocaleString()}
                </p>
              </div>
              <div className="text-4xl">⏳</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Invoices</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {invoices.length}
                </p>
              </div>
              <div className="text-4xl">📄</div>
            </div>
          </div>
        </div>
        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-wrap gap-2">
              {(['all', 'draft', 'sent', 'paid', 'overdue'] as const).map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filter === status
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status === 'all'
                      ? 'All'
                      : status.charAt(0).toUpperCase() + status.slice(1)}
                    {status !== 'all' && (
                      <span className="ml-2">
                        (
                        {invoices.filter((inv) => inv.status === status).length}
                        )
                      </span>
                    )}
                  </button>
                )
              )}
            </div>
          </div>
          {/* Invoice List */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Invoice
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="text-gray-400">
                        <div className="text-6xl mb-4">📄</div>
                        <p className="text-lg">No invoices found</p>
                        <p className="text-sm mt-2">
                          Create your first invoice to get started
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {invoice.invoiceNumber}
                        </div>
                        <div className="text-sm text-gray-500">
                          Created{' '}
                          {new Date(invoice.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {invoice.customerName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {invoice.customerEmail}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">
                          ${invoice.total.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[invoice.status]}`}
                        >
                          <span className="mr-1">
                            {statusIcons[invoice.status]}
                          </span>
                          {invoice.status.charAt(0).toUpperCase() +
                            invoice.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900">
                          {new Date(invoice.dueDate).toLocaleDateString()}
                        </div>
                        {invoice.status === 'overdue' && (
                          <div className="text-sm text-red-600 font-medium">
                            Overdue
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewInvoice(invoice.id)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                            title="View"
                          >
                            👁️
                          </button>
                          <button
                            onClick={() => handleDownloadPDF(invoice)}
                            className="text-gray-600 hover:text-gray-800 font-medium text-sm"
                            title="Download PDF"
                          >
                            📥
                          </button>
                          {(invoice.status === 'sent' ||
                            invoice.status === 'overdue') && (
                            <button
                              onClick={() => handleSendReminder(invoice)}
                              className="text-orange-600 hover:text-orange-800 font-medium text-sm"
                              title="Send Reminder"
                            >
                              🔔
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;
