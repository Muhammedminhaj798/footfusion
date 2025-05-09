import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ProductContext } from "../context/Context";
import axiosInstance from "../AxiosInstence";

function EditProduct() {
  const { id } = useParams();
  const { data, fetch } = useContext(ProductContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch();
    
  
  }, [id, data, fetch]);
  const foundProduct = data.find((product) => product._id === id);

  const [input, setInput] = useState({
    name:foundProduct.name|| "",
    brand:foundProduct.brand|| "",
    description:foundProduct.description|| "",
    qty:foundProduct.qty|| 0,
    price:foundProduct.price|| 0,
    type:foundProduct.type|| "",
    image:foundProduct.image|| ""
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleImageChange = (e) => {
    const { name } = e.target;
    setInput({ ...input, [name]: e.target.files[0] });
  };

  const handleData = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(input).forEach(key => {
        formData.append(key, input[key]);
      });

      await axiosInstance.put(`/admin/editProduct/${id}`, formData);
      toast.success("Product updated successfully");
      fetch();
      navigate("/admin-product");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Edit Product
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Update the product information below
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleData}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                id="name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="text"
                name="name"
                placeholder="Product name"
                value={input.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Product Type
              </label>
              <select
                id="type"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={input.type}
                onChange={handleChange}
                name="type"
                required
              >
                <option value="">Select type</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kid">Kid</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                Brand
              </label>
              <input
                id="brand"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="text"
                name="brand"
                placeholder="Brand name"
                value={input.brand}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name="description"
                placeholder="Product description"
                value={input.description}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="qty" className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  id="qty"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  type="number"
                  name="qty"
                  placeholder="Quantity"
                  value={input.qty}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  id="price"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={input.price}
                  onChange={handleChange}
                  min="0"
                  step="1.00"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Product Image
              </label>
              <div className="mt-1 flex items-center">
                {foundProduct?.image && typeof foundProduct.image === 'string' && (
                  <div className="mb-2">
                    <p className="text-xs text-gray-500">Current image:</p>
                    <p className="text-xs text-gray-700 truncate">{foundProduct.image.split('/').pop()}</p>
                  </div>
                )}
              </div>
              <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="image" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload a file</span>
                      <input 
                        id="image" 
                        name="image" 
                        type="file" 
                        className="sr-only" 
                        onChange={handleImageChange} 
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin-product")}
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;