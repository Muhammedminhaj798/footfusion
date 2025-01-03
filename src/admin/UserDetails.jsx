import React, { useState, useContext, useEffect } from "react";
import { UsersContext } from "../context/UserContext";
import { Link, useParams } from "react-router-dom";

function UserDetails() {
  const { datas } = useContext(UsersContext);
  const [state, setState] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const filter = datas.filter((filt) => filt.id === id);
    setState(filter);
  }, [datas, id]);
  console.log("datas : ", state);

  return (
    <div className="px-96 pt-20">
      {state.map((item) => (
        <div key={item.id}>
          <div className="flex bg-yellow-500 mx-24 w-">
            <img
              className="w-32 mx-14"
              src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"
              alt="Profile"
            />
            
            
            <div>
            <h1 className="text-xl mt-7"><label className="font-bold">Name : </label>{item.username}</h1>
            <h1><label className="font-bold">E-mail : </label>{item.email}</h1>
            </div>
            </div>
        </div>
      ))}
    </div>
  );
}

export default UserDetails;
