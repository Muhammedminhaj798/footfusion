import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartProvider";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";
import { Star } from 'lucide-react';
import axiosInstance from "../AxiosInstence";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/user/getProductById/${id}`);
        setProduct(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product");
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      toast.error("Please log in to add products to the cart");
      return;
    }

    if (product) {
      const productToAdd = {
        _id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty: quantity,
        stock: product.qty
      };
      addToCart(productToAdd);
      toast.success("Added to Cart");
      setQuantity(1); // Reset quantity after adding to cart
    }
  };

  const incrementQuantity = () => {
    if (product && quantity < product.qty) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-green-50">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl text-red-500">Product not found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-green-50 min-h-screen py-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2 p-4">
            <div className="relative">
              <img
                src={product.image || '/placeholder-image.jpg'}
                alt={product.name}
                className="w-full h-auto rounded-lg object-cover"
              />
              <div className="border-4 border-green-300 absolute top-0 left-0 right-0 bottom-0 rounded-lg"></div>
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  fill={star <= (product.rating || 0) ? "#FBBF24" : "none"}
                  stroke={star <= (product.rating || 0) ? "#FBBF24" : "#9CA3AF"}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                ({product.reviews || 0} reviews)
              </span>
            </div>

            {/* Main Details */}
            <div className="space-y-3 mb-6">
              <p className="text-xl font-bold text-green-600">₹{product.price.toFixed(2)}</p>

              <div className="flex items-center">
                <span className="text-gray-600 mr-2">Brand:</span>
                <span className="font-medium">{product.brand || 'N/A'}</span>
              </div>

              <div className="flex items-center">
                <span className="text-gray-600 mr-2">Category:</span>
                <span className="font-medium">{product.type || 'N/A'}</span>
              </div>

              <div className="flex items-center">
                <span className="text-gray-600 mr-2">Status:</span>
                <span className={`font-medium ${product.qty > 0 ? "text-green-600" : "text-red-600"}`}>
                  {product.qty > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{product.description || 'No description available.'}</p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block mb-2">Quantity</label>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  className="bg-gray-200 px-3 py-1 rounded-l disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <div className="px-4 py-1 bg-gray-100 text-center w-12">
                  {quantity}
                </div>
                <button
                  onClick={incrementQuantity}
                  className="bg-gray-200 px-3 py-1 rounded-r disabled:opacity-50"
                  disabled={quantity >= product.qty}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.qty <= 0}
              className={`w-full py-3 rounded text-white font-medium 
                ${product.qty > 0
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"}`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;