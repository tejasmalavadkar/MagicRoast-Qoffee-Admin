import { useState } from 'react';
import { Package, DollarSign, Calendar, FileText, Plus, Minus } from 'lucide-react';

function LegacyPurchaseInvoicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([
    { id: 1, name: '', quantity: 0, price: 0, gstRate: 0, gstAmount: 0, total: 0 }
  ]);

  const addProduct = () => {
    setProducts([...products, { id: products.length + 1, name: '', quantity: 0, price: 0, gstRate: 0, gstAmount: 0, total: 0 }]);
  };

  const removeProduct = (id) => {
    if (products.length > 1) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const updateProduct = (id, field, value) => {
    setProducts(products.map(product => {
      if (product.id === id) {
        const updatedProduct = { ...product, [field]: value };
        
        if (field === 'quantity' || field === 'price' || field === 'gstRate') {
          const quantity = field === 'quantity' ? Number(value) : product.quantity;
          const price = field === 'price' ? Number(value) : product.price;
          const gstRate = field === 'gstRate' ? Number(value) : product.gstRate;
          
          const subtotal = quantity * price;
          const gstAmount = (subtotal * gstRate) / 100;
          const total = subtotal + gstAmount;
          
          updatedProduct.subtotal = subtotal;
          updatedProduct.gstAmount = gstAmount;
          updatedProduct.total = total;
        }
        
        return updatedProduct;
      }
      return product;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Purchase Invoices</h1>
              <p className="text-gray-600 mt-1">Manage all purchase transactions</p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Invoices</p>
                <p className="text-2xl font-bold text-gray-800">89</p>
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
                <p className="text-2xl font-bold text-gray-800">7</p>
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
                <p className="text-2xl font-bold text-gray-800">$18,340</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Create New Invoice Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Invoice</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Receipt Information */}
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-3">Receipt Information</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Receipt Number</label>
                  <input
                    type="text"
                    placeholder="REC-001"
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

            {/* Warehouse Selection */}
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-3">Warehouse</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Warehouse</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                    <option>Select a warehouse</option>
                    <option>Central Warehouse</option>
                    <option>East Coast Facility</option>
                    <option>West Coast Hub</option>
                    <option>South Regional</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-gray-700 mb-3">Supplier Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Name</label>
                <input
                  type="text"
                  placeholder="Supplier Company Name"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                <input
                  type="text"
                  placeholder="Contact Person Name"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="supplier@example.com"
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
                    <th className="text-left py-2 px-4 font-medium text-gray-700">GST Rate (%)</th>
                    <th className="text-left py-2 px-4 font-medium text-gray-700">GST Amount</th>
                    <th className="text-left py-2 px-4 font-medium text-gray-700">Total</th>
                    <th className="text-left py-2 px-4 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="py-2 px-4">
                        <input
                          type="text"
                          placeholder="Product name"
                          value={product.name}
                          onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                          className="w-full p-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      </td>
                      <td className="py-2 px-4">
                        <input
                          type="number"
                          placeholder="0"
                          value={product.quantity}
                          onChange={(e) => updateProduct(product.id, 'quantity', e.target.value)}
                          className="w-full p-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      </td>
                      <td className="py-2 px-4">
                        <input
                          type="number"
                          placeholder="0.00"
                          value={product.price}
                          onChange={(e) => updateProduct(product.id, 'price', e.target.value)}
                          className="w-full p-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      </td>
                      <td className="py-2 px-4">
                        <input
                          type="number"
                          placeholder="0"
                          value={product.gstRate}
                          onChange={(e) => updateProduct(product.id, 'gstRate', e.target.value)}
                          className="w-full p-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      </td>
                      <td className="py-2 px-4">${product.gstAmount.toFixed(2)}</td>
                      <td className="py-2 px-4">${product.total.toFixed(2)}</td>
                      <td className="py-2 px-4">
                        <button 
                          onClick={() => removeProduct(product.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button 
              onClick={addProduct}
              className="mt-2 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>

          {/* Payment Information */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-gray-700 mb-3">Payment Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                  <option>Bank Transfer</option>
                  <option>Credit Card</option>
                  <option>Debit Card</option>
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

          {/* Payment Schedule */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-gray-700 mb-3">Payment Schedule</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Date</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
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
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Invoice List</h3>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mb-4" />
            <h4 className="text-lg font-medium text-gray-600 mb-2">No purchase invoices found</h4>
            <p className="text-gray-500 mb-4">Create your first purchase invoice to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default function PurchaseInvoicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border rounded-xl p-8 text-center text-gray-500">
          This page has been cleaned. Please use the current Purchase Invoices page.
        </div>
      </div>
    </div>
  );
}
