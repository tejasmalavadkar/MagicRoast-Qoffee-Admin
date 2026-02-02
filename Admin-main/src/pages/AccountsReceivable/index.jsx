import { useState } from 'react';
import { Search, Download, Upload, Plus, MoreVertical, Phone, FileText, User } from 'lucide-react';

export default function AccountsReceivablePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const invoices = [
    {
      id: 1,
      invoiceNo: 'INV-001',
      date: '2024-01-15',
      customerName: 'John Smith',
      phone: '+1 (555) 123-4567',
      amount: 2450.00,
      status: 'Paid'
    },
    {
      id: 2,
      invoiceNo: 'INV-002',
      date: '2024-01-18',
      customerName: 'Sarah Johnson',
      phone: '+1 (555) 234-5678',
      amount: 1875.50,
      status: 'Pending'
    },
    {
      id: 3,
      invoiceNo: 'INV-003',
      date: '2024-01-20',
      customerName: 'Michael Brown',
      phone: '+1 (555) 345-6789',
      amount: 3200.75,
      status: 'Overdue'
    },
    {
      id: 4,
      invoiceNo: 'INV-004',
      date: '2024-01-22',
      customerName: 'Emily Davis',
      phone: '+1 (555) 456-7890',
      amount: 1500.00,
      status: 'Paid'
    },
    {
      id: 5,
      invoiceNo: 'INV-005',
      date: '2024-01-25',
      customerName: 'David Wilson',
      phone: '+1 (555) 567-8901',
      amount: 2750.25,
      status: 'Pending'
    }
  ];

  const filteredInvoices = invoices.filter(invoice => 
    invoice.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Account Receivable</h1>
              <p className="text-gray-600 mt-1">Manage all sales invoices and receivables</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search invoices…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
              
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
              
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <Upload className="w-4 h-4" />
                Import
              </button>
              
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <Plus className="w-4 h-4" />
                New Invoice
              </button>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Receivables</h2>
          </div>

          {/* Invoices Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Invoice No</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Customer Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Phone</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-800">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-500" />
                        {invoice.invoiceNo}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{invoice.date}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        {invoice.customerName}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-green-500" />
                        {invoice.phone}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-800">${invoice.amount.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        invoice.status === 'Paid' 
                          ? 'bg-green-100 text-green-800' 
                          : invoice.status === 'Pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-gray-500 hover:text-gray-700 p-1">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredInvoices.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">No invoices found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}