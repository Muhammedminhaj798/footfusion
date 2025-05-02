import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/Context";
import { CartContext } from "../context/CartProvider";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";
import axios from "axios";
import { Star } from 'lucide-react';
import axiosInstance from "../AxiosInstence";


function ProdectDetails() {
  const { id } = useParams();
  const { data } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [state, setState] = useState([]);

  const productDetails = async () => {
    try {
      const response = await axiosInstance.get(`/user/getProductById/${id}`)

      setState(response.data.data)
    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    productDetails()
  }, [id]);


  useEffect(() => {
    window.scroll(0, 0);
  }, []);


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
      <div

        className="w-full max-w-4xl rounded bg-white shadow-xl p-6 sm:p-8 lg:p-10 mx-auto text-gray-800 relative"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start md:-mx-4">
          <div className="w-full md:w-1/2 px-4 mb-6 md:mb-0">
            <div className="relative">
              <img
                src={state.image}
                className="w-full rounded-lg object-cover"
                alt={state.name}
              />
              <div className="border-4 border-green-300 absolute top-4 left-4 right-4 bottom-4 z-0"></div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4">
            <h1 className="font-bold uppercase text-xl sm:text-2xl mb-4 mt-10">
              {state.name}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              {state.description}
            </p>
            <div className="flex items-center justify-between mb-6 mt-20">
              <div className="text-4xl sm:text-5xl font-bold text-green-600">
                ₹ {state.price}.99
              </div>
            </div>
            <button
              onClick={() => handleAddToCart(item)}
              className="bg-green-900 hover:bg-black text-white font-semibold rounded-full px-6 py-2 mt-6"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProdectDetails;
