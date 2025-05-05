import React, { useContext } from 'react';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'

import { CartContext } from '../context/CartProvider';



export default function Checkoutpayment() {
 const {client,stripePromise} = useContext(CartContext)
 console.log(client);
 
  const option = {clientSecret: client }

  return (
    <div className='bg-gray-50'>
      <div className="m-auto max-w-3xl p-5 text-orange-900 pt-20 bg-gray-50">
        <h1 className="text-2xl py-3 text-center">Payment</h1>
        <EmbeddedCheckoutProvider stripe={stripePromise} options={option}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    </div>

  )
}