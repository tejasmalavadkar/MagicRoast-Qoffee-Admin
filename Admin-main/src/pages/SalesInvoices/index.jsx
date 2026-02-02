import { useState } from 'react';
import { Search, Plus, Package, DollarSign, Calendar, User, FileText, CreditCard } from 'lucide-react';

export default function SalesInvoicesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Sales Invoices</h1>
              <p className="text-gray-600 mt-1">Manage all sales transactions</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search invoices…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition w-full sm:w-64"
                />
              </div>
              
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <Plus className="w-4 h-4" />
                New Invoice
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Invoices</p>
                <p className="text-2xl font-bold text-gray-800">142</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today’s Invoices</p>
                <p className="text-2xl font-bold text-gray-800">12</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold text-gray-800">$24,560</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Local Orders */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Pending Local Orders</h3>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Package className="w-12 h-12 text-gray-400 mb-4" />
              <h4 className="text-lg font-medium text-gray-600 mb-2">No pending orders</h4>
              <p className="text-gray-500 mb-4">All local orders have been processed</p>
            </div>
          </div>

          {/* Online Sales Orders Table */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Online Sales Orders</h3>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CreditCard className="w-12 h-12 text-gray-400 mb-4" />
              <h4 className="text-lg font-medium text-gray-600 mb-2">No online sales orders</h4>
              <p className="text-gray-500 mb-4">No online sales orders to display</p>
            </div>
          </div>
        </div>

        {/* Create New Invoice Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Invoice</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Invoice Info */}
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-3">Invoice Information</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
                  <input
                    type="text"
                    placeholder="INV-001"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-3">Customer Information</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Table */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-gray-700 mb-3">Product Details</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-4 font-medium text-gray-700">Product</th>
                    <th className="text-left py-2 px-4 font-medium text-gray-700">Quantity</th>
                    <th className="text-left py-2 px-4 font-medium text-gray-700">Price</th>
                    <th className="text-left py-2 px-4 font-medium text-gray-700">Total</th>
                    <th className="text-left py-2 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4">
                      <input
                        type="text"
                        placeholder="Product name"
                        className="w-full p-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </td>
                    <td className="py-2 px-4">
                      <input
                        type="number"
                        placeholder="0"
                        className="w-full p-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </td>
                    <td className="py-2 px-4">
                      <input
                        type="number"
                        placeholder="0.00"
                        className="w-full p-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </td>
                    <td className="py-2 px-4">$0.00</td>
                    <td className="py-2 px-4">
                      <button className="text-red-600 hover:text-red-800">
                        Remove
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button className="mt-2 text-blue-600 hover:text-blue-800 font-medium">
              + Add Product
            </button>
          </div>

          {/* Payment Information */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-gray-700 mb-3">Payment Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                  <option>Credit Card</option>
                  <option>Debit Card</option>
                  <option>Bank Transfer</option>
                  <option>Cash</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                  <option>Pending</option>
                  <option>Paid</option>
                  <option>Overdue</option>
                  <option>Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              Create Invoice
            </button>
          </div>
        </div>

        {/* Invoice List Table */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Invoice List</h3>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mb-4" />
            <h4 className="text-lg font-medium text-gray-600 mb-2">No invoices found</h4>
            <p className="text-gray-500 mb-4">Create your first invoice to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
}