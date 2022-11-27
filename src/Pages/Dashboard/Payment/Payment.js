import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {
    const order = useLoaderData()
    const { productName, price } = order

    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

    console.log(process.env.REACT_APP_STRIPE_PK);

    return (
        <div>
            <h1 className="text-3xl font-semibold">Payment for {productName} - $<span className='text-orange-600'>{price}</span></h1>
        </div>
    );
};

export default Payment;