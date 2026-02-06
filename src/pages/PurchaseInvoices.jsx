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
<<<<<<< HEAD
  FileText,
  X
=======
  ShoppingCart,
  ArrowRightLeft,
  X,
  ChevronDown,
  FileText
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
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

<<<<<<< HEAD
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
=======
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
      <div className="p-6 bg-background min-h-screen">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-foreground">Create New Invoice</h2>
        </div>
        
        <div className="space-y-8">
          {/* Invoice Information */}
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Receipt Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Receipt Number*</label>
                <input type="text" className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Date*</label>
                <input type="date" defaultValue="2026-02-03" className="input-field" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-foreground mb-1">Warehouse*</label>
                <select className="input-field bg-background">
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
                  <option>Select Warehouse</option>
                  <option>Main Warehouse</option>
                </select>
              </div>
            </div>
          </div>

<<<<<<< HEAD
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
=======
          <hr className="border-border" />

          {/* Personal Information */}
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Supplier Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Supplier Name*</label>
                <input type="text" className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Email</label>
                <input type="email" className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Phone*</label>
                <input type="tel" className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Address</label>
                <input type="text" className="input-field" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">GSTIN</label>
                <input type="text" className="input-field" />
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
              </div>
            </div>
          </div>

<<<<<<< HEAD
          <hr className="border-gray-200" />

          {/* Product Details */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-gray-700">Product Details</h3>
              <button onClick={addProduct} className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded hover:bg-blue-100 flex items-center gap-1 font-medium">
=======
          <hr className="border-border" />

          {/* Product Details */}
          <div className="bg-card rounded-xl border p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-foreground">Product Details</h3>
              <button onClick={addProduct} className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded hover:bg-primary/20 flex items-center gap-1 font-medium">
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
                <Plus className="w-3 h-3" /> Add Product
              </button>
            </div>
            
            <div className="overflow-x-auto border rounded-lg">
              <table className="w-full min-w-[1000px]">
<<<<<<< HEAD
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
=======
                <thead className="bg-muted text-xs text-muted-foreground uppercase">
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
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
<<<<<<< HEAD
                <tbody className="divide-y">
=======
                <tbody className="divide-y divide-border">
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
                  {products.map((product, index) => (
                    <tr key={product.id}>
                      <td className="px-4 py-2 text-center text-sm">{index + 1}</td>
                      <td className="px-4 py-2">
<<<<<<< HEAD
                        <input type="text" className="w-full px-2 py-1 border rounded focus:ring-1 focus:ring-blue-500 outline-none" />
                      </td>
                      <td className="px-4 py-2">
                        <select className="w-full px-2 py-1 border rounded focus:ring-1 focus:ring-blue-500 outline-none bg-white">
=======
                        <input type="text" className="input-field w-full" />
                      </td>
                      <td className="px-4 py-2">
                        <select className="input-field w-full bg-background">
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
                          <option>kg</option>
                          <option>pcs</option>
                        </select>
                      </td>
                      <td className="px-4 py-2">
<<<<<<< HEAD
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
=======
                        <input type="text" className="input-field w-full" />
                      </td>
                      <td className="px-4 py-2">
                        <input type="text" className="input-field w-full" />
                      </td>
                      <td className="px-4 py-2">
                        <input type="text" className="input-field w-full" />
                      </td>
                      <td className="px-4 py-2">
                        <input type="text" defaultValue="0.00" className="input-field w-full" />
                      </td>
                      <td className="px-4 py-2">
                        <input type="text" defaultValue="0.00" className="input-field w-full" />
                      </td>
                      <td className="px-4 py-2">
                        <input type="text" defaultValue="0.00" className="input-field w-full" />
                      </td>
                      <td className="px-4 py-2">
                        <button onClick={() => removeProduct(product.id)} className="text-destructive hover:bg-destructive/10 p-1 rounded">
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
                          <X className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
<<<<<<< HEAD
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
=======
            <div className="flex justify-between items-center bg-primary/10 p-4 rounded-lg mt-6">
                <span className="text-sm font-medium text-foreground">Total Amount (including GST):</span>
                <span className="text-xl font-bold text-foreground">₹ 0.00</span>
            </div>
          </div>

          <hr className="border-border" />

          {/* Payment Information */}
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Payment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Payment Terms</label>
                <select className="input-field bg-background">
                  <option>Full Payment</option>
                  <option>Partial Payment</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Payment Method</label>
                <select className="input-field bg-background">
                  <option>Cash</option>
                  <option>Online</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Received Amount</label>
                <input type="number" defaultValue="0.00" className="input-field bg-muted" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Remaining Amount</label>
                <input type="number" defaultValue="0.00" readOnly className="input-field bg-muted" />
              </div>
            </div>
          </div>

          {/* Payment Schedule */}
          <div className="bg-card rounded-xl border p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Payment Schedule</h3>
            <div className="grid grid-cols-12 gap-4 items-end bg-muted p-4 rounded-lg border">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-foreground mb-1">Date</label>
                <input type="date" defaultValue="2026-02-03" className="input-field text-sm" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-foreground mb-1">Amount*</label>
                <input type="number" className="input-field text-sm" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-foreground mb-1">Method</label>
                <select className="input-field text-sm bg-background">
                  <option>Cash</option>
                  <option>Online</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-foreground mb-1">Status</label>
                <select className="input-field text-sm bg-background">
                  <option>Pending</option>
                  <option>Paid</option>
                </select>
              </div>
              <div className="col-span-3">
                <label className="block text-xs font-medium text-foreground mb-1">Description</label>
                <input type="text" className="input-field text-sm" />
              </div>
              <div className="col-span-1">
                <button className="w-full btn-primary text-sm">Add</button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-border">
            <button 
              onClick={() => setView('list')}
              className="btn-secondary text-sm font-medium"
            >
              Reset
            </button>
            <button className="btn-primary flex items-center gap-2 text-sm font-medium">
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
              <Save className="w-4 h-4" /> Save Invoice
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
<<<<<<< HEAD
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
=======
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <div className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Purchase Invoices</h1>
              <p className="text-muted-foreground mt-1">Manage your purchase invoices</p>
            </div>
            <button 
              onClick={() => setView('create')}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Invoice
            </button>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-card rounded-xl border">
        {/* Header Section */}
        <div className="p-6 border-b">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Section Header */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Purchase Invoices</h2>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search invoices..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-input rounded-lg hover:bg-accent transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="p-6 border-b">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-xs font-medium">Total Invoices</p>
                <h3 className="text-xl font-bold mt-1">26</h3>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <FileText className="w-4 h-4 text-primary" />
              </div>
            </div>
            <div className="border rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-xs font-medium">Today's Invoices</p>
                <h3 className="text-xl font-bold mt-1">0</h3>
              </div>
              <div className="bg-success/10 p-2 rounded-full">
                <Calendar className="w-4 h-4 text-success" />
              </div>
            </div>
            <div className="border rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-xs font-medium">Total Amount</p>
                <h3 className="text-xl font-bold mt-1">₹ 2220782.33</h3>
              </div>
              <div className="bg-purple-100 p-2 rounded-full">
                <span className="w-4 h-4 flex items-center justify-center font-bold text-purple-600 text-xs">₹</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Lead Orders */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-foreground">Pending Lead Orders</h3>
            <button className="text-primary text-sm font-medium flex items-center gap-1">
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
          </div>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <ShoppingCart className="w-12 h-12 text-muted-foreground mb-3" />
            <h4 className="text-lg font-medium text-foreground mb-1">No pending orders</h4>
            <p className="text-muted-foreground">All orders have been processed</p>
          </div>
        </div>

        {/* Online Sales Orders */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-foreground">Online Sales Orders</h3>
            <button className="text-primary text-sm font-medium flex items-center gap-1">
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-xs text-muted-foreground uppercase">
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
              <tbody className="divide-y divide-border">
                {onlineOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/20">
                    <td className="px-6 py-4 font-medium text-foreground">{order.id}</td>
                    <td className="px-6 py-4">
                      <div className="text-foreground">{order.customer}</div>
                      <div className="text-sm text-muted-foreground">{order.email}</div>
                    </td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4 text-muted-foreground">{order.date}</td>
                    <td className="px-6 py-4 text-foreground font-medium">{order.amount}</td>
                    <td className="px-6 py-4 text-muted-foreground">{order.payment}</td>
                    <td className="px-6 py-4">
                      <button className="flex items-center gap-1 text-primary bg-primary/10 px-3 py-1.5 rounded text-sm font-medium hover:bg-primary/20">
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
    </div>
  );
}
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
