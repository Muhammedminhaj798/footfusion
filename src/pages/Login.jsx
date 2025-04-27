import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { UsersContext } from "../context/UserContext";
import { toast } from "react-toastify";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  // const { datas } = useContext(UsersContext);

  const navigate = useNavigate();

  // const handleData = async (e) => {
  //   e.preventDefault();
  //   const user = datas.find(
  //     (item) =>
  //       item.email == input.email &&
  //       item.password == input.password &&
  //       item.block == false
  //   );
    
  //   if (!user) {
  //     toast.error("Invalid email or password, or account is blocked.");
  //     navigate("/register");
  //     return;
  //   }

   
  //   if (user.role === "admin") {
  //     toast.success("Welcome admin", {
  //       onClose: () => {
  //         navigate("/admin_dashboard");
  //         window.location.reload();
  //       },
  //     });
  //     localStorage.setItem("Admin", JSON.stringify(user));
  //   } else if (user.role === "user") {
  //     localStorage.setItem("loginUser", JSON.stringify(user));
  //     toast.success("Login successful", {
  //       onClose: () => {
  //         navigate("/");
  //         window.location.reload();
  //       },
  //     });
  //   }
  // };
  const handleData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email: input.email,
          password: input.password,
        },
        {
          withCredentials: true, // because backend is setting cookies
        }
      );
  
      const user = response.data.data; // backend returns user data here
  
      if (response.data.isAdmin) {
        toast.success("Welcome admin", {
          onClose: () => {
            navigate("/admin_dashboard");
            window.location.reload();
          },
        });
        localStorage.setItem("Admin", JSON.stringify(user));
      } else {
        localStorage.setItem("loginUser", JSON.stringify(user));
        toast.success("Login successful", {
          onClose: () => {
            navigate("/");
            window.location.reload();
          },
        });
      }

      setInput({email: "", password:""})
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };
  
  

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className=" flex flex-col gap-6 bg-white p-14 rounded-lg shadow-lg">
        <h1 className="text-center text-xl font-bold capitalize">login</h1>
        <form onSubmit={handleData} className="flex flex-col gap-4">
          <input
            type="email"
            onChange={handleChange}
            value={input.email}
            placeholder="E-mail"
            required
            name="email"
            className="p-2 rounded border border-gray-300 outline-none"
          />

          <input
            type="password"
            onChange={handleChange}
            value={input.password}
            placeholder="Enter Your Password"
            required
            name="password"
            className="p-2 rounded border border-gray-300 outline-none"
          />

          <button
            type="submit"
            className="p-2 bg-green-900 text-white rounded hover:bg-black"
          >
            Login
          </button>
          <Link to={"/register"} className="text-sm">
            Create a new Account ?
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
