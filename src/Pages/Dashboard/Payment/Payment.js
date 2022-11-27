import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const Payment = () => {
    const order = useLoaderData()
    const { productName, price } = order

    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

    console.log(process.env.REACT_APP_STRIPE_PK);

    return (
        <div>
            <h1 className="text-3xl font-semibold">Payment for {productName} - $<span className='text-orange-600'>{price}</span></h1>

            {/* stripe form */}
            <section className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm order={order} />
                </Elements>
            </section>
        </div>
    );
};

export default Payment;