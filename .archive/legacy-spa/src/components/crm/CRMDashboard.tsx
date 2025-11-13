import React, { useState } from 'react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  status: 'lead' | 'qualified' | 'proposal' | 'customer';
  value: number;
  lastContact: string;
  source: string;
}

const sampleContacts: Contact[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@abctraining.com',
    phone: '(555) 123-4567',
    organization: 'ABC Training Center',
    status: 'customer',
    value: 50000,
    lastContact: '2025-11-01',
    source: 'Website',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@xyzworkforce.org',
    phone: '(555) 234-5678',
    organization: 'XYZ Workforce Development',
    status: 'proposal',
    value: 120000,
    lastContact: '2025-10-28',
    source: 'Referral',
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'mbrown@ccd.edu',
    phone: '(555) 345-6789',
    organization: 'Community College District',
    status: 'qualified',
    value: 250000,
    lastContact: '2025-10-25',
    source: 'Conference',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@techbootcamp.com',
    phone: '(555) 456-7890',
    organization: 'Tech Bootcamp Inc',
    status: 'lead',
    value: 75000,
    lastContact: '2025-10-20',
    source: 'LinkedIn',
  },
];

const statusConfig = {
  lead: { label: 'Lead', color: 'bg-gray-100 text-gray-800', icon: '🎯' },
  qualified: {
    label: 'Qualified',
    color: 'bg-blue-100 text-blue-800',
    icon: '✓',
  },
  proposal: {
    label: 'Proposal',
    color: 'bg-yellow-100 text-yellow-800',
    icon: '📄',
  },
  customer: {
    label: 'Customer',
    color: 'bg-green-100 text-green-800',
    icon: '🎉',
  },
};

export const CRMDashboard: React.FC = () => {
  const [contacts] = useState<Contact[]>(sampleContacts);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showAddContact, setShowAddContact] = useState(false);

  const filteredContacts =
    selectedStatus === 'all'
      ? contacts
      : contacts.filter((c) => c.status === selectedStatus);

  const totalValue = contacts.reduce((sum, c) => sum + c.value, 0);
  const pipelineValue = contacts
    .filter((c) => c.status !== 'customer')
    .reduce((sum, c) => sum + c.value, 0);

  const statusCounts = {
    lead: contacts.filter((c) => c.status === 'lead').length,
    qualified: contacts.filter((c) => c.status === 'qualified').length,
    proposal: contacts.filter((c) => c.status === 'proposal').length,
    customer: contacts.filter((c) => c.status === 'customer').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                CRM Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your contacts and sales pipeline
              </p>
            </div>
            <button
              onClick={() => setShowAddContact(true)}
              className="mt-4 sm:mt-0 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              + Add Contact
            </button>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Contacts</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {contacts.length}
                </p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pipeline Value</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ${(pipelineValue / 1000).toFixed(0)}K
                </p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ${(totalValue / 1000).toFixed(0)}K
                </p>
              </div>
              <div className="text-4xl">📈</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Customers</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {statusCounts.customer}
                </p>
              </div>
              <div className="text-4xl">🎉</div>
            </div>
          </div>
        </div>
        {/* Pipeline Stages */}
        <div className="bg-white rounded-lg shadow mb-8 p-6">
          <h2 className="text-lg font-semibold mb-4">Sales Pipeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(statusConfig).map(([key, config]) => (
              <div
                key={key}
                className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer"
                onClick={() => setSelectedStatus(key)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{config.icon}</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {statusCounts[key as keyof typeof statusCounts]}
                  </span>
                </div>
                <div className="text-sm font-medium text-gray-700">
                  {config.label}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  $
                  {(
                    contacts
                      .filter((c) => c.status === key)
                      .reduce((sum, c) => sum + c.value, 0) / 1000
                  ).toFixed(0)}
                  K value
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedStatus('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedStatus === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Contacts ({contacts.length})
              </button>
              {Object.entries(statusConfig).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setSelectedStatus(key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedStatus === key
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {config.icon} {config.label} (
                  {statusCounts[key as keyof typeof statusCounts]})
                </button>
              ))}
            </div>
          </div>
          {/* Contact List */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Organization
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Last Contact
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {contact.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {contact.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {contact.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">
                        {contact.organization}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig[contact.status].color}`}
                      >
                        <span className="mr-1">
                          {statusConfig[contact.status].icon}
                        </span>
                        {statusConfig[contact.status].label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">
                        ${contact.value.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">
                        {new Date(contact.lastContact).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-700">{contact.source}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                          title="View"
                        >
                          👁️
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-800 font-medium text-sm"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          className="text-green-600 hover:text-green-800 font-medium text-sm"
                          title="Email"
                        >
                          📧
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* HubSpot Integration Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <div className="text-3xl mr-4">🔗</div>
            <div>
              <h3 className="font-semibold text-lg text-blue-900 mb-2">
                HubSpot Integration Available
              </h3>
              <p className="text-blue-800 mb-4">
                Connect your HubSpot account to sync contacts, track deals, and
                automate your sales process.
              </p>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                Connect HubSpot
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Add Contact Modal (placeholder) */}
      {showAddContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Add New Contact</h2>
              <button
                onClick={() => setShowAddContact(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              Contact form will be implemented with full CRM integration.
            </p>
            <button
              onClick={() => setShowAddContact(false)}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRMDashboard;
