import React, { useEffect, useState } from 'react';
import axiosInstance from '../AxiosInstence';
import { ShoppingBag, Package, Calendar, CreditCard, Clock, Truck } from 'lucide-react';

const OrderDetails = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/user/getAllOrders');
                setOrders(response.data.data.order);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setError("Failed to load orders. Please try again later.");
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);
    console.log("ordersssssssss:", orders);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Function to get shipping status color and text
    const getShippingStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return { color: 'text-yellow-600', bg: 'bg-yellow-100' };
            case 'shipped':
                return { color: 'text-blue-600', bg: 'bg-blue-100' };
            case 'delivered':
                return { color: 'text-green-600', bg: 'bg-green-100' };
            default:
                return { color: 'text-gray-600', bg: 'bg-gray-100' };
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 p-4 rounded-md mt-16">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Error</h3>
                        <div className="mt-2 text-sm text-red-700">
                            <p>{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="mt-16 flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
                <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700">No Orders Yet</h2>
                <p className="text-gray-500 mt-2">Looks like you haven't placed any orders yet.</p>
                <button className="mt-6 px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
                    Start Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto mt-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                    <ShoppingBag className="mr-3 h-8 w-8 text-blue-600" />
                    My Orders
                </h1>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
                </span>
            </div>

            <div className="space-y-6">
                {orders.map((order, index) => {
                    const shippingStatus = order.shippingStatus || 'Pending'; // Default to 'Pending' if not provided
                    const { color, bg } = getShippingStatusStyles(shippingStatus);

                    return (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                            <div className="bg-gray-50 p-4 border-b border-gray-100">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                    <div className="flex items-center mb-2 sm:mb-0">
                                        <Clock className="h-5 w-5 text-gray-500 mr-2" />
                                        <span className="text-sm text-gray-500">Ordered on</span>
                                        <span className="ml-2 text-sm font-medium text-gray-900">{formatDate(order.purchaseDate)}</span>
                                    </div>
                                    <div className="flex space-x-4">
                                        <div className="flex items-center">
                                            <Package className="h-5 w-5 text-green-500 mr-2" />
                                            <span className="text-sm font-medium text-green-600">
                                                {order.products.length} {order.products.length === 1 ? 'Item' : 'Items'}
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <CreditCard className="h-5 w-5 text-blue-500 mr-2" />
                                            <span className="text-sm font-medium text-blue-600">
                                                Order #{order._id ? order._id.substring(0, 8) : index}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4">
                                {/* Shipping Status */}
                                <div className="mb-4 flex items-center">
                                    <Truck className={`h-5 w-5 ${color} mr-2`} />
                                    <span className={`text-sm font-medium ${color} ${bg} px-3 py-1 rounded-full`}>
                                        Shipping Status: {shippingStatus}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {order.products.map((product, i) => (
                                        <div key={i} className="flex bg-white border border-gray-200 rounded-lg overflow-hidden">
                                            <div className="w-24 h-24 bg-gray-100 flex items-center justify-center">
                                                {product.productId.image ? (
                                                    <img
                                                        src={product.productId.image}
                                                        alt={product.productId.name}
                                                        className="object-cover h-full w-full"
                                                    />
                                                ) : (
                                                    <Package className="h-10 w-10 text-gray-400" />
                                                )}
                                            </div>
                                            <div className="flex-1 p-3">
                                                <h3 className="font-semibold text-gray-900 truncate">{product.productId.name}</h3>
                                                <div className="mt-1 flex items-center">
                                                    <span className="text-sm text-gray-500">Qty:</span>
                                                    <span className="ml-1 text-sm font-medium text-gray-900">{product.quantity}</span>
                                                </div>
                                                {product.price && (
                                                    <div className="mt-1 text-sm font-medium text-gray-900">
                                                        ${(product.price * product.quantity).toFixed(2)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {order.totalAmount && (
                                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                                        <div className="text-right">
                                            <div className="text-sm text-gray-500">Total Amount</div>
                                            <div className="text-lg font-semibold text-gray-900">${order.totalAmount.toFixed(2)}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OrderDetails;