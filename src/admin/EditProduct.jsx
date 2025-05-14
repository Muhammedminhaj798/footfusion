import React, { useState, useEffect } from "react";
import { 
  Save, 
  ArrowLeft, 
  Upload, 
  Package, 
  Tag, 
  DollarSign, 
  FileText, 
  ShoppingBag, 
  Briefcase
} from "lucide-react";

function EditProduct() {
  // Mock data for visualization purposes
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  
  // Simulating fetching product data
  useEffect(() => {
    // In a real app, this would be replaced with your API call
    setTimeout(() => {
      setProduct({
        _id: "12345",
        name: "Premium Comfort Shoes",
        brand: "FootWear Plus",
        description: "Comfortable shoes for everyday wear with extra cushioning and breathable material.",
        qty: 45,
        price: 89.99,
        type: "men",
        image: "shoes_image.jpg"
      });
      setIsLoading(false);
    }, 800);
  }, []);

  const [input, setInput] = useState({
    name: "",
    brand: "",
    description: "",
    qty: 0,
    price: 0,
    type: "",
    image: ""
  });

  // Update input when product data is loaded
  useEffect(() => {
    if (product) {
      setInput({
        name: product.name || "",
        brand: product.brand || "",
        description: product.description || "",
        qty: product.qty || 0,
        price: product.price || 0,
        type: product.type || "",
        image: product.image || ""
      });
    }
  }, [product]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleImageChange = (e) => {
    const { name } = e.target;
    if (e.target.files && e.target.files[0]) {
      setInput({ ...input, [name]: e.target.files[0] });
    }
  };

  const handleData = (e) => {
    e.preventDefault();
    console.log("Product updated:", input);
    // In a real app, this would submit to your API
  };

  const handleCancel = () => {
    console.log("Navigating back to products");
    // In a real app with react-router, this would be: navigate("/admin-product")
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-gray-200 h-16 w-16 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-36"></div>
          </div>
          <p className="mt-4 text-gray-600">Loading product data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 ml-[300px]">
      <div className="max-w-5xl mx-auto pt-8 px-4 sm:px-6 lg:px-8">
        {/* Header with breadcrumb */}
        <div className="mb-6">
          <button 
            onClick={handleCancel}
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Products
          </button>
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900">Edit Product</h1>
          <p className="mt-1 text-sm text-gray-500">
            Make changes to your product and save when you're done
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header with product preview */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4">
            <div className="flex items-center text-white">
              <div className="bg-white rounded-lg h-12 w-12 flex items-center justify-center mr-4">
                <Package size={24} className="text-indigo-600" />
              </div>
              <div>
                <span className="block text-indigo-100 text-sm font-medium">Currently editing</span>
                <span className="block text-white text-lg font-bold truncate">{input.name}</span>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleData} className="divide-y divide-gray-200">
            {/* Basic Information */}
            <div className="px-6 py-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Tag size={18} className="mr-2 text-gray-500" />
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    id="name"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    type="text"
                    name="name"
                    placeholder="Enter product name"
                    value={input.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                    Brand
                  </label>
                  <input
                    id="brand"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    type="text"
                    name="brand"
                    placeholder="Enter brand name"
                    value={input.brand}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      id="type"
                      className="block w-full appearance-none px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      value={input.type}
                      onChange={handleChange}
                      name="type"
                      required
                    >
                      <option value="">Select category</option>
                      <option value="men">Men</option>
                      <option value="women">Women</option>
                      <option value="kid">Kid</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="qty" className="block text-sm font-medium text-gray-700 mb-1">
                      <div className="flex items-center">
                        <ShoppingBag size={14} className="mr-1 text-gray-500" />
                        Quantity
                      </div>
                    </label>
                    <input
                      id="qty"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      type="number"
                      name="qty"
                      placeholder="0"
                      value={input.qty}
                      onChange={handleChange}
                      min="0"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                      <div className="flex items-center">
                        <DollarSign size={14} className="mr-1 text-gray-500" />
                        Price
                      </div>
                    </label>
                    <input
                      id="price"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      type="number"
                      name="price"
                      placeholder="0.00"
                      value={input.price}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="px-6 py-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <FileText size={18} className="mr-2 text-gray-500" />
                Product Description
              </h3>
              
              <textarea
                id="description"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                name="description"
                placeholder="Enter detailed product description"
                value={input.description}
                onChange={handleChange}
                rows="4"
                required
              />
              <p className="mt-2 text-sm text-gray-500">
                Write a compelling description that helps customers understand your product's benefits.
              </p>
            </div>
            
            {/* Product Image */}
            <div className="px-6 py-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Upload size={18} className="mr-2 text-gray-500" />
                Product Image
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-4">
                    {typeof input.image === 'string' && (
                      <div className="text-center space-y-2">
                        <div className="w-full h-40 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                          {/* In a real app you would display the actual image here */}
                          <Briefcase size={48} className="text-gray-300" />
                        </div>
                        <p className="text-sm text-gray-600">Current image:</p>
                        <p className="text-sm font-medium text-gray-800">{input.image}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <div className="border-2 border-gray-300 border-dashed rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-2">
                        <label htmlFor="image" className="cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                          Upload a new image
                          <input 
                            id="image" 
                            name="image" 
                            type="file" 
                            className="sr-only" 
                            onChange={handleImageChange}
                          />
                        </label>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                      </div>
                    </div>
                  </div>
                  
                  {typeof input.image === 'string' && (
                    <p className="text-xs text-green-600 font-medium mt-2">
                      Current image will be kept if no new image is selected
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="px-6 py-4 bg-gray-50 flex items-center justify-between">
              <button
                type="button"
                onClick={handleCancel}
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                className="inline-flex items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Save size={16} className="mr-2" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;