import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UsersContext = createContext();
function UserContext({ children }) {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const featch = async () => {
      const response = await axios.get("http://localhost:8080/api/admin/usersList");
      setDatas(response.data);
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
