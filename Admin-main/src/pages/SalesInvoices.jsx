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
  ShoppingCart,
  ArrowRightLeft,
  X,
  ChevronDown
} from 'lucide-react';

export default function SalesInvoices() {
  const [view, setView] = useState('list'); // 'list' or 'create'
  
  const [products, setProducts] = useState([
    { id: 1, description: '', hsn: '', quantity: '', rate: '', amount: '', cgst: '2.5', sgst: '2.5', total: '' }
  ]);

  const addProduct = () => {
    setProducts([...products, { id: products.length + 1, description: '', hsn: '', quantity: '', rate: '', amount: '', cgst: '2.5', sgst: '2.5', total: '' }]);
  };

  const removeProduct = (id) => {
    if (products.length > 1) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const onlineOrders = [
    {
      id: '#ORD-251126-1100',
      customer: 'Harshal Papal',
      email: 'harshalpapal16@gmail.com',
      date: 'Nov 26, 2025',
      amount: '₹477.79',
      payment: 'Cash On Delivery'
    }
  ];

  if (view === 'create') {
    return (
      <div className="p-6 bg-white min-h-screen">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800">Create New Invoice</h2>
        </div>
        
        <div className="space-y-8">
          {/* Invoice Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Invoice Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Invoice Number*</label>
                <input type="text" defaultValue="MQ/26/02/01" className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Invoice Date*</label>
                <input type="date" defaultValue="2026-02-03" className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">Warehouse*</label>
                <select className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-1 focus:ring-blue-500 outline-none bg-white">
                  <option>Select Warehouse</option>
                  <option>Main Warehouse</option>
                </select>
              </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Customer Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Customer Name*</label>
                <input type="text" className="w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Customer Email</label>
                <input type="email" className="w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Customer Phone*</label>
                <input type="tel" className="w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Customer Address</label>
                <input type="text" className="w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Customer GSTIN</label>
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
                    <th className="px-4 py-3 text-left">DESCRIPTION</th>
                    <th className="px-4 py-3 text-left w-24">HSN</th>
                    <th className="px-4 py-3 text-left w-24">QTY</th>
                    <th className="px-4 py-3 text-left w-24">RATE</th>
                    <th className="px-4 py-3 text-left w-32">AMOUNT</th>
                    <th className="px-4 py-3 text-left w-20">CGST %</th>
                    <th className="px-4 py-3 text-left w-20">SGST %</th>
                    <th className="px-4 py-3 text-left w-32">TOTAL</th>
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
                        <input type="text" className="w-full px-2 py-1 border rounded focus:ring-1 focus:ring-blue-500 outline-none" />
                      </td>
                      <td className="px-4 py-2">
                        <input type="number" className="w-full px-2 py-1 border rounded focus:ring-1 focus:ring-blue-500 outline-none" />
                      </td>
                      <td className="px-4 py-2">
                        <input type="number" className="w-full px-2 py-1 border rounded focus:ring-1 focus:ring-blue-500 outline-none" />
                      </td>
                      <td className="px-4 py-2">
                        <input type="text" readOnly className="w-full px-2 py-1 bg-gray-50 border rounded outline-none" />
                      </td>
                      <td className="px-4 py-2">
                        <input type="text" defaultValue="2.5" className="w-full px-2 py-1 border rounded focus:ring-1 focus:ring-blue-500 outline-none" />
                      </td>
                      <td className="px-4 py-2">
                        <input type="text" defaultValue="2.5" className="w-full px-2 py-1 border rounded focus:ring-1 focus:ring-blue-500 outline-none" />
                      </td>
                      <td className="px-4 py-2">
                        <input type="text" readOnly className="w-full px-2 py-1 bg-gray-50 border rounded outline-none" />
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
            
            <div className="grid grid-cols-2 gap-8 mt-6">
                <div></div>
                <div className="space-y-3 bg-blue-50/50 p-6 rounded-lg">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Sub Total:</span>
                        <span className="font-semibold">₹ 0</span>
                    </div>
                    <div className="flex justify-between text-sm items-center">
                        <span className="text-gray-600">Discount Amount</span>
                        <input type="text" className="w-32 px-2 py-1 border rounded bg-white" defaultValue="0" />
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total GST:</span>
                        <span className="font-semibold">₹ 0</span>
                    </div>
                    <div className="flex justify-between text-base font-bold pt-3 border-t">
                        <span className="text-gray-800">Net Total:</span>
                        <div className="text-right">
                            <div>₹ 0</div>
                            <div className="text-xs font-normal text-gray-500">(Zero)</div>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Payment Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Payment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Payment Terms</label>
                <select className="w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none bg-white">
                  <option>Full Payment</option>
                  <option>Partial Payment</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Payment Method</label>
                <select className="w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none bg-white">
                  <option>Cash</option>
                  <option>Online</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Received Amount</label>
                <input type="number" defaultValue="0.00" className="w-full px-4 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 outline-none bg-gray-50" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Remaining Amount</label>
                <input type="number" defaultValue="0.00" readOnly className="w-full px-4 py-2 bg-gray-50 border rounded-md outline-none" />
              </div>
            </div>
          </div>

          {/* Payment Schedule */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Payment Schedule</h3>
            <div className="grid grid-cols-12 gap-4 items-end bg-gray-50 p-4 rounded-lg border">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
                <input type="date" defaultValue="2026-02-03" className="w-full px-3 py-1.5 border rounded text-sm" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">Amount*</label>
                <input type="number" className="w-full px-3 py-1.5 border rounded text-sm" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">Method</label>
                <select className="w-full px-3 py-1.5 border rounded text-sm bg-white">
                  <option>Cash</option>
                  <option>Online</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                <select className="w-full px-3 py-1.5 border rounded text-sm bg-white">
                  <option>Pending</option>
                  <option>Paid</option>
                </select>
              </div>
              <div className="col-span-3">
                <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                <input type="text" className="w-full px-3 py-1.5 border rounded text-sm" />
              </div>
              <div className="col-span-1">
                <button className="w-full bg-blue-600 text-white py-1.5 rounded text-sm hover:bg-blue-700">Add</button>
              </div>
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold mb-6 text-gray-800">Sales Stock Invoice</h1>

      {/* Sales Invoices Stats */}
      <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">Sales Invoices</h2>
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
                    <h3 className="text-xl font-bold mt-1">4</h3>
                </div>
                <div className="bg-blue-100 p-2 rounded-full">
                    <Save className="w-4 h-4 text-blue-600" />
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
                    <h3 className="text-xl font-bold mt-1">₹ 2565</h3>
                </div>
                <div className="bg-purple-100 p-2 rounded-full">
                    <span className="w-4 h-4 flex items-center justify-center font-bold text-purple-600 text-xs">₹</span>
                </div>
            </div>
        </div>
      </div>

      {/* Pending Lead Orders */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-base font-bold text-gray-800">Pending Lead Orders</h3>
            <button className="text-blue-500 text-xs font-medium">Refresh</button>
        </div>
        <div className="p-12 flex flex-col items-center justify-center text-gray-400">
            <ShoppingCart className="w-8 h-8 mb-2 opacity-20" />
            <p className="text-xs">No pending orders</p>
        </div>
      </div>

      {/* Online Sales Orders */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-base font-bold text-gray-800">Online Sales Orders</h3>
            <button className="text-blue-500 text-xs font-medium">Refresh</button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                    <tr>
                        <th className="px-6 py-3">ORDER ID</th>
                        <th className="px-6 py-3">CUSTOMER</th>
                        <th className="px-6 py-3">PRODUCTS</th>
                        <th className="px-6 py-3">ORDER DATE</th>
                        <th className="px-6 py-3">TOTAL AMOUNT</th>
                        <th className="px-6 py-3">PAYMENT METHOD</th>
                        <th className="px-6 py-3">ACTIONS</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {onlineOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-xs text-gray-900">{order.id}</td>
                            <td className="px-6 py-4">
                                <div className="text-xs font-medium text-gray-900">{order.customer}</div>
                                <div className="text-xs text-gray-500">{order.email}</div>
                            </td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4 text-xs text-gray-500">{order.date}</td>
                            <td className="px-6 py-4 text-xs font-medium text-gray-900">{order.amount}</td>
                            <td className="px-6 py-4 text-xs text-gray-500">{order.payment}</td>
                            <td className="px-6 py-4">
                                <button className="flex items-center gap-1 text-blue-600 bg-blue-50 px-3 py-1.5 rounded text-xs font-medium hover:bg-blue-100">
                                    <ArrowRightLeft className="w-3 h-3" />
                                    Convert to Invoice
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
