import { useState } from 'react';
import { Search, Filter, FileDown, Plus, Package, MapPin, Hash, X, AlertTriangle, Calendar } from 'lucide-react';

export default function WarehouseManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filterRange, setFilterRange] = useState({ from: '', to: '' });
  const [warehouses] = useState([]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExport = () => {
    if (!warehouses || warehouses.length === 0) {
      console.log('No data to export');
      return;
    }
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
          </div>
        </div>
      </div>
      
      {/* Add New Warehouse Modal */}
      {showModal && (
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
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end gap-3 pt-4 border-t">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border border-input hover:bg-accent transition-colors font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium flex items-center gap-2 text-sm"
                >
                  Save Warehouse
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}