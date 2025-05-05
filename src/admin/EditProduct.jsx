import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ProductContext } from "../context/Context";
import axiosInstance from "../AxiosInstence";

function EditProduct() {
  const { id } = useParams();
  const { fetch } = useContext(ProductContext);
  const [input, setInput] = useState({
    name: "",
    brand: "",
    price: "",
    type: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/admin/adminProduct/${id}`);
        setInput(response.data); 
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to fetch product details");
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleData = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.patch(`/admin/adminProduct/${id}`, input);
      toast.success("Product updated successfully");
      fetch(); 
      navigate("/admin-product"); 
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  }; 

  return (
    <div className="mx-[500px] pt-32">
      <form onSubmit={handleData}>
        <input
          className="border border-black px-1 w-96"
          type="text"
          name="name"
          placeholder="Edit name"
          value={input.name}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <select
          className="border border-black w-96"
          value={input.type}
          onChange={handleChange}
          name="type"
        >
          <option value="">Edit type</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kid">Kid</option>
        </select>
        <br />
        <br />
        <input
          className="border border-black w-96"
          type="text"
          name="brand"
          placeholder="Edit brand"
          value={input.brand}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <input
          className="border border-black w-96"
          type="text"
          name="price"
          placeholder="Edit price"
          value={input.price}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all w-full"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
