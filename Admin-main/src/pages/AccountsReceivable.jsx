import React from 'react';
import { 
  Search, 
  Download, 
  Upload, 
  Plus, 
  ChevronDown 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AccountsReceivable() {
  const navigate = useNavigate();

  const receivables = [
    { id: '1', invoiceNo: 'MQ/2024/12/17/102', date: 'Dec 17, 2024', customer: 'Satyaraj Borhadde', phone: '', amount: '₹ 220.00', status: 'Paid' },
    { id: '2', invoiceNo: 'MQ/2024/12/17/101', date: 'Dec 17, 2024', customer: 'Madhav Shelar', phone: '', amount: '₹ 220.00', status: 'Paid' },
    { id: '3', invoiceNo: 'MQ/2024/12/14/101', date: 'Dec 14, 2024', customer: 'Suraj Choudhary', phone: '', amount: '₹ 1050.00', status: 'Paid' },
    { id: '4', invoiceNo: 'MQ/2024/12/13/101', date: 'Dec 13, 2024', customer: 'Akshay Khutwad', phone: '8600446915', amount: '₹ 1075.00', status: 'Paid' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Account Receivable</h1>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Receivables</h2>
            <p className="text-sm text-gray-500">Manage all sales invoices and receivables</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search invoices..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Upload className="w-4 h-4" />
              Import
            </button>
            
            <button 
              onClick={() => navigate('/sales-invoices')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Invoice
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3">Invoice No</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Customer Name</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {receivables.map((item) => (
                <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-blue-600 cursor-pointer hover:underline">
                    {item.invoiceNo}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{item.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{item.customer}</td>
                  <td className="px-6 py-4 text-gray-500">{item.phone}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{item.amount}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-blue-600 hover:bg-blue-50 p-1 rounded">
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {receivables.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No receivables found
          </div>
        )}
      </div>
    </div>
  );
}
