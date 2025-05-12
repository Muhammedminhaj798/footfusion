import React, { useEffect, useState } from "react";
import { CircleUser, Mail, LogOut, User, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ name: "", email: "" });
  // Simulate useNavigate functionality
 
  useEffect(() => {
    // Check for logged in user
    const loggedInUser = localStorage.getItem("loginUser") 
      ? JSON.parse(localStorage.getItem("loginUser")) 
      : null;
    
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUserData({
        name: loggedInUser.name || "User Name",
        email: loggedInUser.email || "user@example.com"
      });
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("loginUser");
    setIsLoggedIn(false);
    navigateToLogin();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-32">
      <div className="max-w-2xl mx-auto pt-10 px-4">
        {isLoggedIn ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-600 p-6 text-white flex items-center">
              <div className="bg-white rounded-full p-3 mr-4">
                <CircleUser size={60} className="text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{userData.name}</h1>
                <p className="text-blue-100">User Profile</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <User className="text-gray-500 mr-2" size={18} />
                    <span className="text-sm font-medium text-gray-500">User Name</span>
                  </div>
                  <p className="text-lg font-medium pl-6">{userData.name}</p>
                </div>
                
                <div className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <Mail className="text-gray-500 mr-2" size={18} />
                    <span className="text-sm font-medium text-gray-500">E-mail</span>
                  </div>
                  <p className="text-lg break-all pl-6">{userData.email}</p>
                </div>
                
                <button 
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium flex items-center justify-center"
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <CircleUser size={50} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-medium text-gray-700 mb-4">Please login to the website...</h2>
            <Link to={'/login'}>
            <button 
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium"
            >
              Login
              <ChevronRight size={16} className="ml-1" />
            </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;