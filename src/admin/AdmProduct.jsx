import React, { useContext, useState } from "react";
import { ProductContext } from "../context/Context";
import { Link } from "react-router-dom";
import { Pencil, Trash2, Filter, Plus } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import axiosInstance from "../AxiosInstence";

function AdmProduct() {
  const { data, fetch } = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredData = selectedCategory
    ? data.filter((item) => item.type === selectedCategory)
    : data;

  const deletedProduct = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this product?")) {
        const response = await axiosInstance.put(
          `/admin/productDeleted/${id}`
        );
        console.log(response.data.data);
        fetch();
        toast.success("Product successfully deleted");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="w-full max-w-6xl ml-[335px] mx-auto pt-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Product Management</h1>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="w-full md:w-1/2">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <label htmlFor="category" className="font-medium text-gray-700">
                Filter by Category:
              </label>
            </div>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mt-2 w-full p-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
            >
              <option value="">All Categories</option>
              {[...new Set(data.map((item) => item.type))].map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <Link to="/add_product" className="w-full md:w-auto">
            <button className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-2 bg-lime-600 hover:bg-lime-700 text-white rounded-md transition shadow-md">
              <Plus size={18} />
              <span>Add Product</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 font-semibold text-gray-600 border-b">No.</th>
                <th className="p-4 font-semibold text-gray-600 border-b">Image</th>
                <th className="p-4 font-semibold text-gray-600 border-b">Name</th>
                <th className="p-4 font-semibold text-gray-600 border-b">Type</th>
                <th className="p-4 font-semibold text-gray-600 border-b">Brand</th>
                <th className="p-4 font-semibold text-gray-600 border-b">Price</th>
                <th className="p-4 font-semibold text-gray-600 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr 
                    key={item._id || index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 border-b border-gray-100">{index + 1}</td>
                    <td className="p-4 border-b border-gray-100">
                      <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-4 border-b border-gray-100 font-medium">{item.name}</td>
                    <td className="p-4 border-b border-gray-100">
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                        {item.type}
                      </span>
                    </td>
                    <td className="p-4 border-b border-gray-100">{item.brand}</td>
                    <td className="p-4 border-b border-gray-100 font-medium">${item.price}</td>
                    <td className="p-4 border-b border-gray-100">
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={() => deletedProduct(item._id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          title="Delete product"
                        >
                          <Trash2 size={18} />
                        </button>
                        <Link 
                          to={`/edit_product/${item._id}`}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                          title="Edit product"
                        >
                          <Pencil size={18} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">
                    No products found. {selectedCategory && "Try a different category or"} Add a new product.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdmProduct;