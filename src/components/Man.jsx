import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/Context";
import { AuthContext } from "../context/AuthProvider";
import { CartContext } from "../context/CartProvider";
import { toast } from "react-toastify";

function Man() {
  const [men, setMen] = useState([]);
  const { data } = useContext(ProductContext);
  const { user } = useContext(AuthContext);
  const { addToCart, cart } = useContext(CartContext);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (data && data.length > 0) {
      setMen(data.filter((man) => man.type === "men"));
    }
  }, [data]);


  const handleAddToCart = (productId,quantity) => {
    try {
      if (!user) {
        navigate("/login")
        toast.error("Please login first")
      } else {
        addToCart(productId,quantity);
        toast.success('Add to Cart')
      }
    } catch (error) {
      console.log("cart error:",error); 
    }
  };
    
  useEffect(()=>{
    window.scroll(0,0)
  },[])

  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }

  
  return (
    <div>
      <h1 className='text-2xl font-serif mt-4 ml-8'>Mens Collections</h1>
      <hr/>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {men.map((item) => (
        <div
          key={item._id} 
          className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
        >
          <Link to={`/productdetails/${item._id}`}>
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
          </Link>
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
            <div className="flex items-center justify-between mt-4">
              <span className="text-lg font-bold text-gray-800">
                ₹{item.price}
              </span>
              <button
                onClick={() => handleAddToCart(item._id,item.quantity>1?item.quantity:1)}
                className="bg-green-900 text-white px-4 py-2 rounded hover:bg-black transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Man;
