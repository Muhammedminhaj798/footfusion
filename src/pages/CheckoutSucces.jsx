import React from 'react';
import { useParams } from 'react-router-dom';

const CheckoutSucces = () => {
    const {id}=useParams()
    console.log(id);
    
    return (
        <div>
            {`the id is ${id}`}
            <h1>HELLO WORLD</h1>
        </div>
    );
}

export default CheckoutSucces;
