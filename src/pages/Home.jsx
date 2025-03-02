import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../useFetch";
import Man from "../components/Man";

function Home() {
  // const {data} = useFetch("https://jsonplaceholder.typicode.com/users")
  // console.log(data);

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="relative h-screen w-screen">
          <div className="absolute top-64  ">
            <h1 className="text-5xl ml-4 text-start rounded-lg bg-green-100/50 text-green-800 border border-green-800/55 font-bold p-8 ">
              <span className="text-[60px] capitalize">
                Step up your style game with
              </span>{" "}
              <br />
              <br /> unbeatable deals today!
            </h1>
          </div>
          <img
            className="w-full h-[100vh] object-cover"
            src="https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
