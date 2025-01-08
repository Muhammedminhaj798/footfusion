import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircleUser } from "lucide-react";

function Profile() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const clickToLogout = () => {
    localStorage.removeItem("loginUser");
    navigate("/");
  };

  const loggedInUser = JSON.parse(localStorage.getItem("loginUser"));
  //  useEffect(()=>{
  //   if(loggedInUser){
  //     setUser(loggedInUser);
  //     setUser(loggedInUser.email)

  //   }
  //  },[setUser])

  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-gray-50">
       
          {loggedInUser ? (
            <div className=" p-14 mt-24 rounded-lg -lg shadowh-[400px] w-[700px] bg-white">
              <CircleUser className="w-36 h-28 mt-1" />
              <br />
              <br />
              <h1 className="">
                <label className="font-bold text-2xl"> User name:</label>{" "}
                {loggedInUser.username}
              </h1>
              <br />
              <br />
              <h1 className="">
                <label className="font-bold text-2xl"> E-mail: </label>
                {loggedInUser?.email}
              </h1>
              <button
                className="w-48 h-10 mx-[400px] mt-5 bg-red-500"
                onClick={clickToLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className=" p-14 mt-24 rounded-lg w-[700px]">
            <Link to={"/login"}>
              <div className="flex flex-col gap-8 items-center justify-center">
                <h1 className="text-3xl text-center">
                  please login the website...
                </h1>
                <button className="w-48 h-10 bg-green-900 text-white font-semibold rounded-lg">Login</button>
              </div>
            </Link>
            </div>

          )}
      </div>
    </div>
  );
}

export default Profile;
