import { useState } from 'react';
import { Upload, Plus, Edit, Trash2, Image, Video, FileText, Monitor } from 'lucide-react';

export default function WebsiteAdminPage() {
  const [activeTab, setActiveTab] = useState('carousel');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null
  });

  const carouselItems = [
    {
      id: 1,
      title: 'Summer Collection',
      description: 'Discover our new summer collection with up to 50% off on selected items.',
      image: 'https://placehold.co/300x200/e2e8f0/64748b?text=Summer+Collection'
    },
    {
      id: 2,
      title: 'New Arrivals',
      description: 'Check out our latest arrivals with premium quality and amazing designs.',
      image: 'https://placehold.co/300x200/e2e8f0/64748b?text=New+Arrivals'
    },
    {
      id: 3,
      title: 'Special Offers',
      description: 'Limited time offers on selected products. Shop now before they\'re gone.',
      image: 'https://placehold.co/300x200/e2e8f0/64748b?text=Special+Offers'
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          image: event.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically submit the form to an API
    console.log('Submitting carousel item:', formData);
    // Reset form
    setFormData({
      title: '',
      description: '',
      image: null
    });
  };

  const handleEdit = (id) => {
    console.log('Editing carousel item:', id);
  };

  const handleDelete = (id) => {
    console.log('Deleting carousel item:', id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Content Management</h1>
        </div>

        {/* Header Tabs */}
        <div className="bg-white rounded-lg shadow-sm p-1 mb-6">
          <div className="flex space-x-1">
            {[
              { id: 'carousel', label: 'Carousel', icon: Monitor },
              { id: 'banners', label: 'Banners', icon: Image },
              { id: 'videos', label: 'Videos', icon: Video },
              { id: 'blogs', label: 'Blogs', icon: FileText }
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

        {activeTab === 'carousel' && (
          <>
            {/* Add New Carousel Item Form */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Carousel Item</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Enter carousel title"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows="3"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="Enter carousel description"
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image Upload</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Image className="mx-auto w-12 h-12 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Drop your image here or click to browse</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto transition-colors">
                            <Upload className="w-4 h-4" />
                            Upload Image
                          </button>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Carousel Item
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Carousel Items Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Existing Carousel Items</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {carouselItems.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(item.id)}
                          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded-lg text-sm flex items-center justify-center gap-1 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg text-sm flex items-center justify-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab !== 'carousel' && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Monitor className="mx-auto w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {activeTab === 'banners' && 'Banners Management'}
              {activeTab === 'videos' && 'Video Management'}
              {activeTab === 'blogs' && 'Blog Management'}
            </h3>
            <p className="text-gray-500">
              {activeTab === 'banners' && 'Manage promotional banners and ads'}
              {activeTab === 'videos' && 'Upload and manage video content'}
              {activeTab === 'blogs' && 'Create and manage blog posts'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}