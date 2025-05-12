import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../AxiosInstence";
import { ArrowLeft, Upload, Save } from "lucide-react";

function AddProduct() {
  const [input, setInput] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    type: "",
    qty: 0,
    image: "",
  });
  
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "image") {
      setInput({ ...input, [name]: files[0] });
      
      // Create image preview
      if (files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(files[0]);
      }
    } else {
      setInput({ ...input, [name]: value });
    }
  };
  
  const navigate = useNavigate();
  
  const handleData = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let formData = new FormData();
      for (const key in input) {
        formData.append(key, input[key]);
      }
      
      await axiosInstance.post("/admin/addProduct", formData);
      
      toast.success("Product added successfully", {
        onClose: () => {
          navigate("/admin-product");
        }
      });
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto pt-8 px-4">
      <div className="mb-8">
        <button 
          onClick={() => navigate("/admin-product")}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Products
        </button>
        
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleData} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  id="name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  id="type"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500 bg-white transition-colors"
                  name="type"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kid">Kid</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                  Brand *
                </label>
                <input
                  id="brand"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                  type="text"
                  placeholder="Enter brand name"
                  name="brand"
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="qty" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity *
                </label>
                <input
                  id="qty"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                  type="number"
                  placeholder="Available quantity"
                  name="qty"
                  min="0"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  id="description"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors min-h-20"
                  placeholder="Product description"
                  name="description"
                  rows="3"
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($) *
                </label>
                <input
                  id="price"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors"
                  type="text"
                  placeholder="Enter price"
                  name="price"
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image *
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <div className="mb-3">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="mx-auto h-32 w-32 object-cover rounded-md"
                        />
                      </div>
                    ) : (
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    )}
                    
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="image" className="relative cursor-pointer bg-white rounded-md font-medium text-lime-600 hover:text-lime-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-lime-500">
                        <span>{imagePreview ? "Change image" : "Upload a file"}</span>
                        <input 
                          id="image" 
                          name="image" 
                          type="file" 
                          className="sr-only"
                          onChange={handleChange}
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-4 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate("/admin-product")}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center px-6 py-2 bg-lime-600 hover:bg-lime-700 text-white rounded-md transition shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <Save size={18} className="mr-2" />
              {isSubmitting ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;