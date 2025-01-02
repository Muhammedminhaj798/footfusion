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
        className="bg-slate-200 text-center py-5"
        border="1"
        style={{ width: "100%", textAlign: "left" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((item, index) => (
            <tr className="border h-12" key={item.id || index}>
              <td className="text-xl">{index + 1}</td>
              <Link key={item.id} to={`user_details/${item.id}`}>
                <td className="text-xl">{item.username}</td>
              </Link>
              <td className="text-xl">{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
