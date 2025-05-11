import React, { useEffect, useState } from 'react';
import axiosInstance from '../AxiosInstence';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/admin/getOrderDetails');
        console.log('API Response:', response.data.data); // Debug: Log full response
        const ordersData = Array.isArray(response.data.data) ? response.data.data : [];
        // Log missing fields for debugging
        ordersData.forEach((order, index) => {
          if (!order.products?.every((p) => p.productId?.price)) {
            console.warn(`Order ${index + 1} missing productId.price in products`, order);
          }
          if (!order.userId?.name) {
            console.warn(`Order ${index + 1} missing userId.name`, order);
          }
          if (!order.totalAmount) {
            console.warn(`Order ${index + 1} missing totalAmount`, order);
          }
        });
        setOrders(ordersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load orders. Please try again later.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Handle status change (shippingStatus or totalStatus)
  const handleStatusChange = async (orderId, field, newStatus) => {
    try {
      const payload = {};
      if (field === 'shippingStatus') payload.shippingStatus = newStatus;
      if (field === 'totalStatus') payload.totalStatus = newStatus;

      const response = await axiosInstance.put(`/admin/orderStatus/${orderId}`, payload);
      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, [field]: newStatus } : order
        )
      );
      // Optional: Show success message
      alert(`${field === 'shippingStatus' ? 'Shipping' : 'Payment'} status updated successfully!`);
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      alert(
        `Failed to update ${field === 'shippingStatus' ? 'shipping' : 'payment'} status: ${
          error.response?.data?.message || 'Please try again.'
        }`
      );
    }
  };

  // Calculate total orders
  const totalOrders = orders.length;

  // Calculate total products across all orders
  const totalProducts = orders.reduce((total, order) => {
    return total + (order.products?.length || 0);
  }, 0);

  if (loading) {
    return <div className="flex justify-center p-8">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4 text-center">{error}</div>;
  }

  return (
    <div className="p-4 w-[1230px] ml-[300px]">
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

      {/* Orders List (Cards) */}
      <h2 className="text-xl font-bold mb-4">Orders</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order, index) => {
          const orderTotal = order.totalAmount || 0;
          const orderDate = order.purchaseDate
            ? new Date(order.purchaseDate).toLocaleDateString()
            : 'N/A';

          return (
            <div
              key={order._id || index}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">
                  Order #{order._id ? order._id.slice(-6).toUpperCase() : `ORD-${index + 1000}`}
                </h3>
                <div className="flex space-x-2">
                  <select
                    value={order.totalStatus || 'Pending'}
                    onChange={(e) => handleStatusChange(order._id, 'totalStatus', e.target.value)}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Failed">Failed</option>
                  </select>
                  <select
                    value={order.shippingStatus || 'Pending'}
                    onChange={(e) => handleStatusChange(order._id, 'shippingStatus', e.target.value)}
                    className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Customer: <span className="font-medium">{order.userId?.name || 'N/A'}</span>
              </p>
              <p className="text-sm text-gray-600">
                Date: <span className="font-medium">{orderDate}</span>
              </p>
              <p className="text-sm text-gray-600">
                Items: <span className="font-medium">{order.products?.length || 0}</span>
              </p>
              <p className="text-sm text-gray-600">
                Total: <span className="font-bold">${orderTotal.toFixed(2)}</span>
              </p>
            </div>
          );
        })}
        {orders.length === 0 && (
          <div className="col-span-full text-center text-gray-500 p-8">
            No orders found
          </div>
        )}
      </div>

      {/* Order Details Section (Cards) */}
      <h2 className="text-xl font-bold mt-8 mb-4">Order Details</h2>
      {orders.map((order, orderIndex) => (
        <div key={order._id || orderIndex} className="mb-6 bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Order #{order._id ? order._id.slice(-6).toUpperCase() : `ORD-${orderIndex + 1000}`}
            </h3>
            <div className="flex space-x-2">
              <select
                value={order.totalStatus || 'Pending'}
                onChange={(e) => handleStatusChange(order._id, 'totalStatus', e.target.value)}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Failed">Failed</option>
              </select>
              <select
                value={order.shippingStatus || 'Pending'}
                onChange={(e) => handleStatusChange(order._id, 'shippingStatus', e.target.value)}
                className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs"
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600">Customer:</p>
              <p className="font-medium">{order.userId?.name || 'N/A'}</p>
            </div>
          </div>

          <div className="space-y-4">
            {order.products?.map((product, productIndex) => {
              const productPrice = product.productId?.price || 0;
              const productTotal = productPrice * (product.quantity || 0);

              return (
                <div
                  key={product._id || productIndex}
                  className="bg-gray-50 p-3 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {product.productId?.name || 'Unknown Product'}
                    </p>
                    <p className="text-sm text-gray-600">Quantity: {product.quantity || 0}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Price: ${productPrice.toFixed(2)}</p>
                    <p className="text-sm font-medium">Total: ${productTotal.toFixed(2)}</p>
                  </div>
                </div>
              );
            }) || (
              <div className="text-sm text-center text-gray-500 p-4">
                No products found
              </div>
            )}
          </div>

          <div className="mt-4 text-right">
            <p className="text-sm font-medium">
              Order Total:{' '}
              <span className="font-bold">${(order.totalAmount || 0).toFixed(2)}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;