import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../AxiosInstence";

function AddProduct() {
  const [input, setInput] = useState({
    name: "",
    brand: "",
    description:"",
    price: "",
    type: "",
    qty:0,
    image: "",
  });
  console.log(input);

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   setInput({ ...input, [name]: value });
  // };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "image") {
      setInput({ ...input, [name]: files[0] }); 
    } else {
      setInput({ ...input, [name]: value });
    }
  };
  
  const navigate = useNavigate();
  const handleData = async (e) => {
    e.preventDefault();
    try {
      console.log('img:',input.image);
      let formData=new FormData()

     for (const key in input) {
  formData.append(key, input[key]);
}
      await axiosInstance.post("/admin/addProduct",formData);
      toast.success("Add product successfuly", {
        onClose: () => {
          navigate("/admin-product");
          window.location.reload()
        }
      });
    } catch (error) {
      console.error("error is : ", error);
    }
  };

  return (
    <div>
      <h1 className="mx-[600px] py-16 font-bold text-2xl">
        <u>Add products</u>
      </h1>
      <form className="mx-[550px]" action="" onSubmit={handleData}>
        <input
          className="border border-black px-1 w-96"
          type="text"
          name="name"
          placeholder="Product name"
          onChange={handleChange}
          required
        />
        <br />
        <br />
        {/* <input className='border border-black' type="text" placeholder='' /> */}
        <select
          className="border border-black w-96"
          name="type"
          onChange={handleChange}
        >
          <option value="">Select gender type</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kid">Kid</option>
        </select>

        <br />
        <br />
        <input
          className="border border-black px-1 w-96"
          type="text"
          placeholder="Brand"
          name="brand"
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <input
          className="border border-black px-1 w-96"
          type="text"
          placeholder="description"
          name="description"
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <input
          className="border border-black px-1 w-96"
          type="number"
          placeholder="Quantity"
          name="qty"
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <input
          className="border border-black px-1 w-96"
          type="text"
          placeholder="Prize"
          name="price"
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <input className="border border-black px-1 w-96" type="file" placeholder="image" name="image" onChange={handleChange} required />
        <br />
        <br />
        <button
          type="submit"
          className="p-2 bg-blue-500  text-white rounded hover:bg-blue-600 transition-all w-full"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
