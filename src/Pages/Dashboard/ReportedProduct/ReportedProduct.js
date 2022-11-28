import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const ReportedProduct = () => {

    const { data: reportedPriduct = [], refetch } = useQuery({
        queryKey: ["reportedproduct"],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/allproducts/report`)
            const data = await res.json()
            return data
        }
    })


    const handleProductDelete = async (_id) => {
        const res = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/report/${_id}`)
        console.log(res.data);
        refetch()
    }





    return (
        <div>
            <h1 className='text-3xl mb-5'>Reported Product</h1>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>

                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reportedPriduct.map((product, i) => {
                                const { img, name, location, sellerName, sellerEmail, resalePrice, _id, status } = product
                                return (
                                    <tr key={i}>
                                        <th>
                                            {i + 1}
                                        </th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={img} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{name}</div>
                                                    <div className="text-sm opacity-50">{location}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {sellerName}
                                            <br />
                                            <span className="badge badge-ghost badge-sm">{sellerEmail}</span>
                                        </td>
                                        <td>{resalePrice}</td>
                                        <th>
                                            <button onClick={() => handleProductDelete(_id)} className="btn btn-error btn-xs">Delete</button>
                                        </th>
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

export default ReportedProduct;