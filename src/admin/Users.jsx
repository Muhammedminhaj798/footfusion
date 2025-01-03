import React, { useContext, useEffect, useState } from "react";
import { UsersContext } from "../context/UserContext";
import { Link } from "react-router-dom";

function Users() {
  const { datas } = useContext(UsersContext);
  

  return (
    <div className="w-[1700px] pt-20 text-center px-[450px]">
      <h1 className="text-5xl">
        <u>Users</u>
      </h1>
      <br />
      <table
        className="w-full text-left border-collapse"
        border="1"
        style={{ width: "100%", textAlign: "left" }}
      >
        <thead>
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">E-mail</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((item, index) => (
            <tr className="border h-12" key={item.id || index}>
              <td className="text-xl p-2 border">{index + 1}</td>
              <Link key={item.id} to={`user_details/${item.id}`}>
                <td className="text-xl p-2 ">{item.username}</td>
              </Link>
              <td className="text-xl p-2 border">{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
