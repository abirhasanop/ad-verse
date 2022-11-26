import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllBuyers = () => {

    const { data: allBuyers = [] } = useQuery({
        queryKey: ["allbuyers"],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/buyers`)
            const data = await res.json()
            return data
        }
    })
    console.log(allBuyers);

    return (
        <div>
            <h1 className="text-3xl">All Buyers</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Verify</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allBuyers?.map((buyer, i) => {
                                const { name, email, role } = buyer
                                return (
                                    <tr key={i} className="hover">
                                        <th>{i + 1}</th>
                                        <td>{name}</td>
                                        <td>{email}</td>
                                        <td>{role}</td>
                                        <td><button className='btn text-white btn-success btn-xs'>Verify</button></td>
                                        <td><button className='btn text-white btn-error btn-xs'>Delete</button></td>
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

export default AllBuyers;