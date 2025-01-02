import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/Context";
import { AuthContext } from "../context/AuthProvider";
import { CartContext } from "../context/CartProvider";

function Women() {
  const [women, setWomen] = useState([]);
  const { data } = useContext(ProductContext);
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  //check the women collections
  useEffect(() => {
    if (data) {
      setWomen(data.filter((item) => item.type === "women"));
    }
  }, [data]);

  //click the button function
  const handleAddToCart = (product) => {
    if (user) {
      addToCart(product);
    } else {

      navigate("/login");
    }
  };

  if (!data || data.length === 0) {
    return <div className="text-center text-gray-600 mt-20">Loading...</div>;
  }

  return (
    <div>
      <h1 className='text-2xl font-serif mt-4 ml-8'>Womens Collections</h1>
      <hr/>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 sm:p-6*">
      {women.map((item) => (
        <div
          key={item.id}
          className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
        >
          <Link to={`productdetails/${item.id}`}>
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-auto object-cover aspect-video"
            />
          </Link>
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
            <div className="flex items-center justify-between mt-4">
              <span className="text-lg font-bold text-gray-800">
                ₹{item.price}
              </span>
              <button
                onClick={() => handleAddToCart(item)}
                className="bg-blue-500 text-white text-sm px-3 py-2 rounded hover:bg-blue-600 transition"
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

export default Women;
