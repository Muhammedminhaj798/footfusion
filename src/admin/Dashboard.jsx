import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { UsersContext } from '../context/UserContext'
import { ProductContext } from '../context/Context'
import { AuthContext } from '../context/AuthProvider'
import { Link } from 'react-router-dom'


function Dashboard() {
    const {datas} = useContext(UsersContext)
    const {data} = useContext(ProductContext)
    const [order , setOrder] = useState([])
    useEffect(() => {
        const fetchOrders = async () => {
          try {
            const response = await axios.get("http://localhost:3000/orders");
            setOrder(response.data);
            console.log(response.data);
          } catch (error) {
            console.error("Error fetching orders:", error);
          }
        };
        fetchOrders();
      }, []);
    

  return (
    <div className='ml-64 fixed flex bg-green-100 h-screen w-screen'>
      <div className='ml-96 flex mt-10'>
        <Link to={'/admin_users'}>
        <div className='w-44 -ml-48 h-24 bg-green-200 rounded-lg mt-48  hover:scale-105  transition-all duration-500'>
            <h1 className='font-bold text-center text-2xl'>total user</h1>
            <h1 className='font-bold text-center text-2xl pt-7'>{datas.length}</h1>
        </div>
        </Link>
        <Link to={'/admin-product'}>
        <div className='w-44 h-24 bg-green-200 rounded-lg mt-48 ml-24  hover:scale-105 transition-all duration-500'>
            <h1 className='font-bold text-center text-2xl'>total products</h1>
            <h1 className='font-bold text-center text-2xl pt-7'>{data.length}</h1>
        </div>
        </Link>
        <Link to={'/orders'}>
        <div className='w-44 h-24 bg-green-200 rounded-lg mt-48 ml-28  hover:scale-105 transition-all duration-500'>
            <h1 className='font-bold text-center text-2xl'>total orders</h1>
            <h1 className='font-bold text-center text-2xl pt-7'>{order.length}</h1>
        </div>
        </Link>
        </div>
    </div>
  )
}

export default Dashboard
