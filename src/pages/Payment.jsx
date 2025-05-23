import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartProvider";

function Payment() {
  const [data, setData] = useState([])
  const { cart, setCart } = useContext(CartContext)
  const navigate = useNavigate()
  console.log(data)



  const handleCheckout = async () => {
    const loggedInUser = localStorage.getItem("loginUser");

    if (!loggedInUser) {
      console.error("No logged-in user found!");
      return;
    }

    try {
      const parsedUser = JSON.parse(loggedInUser);
      const updatedCart = [];

      const updatedUser = { ...parsedUser, cart: updatedCart };
      localStorage.setItem("loginUser", JSON.stringify(updatedUser));

      navigate('/');
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-3xl mx-auto p-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Checkout
          </h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
              Shipping Address
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  for="first_name"
                  className="block text-gray-700 dark:text-white mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  required
                  id="first_name"
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                />
              </div>
              <div>
                <label
                  for="last_name"
                  className="block text-gray-700 dark:text-white mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  id="last_name"
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                for="address"
                className="block text-gray-700 dark:text-white mb-1"
              >
                Address
              </label>
              <input
                type="text"
                required
                className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
              />
            </div>

            <div className="mt-4">
              <label
                for="city"
                className="block text-gray-700 dark:text-white mb-1"
              >
                City
              </label>
              <input
                type="text"
                required
                id="city"
                className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label
                  for="state"
                  className="block text-gray-700 dark:text-white mb-1"
                >
                  State
                </label>
                <input
                  type="text"
                  required
                  id="state"
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                />
              </div>
              <div>
                <label
                  for="zip"
                  className="block text-gray-700 dark:text-white mb-1"
                >
                  ZIP Code
                </label>
                <input
                  type="text"
                  required
                  id="zip"
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
              Payment Information
            </h2>
            <div className="mt-4">
              <label
                for="card_number"
                className="block text-gray-700 dark:text-white mb-1"
              >
                Card Number
              </label>
              <input
                type="text"
                required
                id="card_number"
                className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label
                  for="exp_date"
                  className="block text-gray-700 dark:text-white mb-1"
                >
                  Expiration Date
                </label>
                <input
                  type="date"
                  required
                  id="exp_date"
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                />
              </div>
              <div>
                <label
                  for="cvv"
                  className="block text-gray-700 dark:text-white mb-1"
                >
                  CVV
                </label>
                <input
                  type="text"
                  required
                  id="cvv"
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button onClick={() => handleCheckout()} type="submit" class="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:bg-teal-600 dark:text-white dark:hover:bg-teal-900">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment