import React, { useContext, useEffect, useState } from 'react';
import { UsersContext } from '../context/UserContext';
import { ProductContext } from '../context/Context';
import { AuthContext } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import axiosInstance from '../AxiosInstence';
import { 
  Users, 
  ShoppingBag, 
  Package, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Clock,
  ArrowUp,
  ArrowDown 
} from 'lucide-react';

function Dashboard() {
  const { datas } = useContext(UsersContext);
  const { data } = useContext(ProductContext);
  const [orders, setOrders] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [stats, setStats] = useState({
    userGrowth: 12.5,
    productGrowth: 8.3,
    orderGrowth: 15.8,
    revenueGrowth: 23.4
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/admin/getOrderDetails');
        const allOrders = response.data.data;
        
        // Set all orders
        setOrders(allOrders);
        
        // Calculate total revenue from orders
        const revenue = allOrders.reduce((total, order) => {
          return total + (parseFloat(order.totalAmount) || 0);
        }, 0);
        setTotalRevenue(revenue);
        
        // Get 5 most recent orders
        const recent = [...allOrders]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);
        setRecentOrders(recent);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Format date helper
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format currency helper
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen ml-[300px]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Users Card */}
          <Link to="/admin_users" className="block">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 font-medium mb-1">Total Users</p>
                  <h3 className="text-2xl font-bold text-gray-800">{datas.length}</h3>
                  <div className="flex items-center mt-2">
                    {stats.userGrowth >= 0 ? (
                      <>
                        <ArrowUp size={16} className="text-green-500 mr-1" />
                        <span className="text-green-500 text-sm font-medium">{stats.userGrowth}%</span>
                      </>
                    ) : (
                      <>
                        <ArrowDown size={16} className="text-red-500 mr-1" />
                        <span className="text-red-500 text-sm font-medium">{Math.abs(stats.userGrowth)}%</span>
                      </>
                    )}
                    <span className="text-gray-500 text-sm ml-1">vs last month</span>
                  </div>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users size={24} className="text-blue-600" />
                </div>
              </div>
            </div>
          </Link>
          
          {/* Products Card */}
          <Link to="/admin-product" className="block">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 font-medium mb-1">Total Products</p>
                  <h3 className="text-2xl font-bold text-gray-800">{data.length}</h3>
                  <div className="flex items-center mt-2">
                    {stats.productGrowth >= 0 ? (
                      <>
                        <ArrowUp size={16} className="text-green-500 mr-1" />
                        <span className="text-green-500 text-sm font-medium">{stats.productGrowth}%</span>
                      </>
                    ) : (
                      <>
                        <ArrowDown size={16} className="text-red-500 mr-1" />
                        <span className="text-red-500 text-sm font-medium">{Math.abs(stats.productGrowth)}%</span>
                      </>
                    )}
                    <span className="text-gray-500 text-sm ml-1">vs last month</span>
                  </div>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Package size={24} className="text-purple-600" />
                </div>
              </div>
            </div>
          </Link>
          
          {/* Orders Card */}
          <Link to="/orders" className="block">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-amber-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 font-medium mb-1">Total Orders</p>
                  <h3 className="text-2xl font-bold text-gray-800">{orders.length}</h3>
                  <div className="flex items-center mt-2">
                    {stats.orderGrowth >= 0 ? (
                      <>
                        <ArrowUp size={16} className="text-green-500 mr-1" />
                        <span className="text-green-500 text-sm font-medium">{stats.orderGrowth}%</span>
                      </>
                    ) : (
                      <>
                        <ArrowDown size={16} className="text-red-500 mr-1" />
                        <span className="text-red-500 text-sm font-medium">{Math.abs(stats.orderGrowth)}%</span>
                      </>
                    )}
                    <span className="text-gray-500 text-sm ml-1">vs last month</span>
                  </div>
                </div>
                <div className="bg-amber-100 p-3 rounded-full">
                  <ShoppingBag size={24} className="text-amber-600" />
                </div>
              </div>
            </div>
          </Link>
          
          {/* Revenue Card */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-medium mb-1">Total Revenue</p>
                <h3 className="text-2xl font-bold text-gray-800">{formatCurrency(totalRevenue)}</h3>
                <div className="flex items-center mt-2">
                  {stats.revenueGrowth >= 0 ? (
                    <>
                      <ArrowUp size={16} className="text-green-500 mr-1" />
                      <span className="text-green-500 text-sm font-medium">{stats.revenueGrowth}%</span>
                    </>
                  ) : (
                    <>
                      <ArrowDown size={16} className="text-red-500 mr-1" />
                      <span className="text-red-500 text-sm font-medium">{Math.abs(stats.revenueGrowth)}%</span>
                    </>
                  )}
                  <span className="text-gray-500 text-sm ml-1">vs last month</span>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign size={24} className="text-green-600" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders Table */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
              <Link to="/orders" className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                View All
              </Link>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : recentOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          #{order._id.substring(order._id.length - 6).toUpperCase()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {order.user?.name || "Anonymous"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.createdAt ? formatDate(order.createdAt) : "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {formatCurrency(order.totalAmount || 0)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status || "pending")}`}>
                            {order.status || "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-12 text-center text-gray-500">
                No recent orders found.
              </div>
            )}
          </div>
          
          {/* Statistics and Updates Panel */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Statistics</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-md mr-3">
                      <TrendingUp size={20} className="text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">Active Users</span>
                  </div>
                  <span className="font-semibold">{Math.round(datas.length * 0.7)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-2 rounded-md mr-3">
                      <ShoppingBag size={20} className="text-purple-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">Conversion Rate</span>
                  </div>
                  <span className="font-semibold">23.5%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-amber-100 p-2 rounded-md mr-3">
                      <Calendar size={20} className="text-amber-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">Orders Today</span>
                  </div>
                  <span className="font-semibold">{Math.floor(Math.random() * 10) + 1}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-md mr-3">
                      <Clock size={20} className="text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">Avg. Processing Time</span>
                  </div>
                  <span className="font-semibold">1.2 days</span>
                </div>
              </div>
            </div>
            
            {/* Top Products */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Categories</h2>
              
              <div className="space-y-4">
                {['men', 'women', 'kid'].map((category, index) => {
                  const count = data.filter(item => item.type === category).length;
                  const percentage = data.length > 0 ? Math.round((count / data.length) * 100) : 0;
                  
                  return (
                    <div key={category} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium capitalize text-gray-600">{category}</span>
                        <span className="text-sm text-gray-500">{percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-purple-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;