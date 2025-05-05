import { createContext, useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../AxiosInstence";

export const UsersContext = createContext();
function UserContext({ children }) {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const featch = async () => {
      const response = await axiosInstance.get('/admin/usersList');
      setDatas(response.data.data);
    };
    featch();
  }, []);
  // console.log("datas",datas);

  // console.log("datas",datas);
  return (
    <div>
      <UsersContext.Provider value={{ datas }}>
        {children}
      </UsersContext.Provider>
    </div>
  );
}

export default UserContext;
