import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import BlockSpinner from '../../../Components/ReactSpinner/BlockSpinner';
import { AuthContext } from '../../../Contexts/AuthProvider';

const MyOrders = () => {
    const { user } = useContext(AuthContext)


    const { data: myOrders = [], refetch, isLoading } = useQuery({
        queryKey: ["myorders"],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/orders?email=${user?.email}`)
            const data = await res.json()
            return data
        }
    })

    // console.log(myOrders);


    if (isLoading) {
        return <BlockSpinner />
    }




    const handleCancelOrder = (_id, productId) => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/orders/delete/${_id}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ productId })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success("Order Cancelled")
                refetch()
            })
    }

    return (
        <div>
            <h1 className='text-3xl mb-5'>My Orders</h1>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Payment</th>
                            <th>Cancel Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myOrders?.map((order, i) => {
                                const { _id, img, productName, price, productId, isPaid } = order
                                console.log(order);

                                return (
                                    <tr key={_id}>
                                        <th>{i + 1}</th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={img} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{productName}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {price}
                                        </td>
                                        <th>
                                            {
                                                !isPaid ? <>
                                                    <Link to={`/dashboard/myorders/payment/${_id}`}>
                                                        <button className="btn btn-success text-white btn-xs">Pay Now</button>
                                                    </Link>
                                                </> :
                                                    <>
                                                        <button className="btn btn-accent text-white btn-xs">Paid</button>
                                                    </>
                                            }
                                        </th>
                                        <td>
                                            <button disabled={isPaid} onClick={() => handleCancelOrder(_id, productId)} className="btn btn-error btn-xs">Cancel</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyOrders;