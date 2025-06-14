import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../AxiosInstence";
import { loadStripe } from '@stripe/stripe-js'

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [addCart, setAddCart] = useState('')
  const [client, setClient] = useState('')
  const loggedInUser = JSON.parse(localStorage.getItem("loginUser"));
  useEffect(() => {

    if (loggedInUser && loggedInUser.cart) {
      setCart(loggedInUser.cart);
    }
  }, []);


  const stripePromise = loadStripe('pk_test_51RCvmlAJxLMwv76I61uG8YhHz8liK7CVGko8sBoDS2P69fvOF9xd7TQ2FEZmzi8Ch3WMkqHAhA22sAuy2FkBGCss00gWJuxkXA');
  const addToCart = async (productId, quantity) => {
    try {
      const response = await axiosInstance.post('/user/updateUserCart', { productId, quantity })
      setAddCart(response.data)

    } catch (error) {
      console.log(error);

    }
  }

  const removeFromCart = async (id) => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      console.error("User not Logged in.");
      return;
    }
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);

    try {
      const updatedUser = { ...loggedInUser, cart: updatedCart };
      await axiosInstance.put(
        `/user/${loggedInUser.id}`,
        updatedUser
      );
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const getCart = async () => {
    try {
      const response = await axiosInstance.get("/user/getUserCart")
      console.log('cart:', response.data.data);

      setCart(response.data.data)
    } catch (error) {
      console.log(error);

    }
  }


  const createOrder = async () => {
    try {
      const response = await axiosInstance.post('/user/createOrder', { userId: loggedInUser._id })
      setClient(response.data.data.clientSecret);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <CartContext.Provider
        value={{ cart, addToCart, removeFromCart, setCart, getCart, createOrder, client, stripePromise }}
      >
        {children}
      </CartContext.Provider>
    </div>
  );
}

export default CartProvider;
