import { useState } from 'react';
<<<<<<< HEAD
import { Download, Plus, Eye, Edit, Trash2, Package, MapPin, Hash, X } from 'lucide-react';

export default function WarehouseManagementPage() {
  const [warehouses] = useState([]);
  const [showModal, setShowModal] = useState(false);
=======
import { Search, Filter, FileDown, Plus, Package, MapPin, Hash, X, AlertTriangle, Calendar } from 'lucide-react';

export default function WarehouseManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filterRange, setFilterRange] = useState({ from: '', to: '' });
  const [warehouses] = useState([]);

>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
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

<<<<<<< HEAD
  const handleDelete = (id) => {
    console.log(`Delete warehouse ${id}`);
  };

=======
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

<<<<<<< HEAD
=======
  const handleExport = () => {
    if (!warehouses || warehouses.length === 0) {
      console.log('No data to export');
      return;
    }
  };

>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
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
<<<<<<< HEAD
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
=======
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <div className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Warehouse</h1>
              <p className="text-muted-foreground mt-1">Manage your warehouses</p>
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Warehouse
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
                <Package className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Warehouse Management</h2>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name, location or manager…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 relative">
              <button
                onClick={() => setShowFilters(prev => !prev)}
                className="flex items-center gap-2 px-4 py-2 border border-input rounded-lg hover:bg-accent transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 border border-input rounded-lg hover:bg-accent transition-colors"
              >
                <FileDown className="w-4 h-4" />
                Export
              </button>

              {showFilters && (
                <div className="absolute top-12 right-0 bg-card border rounded-xl shadow-lg w-72 z-10">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-semibold text-foreground">Date Range</p>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">From</label>
                        <div className="relative">
                          <input
                            type="date"
                            value={filterRange.from}
                            onChange={(e) => setFilterRange(r => ({ ...r, from: e.target.value }))}
                            className="w-full pl-3 pr-9 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                          />
                          <Calendar className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-muted-foreground mb-1">To</label>
                        <div className="relative">
                          <input
                            type="date"
                            value={filterRange.to}
                            onChange={(e) => setFilterRange(r => ({ ...r, to: e.target.value }))}
                            className="w-full pl-3 pr-9 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                          />
                          <Calendar className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="p-12">
          <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
              <Package className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">You haven't added any warehouses yet</h3>
            <p className="text-muted-foreground">Add your first warehouse to get started</p>
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
          </div>
        </div>
      </div>
      
      {/* Add New Warehouse Modal */}
      {showModal && (
<<<<<<< HEAD
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
=======
        <div className="fixed inset-0 bg-[#2F190E80] z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl border shadow-2xl w-full max-w-2xl flex flex-col max-h-[80vh] mt-auto mb-8">
            {/* Modal Header - MATCHING APPLY LEAVE FORM HEADER */}
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Add New Warehouse</h2>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full hover:bg-accent transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Form - COMPACT PADDING */}
            <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 bg-gradient-to-br from-card/50 to-card border rounded-xl p-4 mb-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <Package className="w-4 h-4 text-blue-500" />
                    </div>
                    <h3 className="font-semibold text-base text-foreground">Warehouse Information</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-foreground">
                          Warehouse ID
                        </label>
                        <input
                          type="text"
                          name="id"
                          value={formData.id}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1 text-foreground">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-foreground">
                          Location *
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1 text-foreground">
                          Capacity (kg) *
                        </label>
                        <input
                          type="number"
                          name="capacity"
                          value={formData.capacity}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-foreground">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1 text-foreground">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1 text-foreground">
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1 text-foreground">
                        Manager Name
                      </label>
                      <input
                        type="text"
                        name="manager"
                        value={formData.manager}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      />
                    </div>
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
                  </div>
                </div>
              </div>
              
<<<<<<< HEAD
              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
=======
              <div className="mt-4 flex justify-end gap-3 pt-4 border-t">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border border-input hover:bg-accent transition-colors font-medium text-sm"
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
                >
                  Cancel
                </button>
                <button
                  type="submit"
<<<<<<< HEAD
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
=======
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium flex items-center gap-2 text-sm"
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
                >
                  Save Warehouse
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
<<<<<<< HEAD
    </>
=======
    </div>
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
  );
}