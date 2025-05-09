import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function HomeAdmin() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check which page is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  const clickToLogout = () => {
    localStorage.removeItem("loginUser");
    localStorage.removeItem("Admin");
    toast.success("Logged out successfully", {
      onClose: () => {
        navigate("/");
        window.location.reload();
      },
    });
  };

  const navItems = [
    { path: "/admin_dashboard", label: "Dashboard", icon: "📊" },
    { path: "/admin-product", label: "Products", icon: "👟" },
    { path: "/admin_users", label: "Users", icon: "👥" },
    { path: "/adminorders", label: "Orders", icon: "📦" },
  ];

  return (
    <div className="fixed w-1/5 bg-gray-900 flex flex-col h-screen shadow-lg">
      {/* Logo & Brand */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-center text-2xl font-bold text-white mb-1">Foot Fusion</h1>
        <p className="text-center text-gray-400 text-sm">Admin Portal</p>
      </div>
      
      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path}>
                <button
                  className={`flex items-center w-full p-3 rounded-lg transition-all duration-300 ${
                    isActive(item.path)
                      ? "bg-blue-600 text-white font-medium"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                  {isActive(item.path) && (
                    <span className="ml-auto bg-blue-500 h-2 w-2 rounded-full"></span>
                  )}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* User Section & Logout */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center p-2 mb-3 rounded-lg bg-gray-800">
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            A
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-gray-400">Administrator</p>
          </div>
        </div>
        <button
          onClick={clickToLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center"
        >
          <span className="mr-2">⎋</span>
          Logout
        </button>
      </div>
    </div>
  );
}

export default HomeAdmin;