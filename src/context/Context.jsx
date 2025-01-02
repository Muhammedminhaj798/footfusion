import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

function Context({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:3000/product");
        setData(response.data);
      } catch (error) {
        console.error("Error is : ", error);
      }
    };
    fetch();
  }, []);

  return (
    <ProductContext.Provider value={{ data }}>
      {children}
    </ProductContext.Provider>
  );
}

export default Context;
