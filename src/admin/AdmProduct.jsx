import React, { useContext, useState } from "react";
import { ProductContext } from "../context/Context";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

function AdmProduct() {
  const { data, fetch } = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredData = selectedCategory
    ? data.filter((item) => item.type === selectedCategory)
    : data;

  const deletedProduct = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/product/${id}`
      );
      console.log(response.data);
      fetch();
      toast.success("product is deleted");
    } catch (error) {
      console.error("error is ,", error);
    }
  };

  return (
    <div
      className="w-11/12 max-w-[1000px] pt-20 mx-80 sm:px-8 md:px-16 lg:px-32
    "
    >
      <div className="mb-5">
        <label htmlFor="category" className="block mb-2 font-medium">
          Category:
        </label>

        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full max-w-md p-2 border border-gray-300 rounded-md"
        >
          <option value="">All</option>
          {[...new Set(data.map((item) => item.type))].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <Link to="/add_product">
          <button className="mx-[100px] bg-lime-700 w-24 h-11 rounded-md">
            Add
          </button>
        </Link>
      </div>

      {/* Product List */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-2 border">No.</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Brand</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Deleted</th>
              <th className="p-2 border">Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.id || index}>
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover"
                    />
                </td>
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">{item.type}</td>
                <td className="p-2 border">{item.brand}</td>
                <td className="p-2 border">{item.price}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => deletedProduct(item.id)}
                    className="text-red-500"
                  >
                    <Trash2 />
                  </button>
                </td>
                <td className="p-2 border">
                  <Link to={`/edit_product/${item.id}`}>
                    <button>
                      <Pencil />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdmProduct;
