import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProductContext } from "../context/Context";

function EditProduct() {
    const {fetch} = useContext(ProductContext)
    const [input, setInput] = useState({
        name : "",
        brand : "",
        price : "",
        type : ""
    })
    const navigate = useNavigate()
    console.log('stehgsg' , input);
    
    const handleChange =(e) => {
        e.preventDefault();
        const name = e.target.name
        const value = e.target.value
        setInput({...input, [name] : value})
    }
    const handleData = async (id) => {
        try{
           const response = await axios.patch(`http://localhost:3000/product/${id}`,{
                name:input.name,
                brand:input.brand,
                price:input.price,
                type:input.type
            })
            console.log(response.data);
            
            fetch()
            toast.success('Your edit is successfully');
            navigate('/admin-product')
        }catch(error){
            console.error('error is : ' , error);
            
        }
    }



  return (
    <div className="mx-[500px] pt-32">
      <form action="" onSubmit={handleData}>
        <input
          className="border border-black px-1 w-96"
          type="text"
          name="name"
          placeholder="edit name"
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <select className="border border-black w-96"  onChange={handleChange} name="type">
          <option value="">Edit gender type</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kid">Kid</option>
        </select>
        <br />
        <br />
        <input className="border border-black w-96" onChange={handleChange} type="text" placeholder="edit brand" />
        <br />
        <br />
        <input className="border border-black w-96" type="text" onChange={handleChange} placeholder="edit price" />
        <br />
        <br />
        <button type="submit" onChange={handleChange} className="p-2 bg-blue-500  text-white rounded hover:bg-blue-600 transition-all w-full">Done</button>
      </form>
    </div>
  );
}

export default EditProduct;
