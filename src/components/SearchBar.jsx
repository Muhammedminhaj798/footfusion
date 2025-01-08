import React from "react";
import { Link } from "react-router-dom";

function SearchBar({ filtered }) {
  return (
    <div>
      <div className="grid grid-cols-1 w-52  gap-6 p-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            <Link to={`productdetails/${item.id}`}>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-20 object-cover"
              />

              <h2 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
