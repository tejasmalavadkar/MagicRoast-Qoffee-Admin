import { useState } from 'react';
import { Upload, Plus, Minus, Image, Video, Star, Package, Tag, ShoppingCart, Percent } from 'lucide-react';

export default function ECommerceAdminPage() {
  const [activeTab, setActiveTab] = useState('products');
  const [categories, setCategories] = useState(['Electronics', 'Clothing', 'Home & Kitchen', 'Books']);
  const [newCategory, setNewCategory] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    weight: '',
    rating: 0,
    discount: '',
    category: '',
    stock: '',
    dimensions: { length: '', width: '', height: '' },
    features: [''],
    description: ''
  });

  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 199.99,
      weight: '0.5 kg',
      category: 'Electronics',
      variants: 3,
      status: 'Active',
      image: 'https://placehold.co/60x60/e2e8f0/64748b?text=HP'
    },
    {
      id: 2,
      name: 'Cotton T-Shirt',
      price: 29.99,
      weight: '0.2 kg',
      category: 'Clothing',
      variants: 5,
      status: 'Active',
      image: 'https://placehold.co/60x60/e2e8f0/64748b?text=TS'
    },
    {
      id: 3,
      name: 'Coffee Maker',
      price: 89.99,
      weight: '3.2 kg',
      category: 'Home & Kitchen',
      variants: 2,
      status: 'Inactive',
      image: 'https://placehold.co/60x60/e2e8f0/64748b?text=CM'
    },
    {
      id: 4,
      name: 'Programming Book',
      price: 49.99,
      weight: '1.0 kg',
      category: 'Books',
      variants: 1,
      status: 'Active',
      image: 'https://placehold.co/60x60/e2e8f0/64748b?text=PB'
    }
  ];

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, '']
    });
  };

  const removeFeature = (index) => {
    if (formData.features.length > 1) {
      const newFeatures = [...formData.features];
      newFeatures.splice(index, 1);
      setFormData({
        ...formData,
        features: newFeatures
      });
    }
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({
      ...formData,
      features: newFeatures
    });
  };

  const addCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setFormData({ ...formData, category: newCategory.trim() });
      setNewCategory('');
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleDimensionChange = (dimension, value) => {
    setFormData({
      ...formData,
      dimensions: {
        ...formData.dimensions,
        [dimension]: value
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Tabs */}
        <div className="bg-white rounded-lg shadow-sm p-1 mb-6">
          <div className="flex space-x-1">
            {[
              { id: 'products', label: 'Product Management', icon: Package },
              { id: 'coupons', label: 'Coupon Management', icon: Percent },
              { id: 'orders', label: 'Order Management', icon: ShoppingCart },
              { id: 'banners', label: 'Admin Banner', icon: Image }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'products' && (
          <>
            {/* Add New Product Form */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Product</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter product name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="0.00"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                      <input
                        type="text"
                        value={formData.weight}
                        onChange={(e) => handleInputChange('weight', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="e.g., 0.5 kg"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <input
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          value={formData.rating}
                          onChange={(e) => handleInputChange('rating', parseFloat(e.target.value))}
                          className="ml-2 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="0-5"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                      <input
                        type="number"
                        value={formData.discount}
                        onChange={(e) => handleInputChange('discount', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                      <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) => handleInputChange('stock', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <div className="flex gap-2">
                      <select
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <div className="flex gap-1">
                        <input
                          type="text"
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          placeholder="New category"
                          className="w-32 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                        <button
                          onClick={addCategory}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center gap-1 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions (L x W x H)</label>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <input
                          type="text"
                          value={formData.dimensions.length}
                          onChange={(e) => handleDimensionChange('length', e.target.value)}
                          placeholder="Length"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={formData.dimensions.width}
                          onChange={(e) => handleDimensionChange('width', e.target.value)}
                          placeholder="Width"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={formData.dimensions.height}
                          onChange={(e) => handleDimensionChange('height', e.target.value)}
                          placeholder="Height"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image Upload</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Image className="mx-auto w-12 h-12 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Drop your image here or click to browse</p>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto transition-colors">
                        <Upload className="w-4 h-4" />
                        Upload Image
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GIF Upload</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Image className="mx-auto w-12 h-12 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload product GIF</p>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto transition-colors">
                        <Upload className="w-4 h-4" />
                        Upload GIF
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Video Upload</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Video className="mx-auto w-12 h-12 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload product video</p>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto transition-colors">
                        <Upload className="w-4 h-4" />
                        Upload Video
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter product description"
                ></textarea>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder={`Feature ${index + 1}`}
                      />
                      <button
                        onClick={() => removeFeature(index)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addFeature}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Feature
                  </button>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Save Product
                </button>
              </div>
            </div>

            {/* Product List Table */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Product List</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Product</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Price</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Weight</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Variants</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-10 h-10 rounded object-cover"
                            />
                            <span className="font-medium text-gray-800">{product.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-800">${product.price.toFixed(2)}</td>
                        <td className="py-3 px-4 text-gray-600">{product.weight}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {product.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{product.variants}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            product.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {product.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                          <button className="text-red-600 hover:text-red-800">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab !== 'products' && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <ShoppingCart className="mx-auto w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {activeTab === 'coupons' && 'Coupon Management'}
              {activeTab === 'orders' && 'Order Management'}
              {activeTab === 'banners' && 'Admin Banner'}
            </h3>
            <p className="text-gray-500">
              {activeTab === 'coupons' && 'Manage discount coupons and promotions'}
              {activeTab === 'orders' && 'View and manage customer orders'}
              {activeTab === 'banners' && 'Manage promotional banners and ads'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}