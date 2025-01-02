import React, { useContext, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { ProductContext } from "../context/Context";
import SearchBar from "../components/SearchBar";

function Navbar() {
  const [input, setInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle mobile menu
  const { data } = useContext(ProductContext);
  const navigate = useNavigate()
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
    <div className="bg-yellow-100 w-full z-50">
      <div className="bg-slate-400">
        <p className="text-center text-sm md:text-base">
          Welcome to FootFusion
        </p>
      </div>
      <nav className="bg-zinc-500">
        <div className="flex justify-between items-center p-4 xl:p-6 h-20">
          <div className="flex items-center gap-4 md:gap-6">
            <Link>
              <img
                src="data:image/png;base64,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" // Replace with your logo
                alt="Site Logo"
                className="w-10 h-12 md:w-12 md:h-12"
              />
            </Link>
            <span className="text-white text-lg font-bold">FootFusion</span>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              <span className="block w-6 h-0.5 bg-white mb-1"></span>
              <span className="block w-6 h-0.5 bg-white mb-1"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </button>
          </div>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={input}
              onChange={inputChange}
              className="p-2 w-full border border-gray-300 rounded-md"
            />
            {input && (
              <ul className="absolute left-0 w-full bg-white shadow-lg rounded-md max-h-48 overflow-auto">
                {filtered.map((item, index) => (
                 <li 
                 onClick={()=>navigate(`productdetails/${item.id}`)}
                  key={index}
                  className="p-2 border-b cursor-pointer hover:bg-gray-100"
                >
                  {item.name}
                </li>
                ))}
                {filtered.length === 0 && (
                  <li className="p-2 text-gray-500">No results found</li>
                )}
              </ul>
            )}
          </div>
          
          <div className="hidden md:flex items-center gap-4 md:gap-6">
            {/* Desktop Menu */}
            <Link to="/" className="text-sm md:text-base text-white">
              Home
            </Link>
            <Link
              to="/man"
              className="px-2 md:px-3 text-sm md:text-base text-white"
            >
              Mens
            </Link>
            <Link
              to="/women"
              className="px-2 md:px-3 text-sm md:text-base text-white"
            >
              Women
            </Link>
            <Link
              to="/collections"
              className="px-2 md:px-3 text-sm md:text-base text-white"
            >
              Collections
            </Link>
            <Link
              to="/kids"
              className="px-2 md:px-3 text-sm md:text-base text-white"
            >
              Kids
            </Link>
            <Link
              to="/contact"
              className="px-2 md:px-3 text-sm md:text-base text-white"
            >
              Contact
            </Link>
            <Link to="/cart" className="flex items-center">
              <FaShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </Link>
            <Link to="/profile" className="flex items-center">
              <CgProfile className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </Link>
          </div>
        </div>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="flex flex-col items-center bg-zinc-700 md:hidden">
            <Link to="/" className="py-2 text-white">
              Home
            </Link>
            <Link to="/man" className="py-2 text-white">
              Mens
            </Link>
            <Link to="/women" className="py-2 text-white">
              Women
            </Link>
            <Link to="/collections" className="py-2 text-white">
              Collections
            </Link>
            <Link to="/kids" className="py-2 text-white">
              Kids
            </Link>
            <Link to="/contact" className="py-2 text-white">
              Contact
            </Link>
            <Link to="/cart" className="py-2 text-white">
              <FaShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
            <Link to="/profile" className="py-2 text-white">
              <CgProfile className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
