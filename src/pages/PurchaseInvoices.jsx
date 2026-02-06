import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Trash2, 
  Eye, 
  Download,
  Calendar,
  Save,
  RefreshCw,
  FileText,
  X
} from 'lucide-react';

export default function PurchaseInvoices() {
  const [view, setView] = useState('list'); // 'list' or 'create'
  
  const [products, setProducts] = useState([
    { id: 1, commodity: '', unit: 'kg', quantity: '', rate: '', amount: '', gstAmount: '0.00', gstRate: '0.00', total: '0.00' }
  ]);

  const addProduct = () => {
    setProducts([...products, { id: products.length + 1, commodity: '', unit: 'kg', quantity: '', rate: '', amount: '', gstAmount: '0.00', gstRate: '0.00', total: '0.00' }]);
  };

  const removeProduct = (id) => {
    if (products.length > 1) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  if (view === 'create') {
    return (
      <div className="p-6 bg-white min-h-screen">
        <h1 className="text-xl font-bold mb-6 text-gray-800">Purchase Invoices</h1>
        <p className="text-sm text-gray-500 mb-6">Manage all purchase transactions</p>

        {/* Create New Invoice Section */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800">Create New Invoice</h2>
        </div>
        
        <div className="space-y-8">
          {/* Receipt Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Receipt Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Receipt Number*</label>
                <input type="text" className="w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Date*</label>
                <input type="date" defaultValue="2026-02-03" className="w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">Warehouse*</label>
                <select className="w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none bg-white">
                  <option>Select Warehouse</option>
                  <option>Main Warehouse</option>
                </select>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Personal Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Full Name*</label>
                <input type="text" className="w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Phone*</label>
                <input type="tel" className="w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Address</label>
                <input type="text" className="w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Product Details */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-gray-700">Product Details</h3>
              <button onClick={addProduct} className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded hover:bg-blue-100 flex items-center gap-1 font-medium">
                <Plus className="w-3 h-3" /> Add Product
              </button>
            </div>
            
            <div className="overflow-x-auto border rounded-lg">
              <table className="w-full min-w-[1000px]">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                  <tr>
                    <th className="px-4 py-3 text-left w-12">SL NO</th>
                    <th className="px-4 py-3 text-left">COMMODITY</th>
                    <th className="px-4 py-3 text-left w-24">UNIT</th>
                    <th className="px-4 py-3 text-left w-24">QUANTITY</th>
                    <th className="px-4 py-3 text-left w-24">RATE</th>
                    <th className="px-4 py-3 text-left w-32">AMOUNT</th>
                    <th className="px-4 py-3 text-left w-32">GST AMOUNT</th>
                    <th className="px-4 py-3 text-left w-24">GST RATE (%)</th>
                    <th className="px-4 py-3 text-left w-32">TOTAL (WITH GST)</th>
                    <th className="px-4 py-3 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {products.map((product, index) => (
                    <tr key={product.id}>
                      <td className="px-4 py-2 text-center text-sm">{index + 1}</td>
                      <td className="px-4 py-2">
                        <input type="text" className="w-full px-2 py-1 border rounded focus:ring-1 focus:ring-blue-500 outline-none" />
                      </td>
                      <td className="px-4 py-2">
                        <select className="w-full px-2 py-1 border rounded focus:ring-1 focus:ring-blue-500 outline-none bg-white">
                          <option>kg</option>
                          <option>pcs</option>
                        </select>
                      </td>
                      <td className="px-4 py-2">
                        <input type="text" className="w-full px-2 py-1 border rounded focus:ring-1 focus:ring-blue-500 outline-none" />
                      </td>
                      <td className="px-4 py-2">
                        <input type="text" className="w-full px-2 py-1 border rounded focus:ring-1 focus:ring-blue-500 outline-none" />
                      </td>
                      <td className="px-4 py-2">
                        <input type="text" className="w-full px-2 py-1 border rounded focus:ring-1 focus:ring-blue-500 outline-none" />
                      </td>
                      <td className="px-4 py-2">
                        <input type="text" defaultValue="0.00" className="w-full px-2 py-1 border rounded focus:ring-1 focus:ring-blue-500 outline-none" />
                      </td>
                      <td className="px-4 py-2">
                        <input type="text" defaultValue="0.00" className="w-full px-2 py-1 border rounded focus:ring-1 focus:ring-blue-500 outline-none" />
                      </td>
                      <td className="px-4 py-2">
                        <input type="text" defaultValue="0.00" className="w-full px-2 py-1 border rounded focus:ring-1 focus:ring-blue-500 outline-none" />
                      </td>
                      <td className="px-4 py-2">
                        <button onClick={() => removeProduct(product.id)} className="text-red-500 hover:bg-red-50 p-1 rounded">
                          <X className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-between items-center bg-blue-50/50 p-4 rounded-lg mt-6">
                <span className="text-sm font-medium text-gray-700">Total Amount (including GST):</span>
                <span className="text-xl font-bold text-gray-800">₹ 0.00</span>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-6 border-t">
            <button 
              onClick={() => setView('list')}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 text-sm font-medium"
            >
              Reset
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2 text-sm font-medium">
              <Save className="w-4 h-4" /> Save Invoice
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-xl font-bold mb-6 text-gray-800">Purchase Invoices</h1>
      <p className="text-sm text-gray-500 mb-6">Manage all purchase transactions</p>

      {/* Purchase Invoices Stats */}
      <div className="bg-white rounded-lg border mb-6 p-6">
        <div className="flex justify-between items-center mb-6">
            <div></div>
            <div className="flex gap-4">
                <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search invoices..."
                        className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 w-64"
                    />
                </div>
                <button 
                    onClick={() => setView('create')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 text-sm font-medium"
                >
                    <Plus className="w-4 h-4" />
                    New Invoice
                </button>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-xl p-4 flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-xs font-medium">Total Invoices</p>
                    <h3 className="text-xl font-bold mt-1">26</h3>
                </div>
                <div className="bg-blue-100 p-2 rounded-full">
                    <FileText className="w-4 h-4 text-blue-600" />
                </div>
            </div>
            <div className="border rounded-xl p-4 flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-xs font-medium">Today's Invoices</p>
                    <h3 className="text-xl font-bold mt-1">0</h3>
                </div>
                <div className="bg-green-100 p-2 rounded-full">
                    <Calendar className="w-4 h-4 text-green-600" />
                </div>
            </div>
            <div className="border rounded-xl p-4 flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-xs font-medium">Total Amount</p>
                    <h3 className="text-xl font-bold mt-1">₹ 2220782.33</h3>
                </div>
                <div className="bg-purple-100 p-2 rounded-full">
                    <span className="w-4 h-4 flex items-center justify-center font-bold text-purple-600 text-xs">₹</span>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
}
