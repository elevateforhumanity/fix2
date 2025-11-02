import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface InvoiceData {
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  items: InvoiceItem[];
  notes: string;
  dueDate: string;
  taxRate: number;
}

export const InvoiceCreator: React.FC = () => {
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<InvoiceData>({
    invoiceNumber: `INV-${Date.now()}`,
    customerName: '',
    customerEmail: '',
    customerAddress: '',
    items: [{ id: '1', description: '', quantity: 1, rate: 0, amount: 0 }],
    notes: '',
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    taxRate: 0,
  });

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0,
    };
    setInvoice({ ...invoice, items: [...invoice.items, newItem] });
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    const updatedItems = invoice.items.map((item) => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'quantity' || field === 'rate') {
          updated.amount = updated.quantity * updated.rate;
        }
        return updated;
      }
      return item;
    });
    setInvoice({ ...invoice, items: updatedItems });
  };

  const removeItem = (id: string) => {
    setInvoice({
      ...invoice,
      items: invoice.items.filter((item) => item.id !== id),
    });
  };

  const calculateSubtotal = () => {
    return invoice.items.reduce((sum, item) => sum + item.amount, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * (invoice.taxRate / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleSave = async (status: 'draft' | 'sent') => {
    const invoiceData = {
      ...invoice,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      total: calculateTotal(),
      status,
      createdAt: new Date().toISOString(),
    };

    // TODO: Save to database
    console.log('Saving invoice:', invoiceData);

    if (status === 'sent') {
      // TODO: Generate PDF and send email
      alert(
        `Invoice ${invoice.invoiceNumber} sent to ${invoice.customerEmail}`
      );
    } else {
      alert(`Invoice ${invoice.invoiceNumber} saved as draft`);
    }

    navigate('/invoices');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Invoice</h1>
          <p className="text-gray-600 mt-2">
            Generate a professional invoice for your customer
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Invoice Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-gray-200">
            <div>
              <h2 className="text-lg font-semibold mb-4">From</h2>
              <div className="text-gray-700">
                <p className="font-semibold">Elevate for Humanity</p>
                <p>Career and Technical Institute</p>
                <p>contact@elevateforhumanity.org</p>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4">Invoice Details</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Invoice Number
                  </label>
                  <input
                    type="text"
                    value={invoice.invoiceNumber}
                    onChange={(e) =>
                      setInvoice({ ...invoice, invoiceNumber: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={invoice.dueDate}
                    onChange={(e) =>
                      setInvoice({ ...invoice, dueDate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Bill To */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Bill To</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  value={invoice.customerName}
                  onChange={(e) =>
                    setInvoice({ ...invoice, customerName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Organization or Individual Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={invoice.customerEmail}
                  onChange={(e) =>
                    setInvoice({ ...invoice, customerEmail: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="customer@example.com"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Billing Address
                </label>
                <textarea
                  value={invoice.customerAddress}
                  onChange={(e) =>
                    setInvoice({ ...invoice, customerAddress: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Street Address, City, State, ZIP"
                />
              </div>
            </div>
          </div>
          {/* Line Items */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Items</h2>
              <button
                onClick={addItem}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                + Add Item
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Description
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-24">
                      Qty
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-32">
                      Rate
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-32">
                      Amount
                    </th>
                    <th className="px-4 py-3 w-12" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {invoice.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) =>
                            updateItem(item.id, 'description', e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="Item description"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(
                              item.id,
                              'quantity',
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          min="0"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) =>
                            updateItem(
                              item.id,
                              'rate',
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          min="0"
                          step="0.01"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="px-3 py-2 bg-gray-50 rounded-lg font-medium">
                          ${item.amount.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {invoice.items.length > 1 && (
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            ✕
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-full md:w-96 space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal:</span>
                <span className="font-medium">
                  ${calculateSubtotal().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-700">
                <div className="flex items-center space-x-2">
                  <span>Tax:</span>
                  <input
                    type="number"
                    value={invoice.taxRate}
                    onChange={(e) =>
                      setInvoice({
                        ...invoice,
                        taxRate: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                  <span>%</span>
                </div>
                <span className="font-medium">
                  ${calculateTax().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-300">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
          {/* Notes */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={invoice.notes}
              onChange={(e) =>
                setInvoice({ ...invoice, notes: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Payment terms, thank you message, etc."
            />
          </div>
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <button
              onClick={() => navigate('/invoices')}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSave('draft')}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
            >
              💾 Save Draft
            </button>
            <button
              onClick={() => handleSave('sent')}
              disabled={!invoice.customerName || !invoice.customerEmail}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              📧 Send Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCreator;
