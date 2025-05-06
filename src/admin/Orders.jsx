import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosInstance from "../AxiosInstence";

function Orders() {
  const [order, setOrder] = useState([]);
console.log("ordercdetaoilf:", order);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/admin/getOrderDetails');
        setOrder(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);
 let number = 1;
  return (
    <>
        <h1 className="text-2xl ml-[350px] pt-12"><u>total orders</u></h1>
    <div className="mx-80 w-[1000px] p-4 pt-20">
      <table className="w-full text-left border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">no.</th>
            <th className="p-2 border">Product Name</th>
            <th className="p-2 border">Username</th>
            {/* <th className="p-2 border">address</th> */}
            <th className="p-2 border">Quantity</th>
            <th className="p-2 border">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {order.map((item, index) =>
            item.products.map((product, productIndex) => (
              <tr key={`${index}-${productIndex}`} className="h-12">
                <td className="p-2 border">{number ++}</td>
                <td className="p-2 border">{product.productId.name}</td>
                <td className="p-2 border">{item.name}</td>
                {/* <td className="p-2 border">{item.address}</td> */}
                <td className="p-2 border">{product.quantity}</td>
                <td className="p-2 border">{product.totalAmount || "N/A"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default Orders;
