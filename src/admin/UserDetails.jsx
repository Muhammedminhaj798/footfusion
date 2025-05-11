import { useState, useContext, useEffect } from "react";
import { UsersContext } from "../context/UserContext";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import axiosInstance from "../AxiosInstence";

function UserDetails() {
  const { datas } = useContext(UsersContext);
  const { id } = useParams();
  const [stated, setState] = useState(null);

  useEffect(() => {
    const filter = datas.find((filt) => filt.id === id);
    setState(filter);
    console.log("filtered", filter);
  }, [datas, id]);



  const blockUser = async (e) => {
    e.preventDefault();
    if (stated?.block === false) {
      try {
        const response = await axiosInstance.patch(`admin/getuser/${id}`, {
          block: true,
        });
        setState(response.data);
      } catch (error) {
        console.log(error);
      }
    } else if (stated?.block === true) {
      try {
        const response = await axiosInstance.patch(`admin/getuser/${id}`, {
          block: false,
        });
        setState(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // const blockUser = async () => {
  //   try {
  //     if (stated?.block == false) {
  //       const response = await axios.patch(`http://localhost:3000/user/${id}`, {
  //         block: true,
  //       });

  //       console.log(response.data);

  //     } else {
  //       const response = await axios.patch(`http://localhost:3000/user/${id}`, {
  //         block: false,
  //       });
  //       console.log(response.data);

  //     }

  //   } catch (error) {
  //     console.error(error);

  //   }

  // };

  console.log(stated);

  return (
    <div className="pl-[300px] pt-20">
      <Link to={'/admin_users'}>
        <ArrowLeft />
      </Link>
      <div key={stated?.id}>
        <div className="flex border pr-8 mx-24 w-[450px]">
          <img
            className="w-32 mx-14"
            src="https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"
            alt="Profile"
          />

          <div>
            <h1 className="text-xl mt-7">
              <label className="font-bold">Name : </label>
              {stated?.username}
            </h1>
            <h1>
              <label className="font-bold">E-mail : </label>
              {stated?.email}
            </h1>
            <br />

            <div className="pb-3">
              <button className="bg-red-500 w-20 " onClick={blockUser}>
                {stated?.block ? "unblock" : "block"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
