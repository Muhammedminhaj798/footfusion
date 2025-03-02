import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/Context";
import { AuthContext } from "../context/AuthProvider";
import { CartContext } from "../context/CartProvider";
import { toast } from "react-toastify";

function Kids() {
  const [kids, setKids] = useState([]);
  const { data } = useContext(ProductContext);
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

console.log(kids);

  useEffect(() => {
    const filter = data.filter((kidd) => kidd.type === "kid");
    setKids(filter);
  }, [data]);

  const handleAddToCart = (product) => {
    if (user) {
      toast.success("Add to Cart");
      addToCart(product);
    } else {
      toast.error("Please log in to Add Products to the Cart");
      navigate("/login");
    }
  };

  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-serif mt-4 ml-8">Kids Collection</h1>
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {kids.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            <Link key={item.id} to={`productdetails/${item.id}`}>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
            </Link>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h2>
              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold text-gray-800">
                  ₹{item.price}
                </span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
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

export default Kids;
