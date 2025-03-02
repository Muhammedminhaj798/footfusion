import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/Context";
import { CartContext } from "../context/CartProvider";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";
import axios from "axios";
import { Star } from 'lucide-react';


function ProdectDetails() {
  const { id } = useParams();
  const { data } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [state, setState] = useState([]);
  const [star, setStar] = useState(0);


  useEffect(() => {
    const filter = data.filter((filt) => filt.id == id);
    setState(filter);
  }, [data, id]);


  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const handleRating = async (rating) => {
    setStar(rating);
    try {
      const response = await axios.patch(`http://localhost:3000/product/${id}`, {
        rating: rating,
      });
      toast.success("Rating submitted successfully!");
      console.log("Server Response:", response.data); 
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error("Failed to submit rating. Please try again.");
    }
  };

  
  const handleAddToCart = (product) => {
    if (user) {
      addToCart(product);
      toast.success("Added to Cart");
    } else {
      navigate("/login");
      toast.error("Please log in to add products to the cart");
    }
  };

  return (
    <div className="min-w-screen min-h-screen bg-green-300 flex items-center justify-center p-5 lg:p-10">
      {state.map((item) => (
        <div
          key={item.id}
          className="w-full max-w-4xl rounded bg-white shadow-xl p-6 sm:p-8 lg:p-10 mx-auto text-gray-800 relative"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start md:-mx-4">
            <div className="w-full md:w-1/2 px-4 mb-6 md:mb-0">
              <div className="relative">
                <img
                  src={item.image}
                  className="w-full rounded-lg object-cover"
                  alt={item.name}
                />
                <div className="border-4 border-green-300 absolute top-4 left-4 right-4 bottom-4 z-0"></div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-4">
              <h1 className="font-bold uppercase text-xl sm:text-2xl mb-4">
                {item.name}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                {item.description}
              </p>
              <div className="flex items-center justify-between mb-6">
                <div className="text-4xl sm:text-5xl font-bold text-green-600">
                  ₹ {item.price}.99
                </div>
              </div>
              <button
                onClick={() => handleAddToCart(item)}
                className="bg-green-900 hover:bg-black text-white font-semibold rounded-full px-6 py-2"
              >
                Add to Cart
              </button>
              <div className="flex justify-center pt-10 w-60 gap-3">
                {[1, 2, 3, 4, 5].map((rating) => (
                   <Star key={rating}
                    className={`${
                      star >= rating ? "bg-yellow-500" : "bg-gray-300"
                    } h-12 w-12 border cursor-pointer`}
                    onClick={() => handleRating(rating)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProdectDetails;
