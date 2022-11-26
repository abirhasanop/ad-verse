import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider';

const MyOrders = () => {
    const { user } = useContext(AuthContext)


    const { data: myOrders = [] } = useQuery({
        queryKey: ["myorders"],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/orders?email=${user?.email}`)
            const data = await res.json()
            return data
        }
    })

    console.log(myOrders);

    return (
        <div>
            <h1 className='text-3xl'>My Orders</h1>
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
                                const { _id, img, productName, price } = order

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
                                            <button className="btn btn-success text-white btn-xs">Pay</button>
                                        </th>
                                        <td>
                                            <button className="btn btn-error btn-xs">Cancel</button>
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