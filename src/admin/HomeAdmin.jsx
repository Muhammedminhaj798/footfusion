// import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import AdmProduct from "./AdmProduct";
import { toast } from "react-toastify";

// import Users from "./Users";

function HomeAdmin() {
  const navigate = useNavigate();
  const clickToLogout = () => {
    localStorage.removeItem("loginUser");
    localStorage.removeItem("Admin");
    toast.success("Admin page is logout successfully",{
      onClose:()=>{
        navigate('/')
        window.location.reload()
      }
    });
  };

  return (
    <div className="fixed w-1/5 bg-slate-100 flex flex-col justify-between h-screen py-6 px-12">
      <h1 className="text-center text-2xl">Foot Fusion</h1>
      <div className="  flex flex-col  items-center gap-4 text-xl">
        <Link to="/admin-product">
          <button className="text-center  text-slate-500 hover:text-black">
            Products
          </button>
        </Link>
        <hr />
        <Link to={"/admin_users"}>
          <h1 className="text-center  text-slate-500 hover:text-black">
            Users
          </h1>
        </Link>
        <hr />
        <Link to={"/orders"}>
          <h1 className="text-center   text-slate-500 hover:text-black">
            orders
          </h1>
        </Link>
        <hr />
      </div>
      <button
        onClick={clickToLogout}
        className="w-full text-white font-semibold bg-green-900 hover:bg-black h-10 rounded-md hover:scale-110 transition-all duration-500"
      >
        Logout
      </button>
    </div>
  );
}

export default HomeAdmin;
