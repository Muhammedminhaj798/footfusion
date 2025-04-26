import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from 'lucide-react';
import { UserRound } from 'lucide-react'
import { ProductContext } from "../context/Context";

function Navbar() {
  const [input, setInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { data } = useContext(ProductContext);
  const inputChange = (event) => {
    setInput(event.target.value);
  };

  const filtered = data.filter((item) => {
    const word = input.toLowerCase().trim();
    return (
      item.name.toLowerCase().includes(word) ||
      item.type.toLowerCase().includes(word) ||
      item.brand.toLowerCase().includes(word)
    );
  });

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-white w-full z-50 fixed top-0">
     
      {/* <div className="bg-white text-center py-1">
        <p className="text-sm md:text-base">Welcome to FootFusion</p>
      </div> */}

      
      <nav className="relative">
        <div className="flex justify-between items-center px-4 py-3 md:px-6 h-16">
          
          <div className="flex items-center gap-4">
            <Link to='/'>
            <span className="text-green-800 text-lg font-bold">FootFusion</span>
            </Link>
          </div>

 
          <div className="hidden md:block relative w-64">
            <input
              type="text"
              placeholder="Search products..."
              value={input}
              onChange={inputChange}
              className="p-2 w-full border border-gray-300 rounded-md"
            />
            {input && (
              <ul className="absolute left-0 w-full bg-white shadow-lg rounded-md max-h-48 overflow-auto z-50">
                {filtered.map((item, index) => (
                  <Link to={`productdetails/${item.id}`}>
                  <li
                    key={index}
                    className="p-2 border-b cursor-pointer hover:bg-gray-100"
                  >
                    {item.name}
                  </li>
                  </Link>
                ))}
                {filtered.length === 0 && (
                  <li className="p-2 text-gray-500">No results found</li>
                )}
              </ul>
            )}
          </div>


          <div className="hidden md:flex items-center gap-4">
            {[
              { name: "Home", path: "/" },
              { name: "Mens", path: "/man" },
              { name: "Women", path: "/women" },
              { name: "Collections", path: "/collections" },
              { name: "Kids", path: "/kids" },
              { name: "Contact", path: "/contact" },
            ].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm md:text-base text-green-800 hover:underline"
              >
                {link.name}
              </Link>
            ))}
            <Link to="/cart">
              <ShoppingCart
               className="text-xl text-green-800" />
            </Link>
            <Link to="/profile">
              < UserRound
              className="text-xl text-green-800" />
            </Link>
          </div>


          <button
            onClick={toggleMenu}
            className="block md:hidden focus:outline-none"
          >
            <span className="block w-6 h-0.5 bg-black mb-1"></span>
            <span className="block w-6 h-0.5 bg-black mb-1"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-gray-800 text-white flex flex-col items-center py-4 z-40 md:hidden">
            {[
              { name: "Home", path: "/" },
              { name: "Mens", path: "/man" },
              { name: "Women", path: "/women" },
              { name: "Collections", path: "/collections" },
              { name: "Kids", path: "/kids" },
              { name: "Contact", path: "/contact" },
            ].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="py-2 hover:underline w-full text-center"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/cart" onClick={() => setMenuOpen(false)} className="py-2">
              <FaShoppingCart className="text-xl" />
            </Link>
            <Link
              to="/profile"
              onClick={() => setMenuOpen(false)}
              className="py-2"
            >
              <UserRound className="text-xl" />
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
