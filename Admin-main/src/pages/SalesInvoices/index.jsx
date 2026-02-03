import React from 'react';

export default function SalesInvoicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border rounded-xl p-8 text-center text-gray-500">
          This page has been cleaned. Please use the current Sales Invoices page.
        </div>
      </div>
    </div>
  );
}
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
