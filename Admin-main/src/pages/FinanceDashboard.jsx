import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  ChevronRight, 
  ChevronDown,
  Filter,
  Download
} from 'lucide-react';

export default function FinanceDashboard() {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const stats = [
    {
      title: 'Employee Salary Total',
      amount: '₹0.00',
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      icon: 'circle'
    },
    {
      title: 'Raw Material Purchase Total',
      amount: '₹22,20,782.32',
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      icon: 'circle'
    },
    {
      title: 'Other Expencess Total',
      amount: '₹0.00',
      color: 'bg-gradient-to-r from-pink-500 to-pink-600',
      icon: 'circle'
    }
  ];

  const rawMaterialData = [
    { id: '1', receiptNo: '4/11/2025', date: '06 Nov 2025', supplier: 'Ccl Products (India) Ltd', amount: '₹58,800.00', status: 'Paid' },
    { id: '2', receiptNo: 'TP/01-24/1760', date: '24 Sep 2025', supplier: 'Ccl Products (India) Ltd', amount: '₹86,700.00', status: 'Paid' },
    { id: '3', receiptNo: 'TP/01-24/1662', date: '18 Sep 2025', supplier: 'Ccl Products (India) Ltd', amount: '₹17,550.00', status: 'Paid' },
    { id: '4', receiptNo: '32/1283/23-24', date: '05 Sep 2025', supplier: 'Sixseason Pvt Ltd', amount: '₹35,400.00', status: 'Paid' },
    { id: '5', receiptNo: '2025-26/0017', date: '04 Jul 2025', supplier: 'The Frozen Basket Pvt Ltd', amount: '₹5,612.24', status: 'Paid' },
    { id: '6', receiptNo: 'TP/25-26/546', date: '04 Jul 2025', supplier: 'Ccl Products (India) Ltd', amount: '₹62,000.00', status: 'Paid' },
    { id: '7', receiptNo: '2025-26/2046', date: '26 Apr 2025', supplier: 'The Frozen Basket Pvt Ltd', amount: '₹4,296.93', status: 'Paid' },
    { id: '8', receiptNo: '2025-26/0035', date: '24 Apr 2025', supplier: 'The Frozen Basket Pvt Ltd', amount: '₹4,256.93', status: 'Paid' },
  ];

  const Section = ({ title, children, searchPlaceholder }) => (
    <div className="bg-white rounded-lg shadow-sm mb-6">
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="text-lg font-semibold text-blue-800">{title}</h3>
        <button className="text-blue-600 hover:bg-blue-50 p-1 rounded">
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input 
              type="text" 
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 flex items-center gap-2 border rounded-lg px-3 py-2 bg-white">
              <Calendar className="w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="dd-mm-yyyy"
                className="outline-none text-sm w-full"
              />
            </div>
            <div className="flex-1 flex items-center gap-2 border rounded-lg px-3 py-2 bg-white">
              <Calendar className="w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="dd-mm-yyyy"
                className="outline-none text-sm w-full"
              />
            </div>
        </div>
        {children}
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold mb-6 text-gray-800">Account Payable</h1>
      
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-blue-800">Finance Dashboard</h2>
        <p className="text-blue-500 text-sm">Comprehensive view of all financial transactions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.color} rounded-xl p-6 text-white shadow-lg relative overflow-hidden flex items-center justify-between`}>
            <div className="relative z-10">
              <p className="text-sm font-medium opacity-90 mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold">{stat.amount}</h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <div className={`w-6 h-6 rounded-full border-2 border-white`}></div>
            </div>
          </div>
        ))}
      </div>

      <Section title="Employee Salary" searchPlaceholder="Search payroll...">
        <div className="text-center py-8 text-gray-400 text-sm">
          No payroll records found
        </div>
      </Section>

      <Section title="Raw Material Purchases" searchPlaceholder="Search purchases...">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 w-10"></th>
                <th className="px-4 py-3">RECEIPT NO</th>
                <th className="px-4 py-3">DATE</th>
                <th className="px-4 py-3">SUPPLIER</th>
                <th className="px-4 py-3 text-right">AMOUNT</th>
                <th className="px-4 py-3 text-center">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {rawMaterialData.map((item, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-700">{item.receiptNo}</td>
                  <td className="px-4 py-3 text-gray-500">{item.date}</td>
                  <td className="px-4 py-3 text-gray-600">{item.supplier}</td>
                  <td className="px-4 py-3 text-right font-medium">{item.amount}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full font-bold">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-bold text-gray-700">
                <td colSpan="4" className="px-4 py-3 text-left pl-14">Total:</td>
                <td className="px-4 py-3 text-right">₹22,20,782.32</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Other Expencess" searchPlaceholder="Search invoices...">
        <div className="text-center py-8 text-gray-400 text-sm">
          No invoice records found
        </div>
      </Section>
    </div>
  );
}
