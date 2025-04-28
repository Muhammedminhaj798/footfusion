import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../AxiosInstence";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loginUser"));
    if (loggedInUser && loggedInUser.cart) {
      setCart(loggedInUser.cart);
    }
  }, []);

  // const addToCart = async (product) => {
  //   const loggedInUser = JSON.parse(localStorage.getItem("loginUser"));
  //   if (!loggedInUser) {
  //     console.error("User not logged in.");
  //     toast.success('user not logged in.')
  //     return;
  //   }
  //   const existingProduct = cart.find((item) => item.id === product.id);
  //   let updatedCart;

  //   if (existingProduct) {
  //     updatedCart = cart.map((item)=>
  //      item.id === product.id ? {...item, qty: item.qty +1} : item
  //   );
  //   }else{
  //       updatedCart = [...cart, {...product, qty : 1}]
  //   }
  //   setCart(updatedCart);

  //   try {
  //     const updatedUser = { ...loggedInUser, cart: updatedCart };
  //     await axiosInstance.post(
  //       `/user/updateUserCart`,
  //       updatedUser
  //     );
  //     localStorage.setItem("loginUser", JSON.stringify(updatedUser));
  //   } catch (error) {
  //     console.error("Error the updating cart:", error);
  //   }
  // };

  const addToCart=async(productId,quantity)=>{
    try {
      const response=await axiosInstance.post('/user/updateUserCart',{productId,quantity})
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

  const getCart = async() =>{
    try {
      const response = await axiosInstance.get("/user/getUserCart")
      console.log('cart:',response.data.data);
      
      setCart(response.data.data)
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div>
      <CartContext.Provider
        value={{ cart, addToCart, removeFromCart, setCart,getCart }}
      >
        {children}
      </CartContext.Provider>
    </div>
  );
}

export default CartProvider;
