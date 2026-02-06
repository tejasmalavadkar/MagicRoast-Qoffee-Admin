import { useState } from 'react';
import { Calendar, DollarSign, Users, Package, FileText } from 'lucide-react';

function LegacyFinanceDashboardPage() {
  const [employeeSalaryDate, setEmployeeSalaryDate] = useState('');
  const [rawMaterialDate, setRawMaterialDate] = useState('');

  const rawMaterials = [
    { id: 1, supplier: 'ABC Suppliers', material: 'Coffee Beans', quantity: '100 kg', rate: '$15/kg', total: '$1,500' },
    { id: 2, supplier: 'XYZ Trading', material: 'Milk Cartons', quantity: '500 units', rate: '$2/unit', total: '$1,000' },
    { id: 3, supplier: 'DEF Distributors', material: 'Sugar Bags', quantity: '200 kg', rate: '$3/kg', total: '$600' },
    { id: 4, supplier: 'GHI Imports', material: 'Cups & Lids', quantity: '1000 sets', rate: '$0.50/set', total: '$500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Finance Dashboard</h1>
          <p className="text-gray-600 mt-2">Comprehensive view of all financial transactions</p>
        </div>

        {/* Gradient Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Employee Salary Total</p>
                <p className="text-2xl font-bold mt-1">$45,670</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Raw Material Purchase Total</p>
                <p className="text-2xl font-bold mt-1">$18,500</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Package className="w-6 h-6" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Other Expenses Total</p>
                <p className="text-2xl font-bold mt-1">$12,340</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <FileText className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Employee Salary Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Employee Salary</h3>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={employeeSalaryDate}
                  onChange={(e) => setEmployeeSalaryDate(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition w-full max-w-xs"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Monthly Salaries</span>
                <span className="font-semibold text-gray-800">$32,450</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Bonuses</span>
                <span className="font-semibold text-gray-800">$8,220</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Benefits</span>
                <span className="font-semibold text-gray-800">$5,000</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border-t-2 border-blue-200">
                <span className="font-semibold text-gray-800">Total</span>
                <span className="font-bold text-blue-600 text-lg">$45,670</span>
              </div>
            </div>
          </div>

          {/* Raw Material Purchases Table */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Raw Material Purchases</h3>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={rawMaterialDate}
                  onChange={(e) => setRawMaterialDate(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition w-full max-w-xs"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 font-medium text-gray-700">Supplier</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-700">Material</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-700">Qty</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-700">Rate</th>
                    <th className="text-left py-2 px-3 font-medium text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {rawMaterials.map((material) => (
                    <tr key={material.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-2 px-3 text-gray-700">{material.supplier}</td>
                      <td className="py-2 px-3 text-gray-700">{material.material}</td>
                      <td className="py-2 px-3 text-gray-700">{material.quantity}</td>
                      <td className="py-2 px-3 text-gray-700">{material.rate}</td>
                      <td className="py-2 px-3 font-semibold text-gray-800">{material.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">Total</span>
                <span className="font-bold text-lg text-blue-600">$3,600</span>
              </div>
            </div>
          </div>
        </div>

        {/* Other Expenses Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Other Expenses</h3>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mb-4" />
            <h4 className="text-lg font-medium text-gray-600 mb-2">No other expenses recorded</h4>
            <p className="text-gray-500 mb-4">Add new expenses to track miscellaneous costs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default function FinanceDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border rounded-xl p-8 text-center text-gray-500">
          This page has been cleaned. Please use the current Finance Dashboard page.
        </div>
      </div>
    </div>
  );
}
