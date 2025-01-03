import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UsersContext } from "./context/UserContext";
import { toast } from "react-toastify";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const { datas } = useContext(UsersContext);

  const handleFocus = () => {
    setFocus(true);
  };
  const [focus, setFocus] = useState({
    errName: false,
    errEmail: false,
    errPassword: false,
  });

  const navigate = useNavigate();

  const handleData = async (e) => {
    e.preventDefault();
    const user = datas.find(
      (item) => item.email === input.email && item.password === input.password
    );
    console.log(user);

    if (user.role === "admin") {
      // localStorage.setItem("loginUser", JSON.stringify(user));
      // toast.success("welcome admin");
      navigate("/admin-product");
      toast.success("welcome admin");
      localStorage.setItem("Admin", JSON.stringify(user));
      
      // navigate("/")
    } else if (user) {
      localStorage.setItem("loginUser", JSON.stringify(user));
      
      toast.success('login successfully')
      navigate("/");
    } else {
      // alert("invalid");
      toast.error('invalid')
      navigate("/register");
    }
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(`Name: ${name}, Value: ${value}`);
    setInput({ ...input, [name]: value });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-yellow-700 p-14 rounded-lg shadow-lg">
        <form onSubmit={handleData} className="flex flex-col gap-4">
          <input
            type="email"
            onChange={handleChange}
            value={input.email}
            placeholder="E-mail"
            required
            name="email"
            className="p-2 rounded border border-gray-300"
          />
          <br />
          <input
            type="password"
            onChange={handleChange}
            value={input.password}
            placeholder="Enter Your Password"
            required
            name="password"
            className="p-2 rounded border border-gray-300"
          />
          <br />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
          <Link to={"/register"}>Create a new Account</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
