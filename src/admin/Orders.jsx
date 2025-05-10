import React, { useEffect, useState } from "react";
import axiosInstance from "../AxiosInstence";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/admin/getOrderDetails');
        setOrders(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to load orders. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  // Calculate total orders
  const totalOrders = orders.length;
  
  // Calculate total products across all orders
  const totalProducts = orders.reduce((total, order) => {
    return total + order.products.length;
  }, 0);

  if (loading) {
    return <div className="flex justify-center p-8">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4 text-center">{error}</div>;
  }

  return (
    <div className="p-4">
      {/* Summary Statistics */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-blue-800">Total Orders</h3>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-green-800">Total Products Ordered</h3>
          <p className="text-2xl font-bold">{totalProducts}</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">No.</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Order ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Customer</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Shipping Address</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Items</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Total Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order, index) => {
              // Calculate total amount for this order
              const orderTotal = order.products.reduce((sum, product) => {
                return sum + (product.totalAmount || 0);
              }, 0);
              
              // Format date if available
              const orderDate = order.createdAt 
                ? new Date(order.createdAt).toLocaleDateString() 
                : "N/A";
              
              return (
                <tr key={order._id || index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-500">{index + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium">
                    {order._id ? order._id.slice(-6).toUpperCase() : `ORD-${index + 1000}`}
                  </td>
                  <td className="px-4 py-3 text-sm">{order.name || "N/A"}</td>
                  <td className="px-4 py-3 text-sm">{order.address || "N/A"}</td>
                  <td className="px-4 py-3 text-sm">{orderDate}</td>
                  <td className="px-4 py-3 text-sm">{order.products.length}</td>
                  <td className="px-4 py-3 text-sm font-medium">
                    ${orderTotal.toFixed(2)}
                  </td>
                </tr>
              );
            })}
            
            {orders.length === 0 && (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Order Details Section */}
      <h2 className="text-xl font-bold mt-8 mb-4">Order Details</h2>
      
      {orders.map((order, orderIndex) => (
        <div key={order._id || orderIndex} className="mb-6 bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Order #{order._id ? order._id.slice(-6).toUpperCase() : `ORD-${orderIndex + 1000}`}
            </h3>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {order.status || "Processing"}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600">Customer:</p>
              <p className="font-medium">{order.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Shipping Address:</p>
              <p className="font-medium">{order.address || "N/A"}</p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">No.</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Product</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Quantity</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Price</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {order.products.map((product, productIndex) => (
                  <tr key={product._id || productIndex} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm">{productIndex + 1}</td>
                    <td className="px-4 py-2 text-sm font-medium">
                      {product.productId?.name || "Product Name"}
                    </td>
                    <td className="px-4 py-2 text-sm">{product.quantity || 0}</td>
                    <td className="px-4 py-2 text-sm text-right">
                      ${(product?.price || 0).toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-sm font-medium text-right">
                      ${(product.totalAmount || 0).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan="4" className="px-4 py-2 text-right font-medium">Order Total:</td>
                  <td className="px-4 py-2 text-right font-bold">
                    ${order.products.reduce((sum, product) => sum + (product.totalAmount || 0), 0).toFixed(2)}
                  </td>
                </tr> 
              </tfoot>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
} 

export default Orders;