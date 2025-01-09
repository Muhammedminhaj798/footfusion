import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const { cart, setCart, removeFromCart } = useContext(CartContext);
  const [user, setUser] = useState(null);
  const [showNotification, setShowNotification] = useState(false); 
  const navigate = useNavigate();
  const [data, setData] = useState([])
  console.log(data);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loginUser"));
    if (loggedInUser) {
      setUser(loggedInUser);
      setCart(loggedInUser.cart || []);
    } else {
      navigate("/login");
    }
  }, [setCart, navigate]);

console.log(cart);

  const updateCartInDatabase = async (updatedCart) => {
    if (user) {
      try {
        const updatedUser = { ...user, cart: updatedCart };
        await axios.put(`http://localhost:3000/user/${user.id}`, updatedUser);
        localStorage.setItem("loginUser", JSON.stringify(updatedUser)); 
        setCart(updatedCart);
      } catch (error) {
        console.error("Error updating cart in database: ", error);
      }
    }
  };

  const handleIncreaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    updateCartInDatabase(updatedCart);
  };

  const handleDecreaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
    );
    updateCartInDatabase(updatedCart);
  };

  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
    updateCartInDatabase(updatedCart);
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.qty, 0);

  const handlePayment = () => navigate("/payment_details");

  if (!cart || cart.length === 0) return <h2>Your Cart is empty!</h2>;
const User = localStorage.getItem('loginUser')


  return (

    <div className="container mx-auto p-4 pt-36 h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Cart</h2>
      <ul className="space-y-4">
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-md"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div className="flex-1">
              <h4 className="text-lg font-semibold">{item.name}</h4>
              <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
              <p className="text-sm text-gray-600">
                Total Price: ₹{item.price * item.qty}
              </p>
              <div className="flex items-center mt-2">
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  onClick={() => handleDecreaseQty(item.id)}
                >
                  -
                </button>
                <span className="mx-2">{item.qty}</span>
                <button
                  className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                  onClick={() => handleIncreaseQty(item.id)}
                >
                  +
                </button>
              </div>
              <button
                className="mt-2 px-3 py-1 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="text-lg font-semibold mt-4">Total: ₹{calculateTotal()}</div>
      <button
        className="mt-4 w-full py-2 bg-green-900 text-white rounded-lg hover:bg-black transition"
        onClick={handlePayment}
      >
        Proceed To Checkout
      </button>
      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md">
          Product removed from cart
        </div>
      )}
    </div>
  );
};

export default Cart;