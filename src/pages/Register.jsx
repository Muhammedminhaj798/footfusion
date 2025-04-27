import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
    cartItems: [],
    block : false,
  });

  const [focus, setFocus] = useState({
    errName: false,
    errEmail: false,
    errPassword: false,
    errCpassword: false,
  });

  const navigate = useNavigate();

  const handleData = async (e) => {
    e.preventDefault();
    if (input.password !== input.cpassword) {
      // alert("Passwords do not match");
      toast.warning('Passwords do not match')
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        name: input.username,
        email: input.email,
        password: input.password,
        isAdmin: false,
        isBlocked: false
      }, {
        withCredentials: true // important for sending cookies
      });
      

      // alert("user registered successfully");
      toast.success('user registered successfully')
      navigate("/login");
    } catch (error) {
      
      // alert("An error occurred while registering. Please try again.");
      toast.error("An error occurred while registering. Please try again.")
    }
  };

  // const handleData = async (e) => {
  //   e.preventDefault();
  //   if (input.password !== input.cpassword) {
  //     toast.warning('Passwords do not match');
  //     return;
  //   }
  //   try {
  //     await axios.post("http://localhost:8080/api/auth/register", {
  //       username: input.username,
  //       email: input.email,
  //       password: input.password,
  //       cpassword: input.cpassword,
  //       role: "user",
  //       block: false
  //     }, {
  //       withCredentials: true
  //     });
  
  //     toast.success('User registered successfully');
  //     navigate("/login");
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "An error occurred while registering. Please try again.");
  //   }
  // };
  

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 md:p-10 lg:p-14 rounded-lg shadow-lg w-full max-w-md md:max-w-lg flex flex-col gap-6">
      <h1 className="text-center text-xl font-bold capitalize">register</h1>
        <form onSubmit={handleData} className="flex flex-col gap-4">
          <div>
            <input
              id="name"
              type="text"
              pattern="^[A-Za-z0-9].{2,16}"
              placeholder="Username"
              className="input p-2 rounded border border-gray-300 w-full"
              name="username"
              required
              onBlur={() => setFocus({ ...focus, errName: true })}
              onChange={handleChange}
              value={input.username}
                
            />
            <span id="span" className="text-xs text-gray-200 block mt-1">
              Username should have 3-16 characters
            </span>
          </div>

          <div>
            <input
              id="email"
              type="email"
              placeholder="E-mail"
              required
              onBlur={() => setFocus({ ...focus, errEmail: true })}
              className="input p-2 rounded border border-gray-300 w-full"
              name="email"
              value={input.email}
              onChange={handleChange}
            />
            <span id="span" className="text-xs text-gray-200 block mt-1">
              Enter a valid Email ID
            </span>
          </div>

          <div>
            <input
              id="password"
              type="password"
              placeholder="Enter Your Password"
              required
              onBlur={() => setFocus({ ...focus, errPassword: true })}
              className="input p-2 rounded border border-gray-300 w-full"
              name="password"
              value={input.password}
              onChange={handleChange}
            />
            <span id="span" className="text-xs text-gray-200 block mt-1">
              password minimum 6 characters
            </span>
          </div>

          <div>
            <input
              id="Cpassword"
              type="password"
              placeholder="Confirm Your Password"
              required
              onBlur={() => setFocus({ ...focus, errCpassword: true })}
              pattern={input.password}
              className="input p-2 rounded border border-gray-300 w-full"
              name="cpassword"
              value={input.cpassword}
              onChange={handleChange}
            />
            <span id="span" className="text-xs text-gray-200 block mt-1">
              Passwords must match
            </span>
          </div>

          <button
            type="submit"
            className="p-2 bg-green-900 text-white rounded hover:bg-black transition-all w-full"
          >
            Register
          </button>
          <Link to={'/login'} className="text-sm text-center">I have an a Account</Link>
        </form>
      </div>
    </div>
  );
}

export default Register;