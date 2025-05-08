import React, { useEffect, useState } from 'react';
import axiosInstance from '../AxiosInstence';

// OrderDetails.jsx
const OrderDetails = () => {
    const [orders, setOrders] = useState([])
    console.log("ordersssssssss", orders);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axiosInstance.get('/user/getAllOrders')
                console.log(response.data.data.order);

                setOrders(response.data.data.order)
            } catch (error) {
                console.log(error);

            }
        }
        fetch()
    }, [])
    return (
        <div className='mt-16'>
            <h1 className=' p-2 w-full text-center font-extrabold text-3xl'>Orders</h1>

            <div>
                {orders.map((item, index) => (
                    <div key={index} className='mb-4 p-2 border border-gray-300'>
                        <h2 className='font-bold'>Order Date: {item.purchaseDate}</h2>
                        <div className='ml-4'>
                            {item.products.map((product, i) => (
                                <div key={i} className='w-52 h-24 bg-red-300 mb-2 p-2'>
                                    <div>Product Name: {product.name}</div>
                                    <div>Quantity: {product.quantity}</div>
                                    {/* Add more fields if available */}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default OrderDetails;


