import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect } from 'react';
import { useState } from 'react';

const CheckoutForm = ({ order }) => {
    const [cardError, setCardError] = useState('')
    const [success, setSucces] = useState("")
    const [transactionId, setTransactionId] = useState("")
    const [processing, setProcessing] = useState(false)
    const [clientSecret, setClientSecret] = useState("");

    const stripe = useStripe()
    const elements = useElements()
    const { price, buyerName, email, _id } = order


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch(`${process.env.REACT_APP_SERVER_URL}/create-payment-intent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);




    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log(error);
            setCardError(error.message)
        } else {
            setCardError("")
        }


        setSucces("")
        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: buyerName,
                        email: email
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message)
            return
        }

        if (paymentIntent.status === "succeeded") {
            setSucces("Your Payment completed")
            setTransactionId(paymentIntent.id)


            const payment = {
                price,
                transactionId: paymentIntent.id,
                email,
                orderId: _id
            }

            fetch(`${process.env.REACT_APP_SERVER_URL}/payments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
        }
        setProcessing(false)
        console.log("payment Intent", paymentIntent);

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className={`btn btn-sm bg-orange-500 border-none mt-5 ${processing && "loading"}`} type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p className="text-red-500">{cardError}</p>
            {
                success && <>
                    <p className="text-green-500">{success}</p>
                    <p>Your Transaction Id <span className='font-bold'>{transactionId}</span></p>
                </>
            }
        </div>
    );
};

export default CheckoutForm;