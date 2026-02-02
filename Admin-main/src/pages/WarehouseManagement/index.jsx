import { useState } from 'react';
import { Download, Plus, Eye, Edit, Trash2, Package, MapPin, Hash, X } from 'lucide-react';

export default function WarehouseManagementPage() {
  const [warehouses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    location: '',
    city: '',
    state: '',
    country: '',
    capacity: '',
    manager: ''
  });

  const handleDelete = (id) => {
    console.log(`Delete warehouse ${id}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Warehouse submitted:', formData);
    setShowModal(false);
    // Reset form
    setFormData({
      id: '',
      name: '',
      location: '',
      city: '',
      state: '',
      country: '',
      capacity: '',
      manager: ''
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Warehouse</h1>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Card Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Warehouse Management</h2>
              
              <div className="flex gap-3">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                  <Download className="w-4 h-4" />
                  Export Data
                </button>
                
                <button 
                  onClick={() => setShowModal(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                  <Plus className="w-4 h-4" />
                  Add Warehouse
                </button>
              </div>
            </div>

            {/* Warehouse Table or Empty State */}
            {warehouses.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">ID</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Location</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Purchase Stock</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Capacity (kg)</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {warehouses.map((warehouse) => (
                      <tr key={warehouse.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-800">
                          <div className="flex items-center gap-2">
                            <Hash className="w-4 h-4 text-gray-500" />
                            {warehouse.id}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-blue-500" />
                            {warehouse.name}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-green-500" />
                            {warehouse.location}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${warehouse.purchaseStock}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-700">{warehouse.purchaseStock}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600 font-medium">{warehouse.capacity}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <button className="text-blue-600 hover:text-blue-800 p-1">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-800 p-1">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              className="text-red-600 hover:text-red-800 p-1"
                              onClick={() => handleDelete(warehouse.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <Package className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No warehouses found</h3>
                <p className="text-gray-500 mb-6">Add a new warehouse to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Add New Warehouse Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Add New Warehouse</h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Modal Form */}
            <form onSubmit={handleSubmit}>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Row 1 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Warehouse ID</label>
                    <input
                      type="text"
                      name="id"
                      value={formData.id}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  
                  {/* Row 2 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  
                  {/* Row 3 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  
                  {/* Row 4 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacity (kg)*</label>
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Manager Name</label>
                    <input
                      type="text"
                      name="manager"
                      value={formData.manager}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>
              
              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Save Warehouse
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}