import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { GoVerified } from 'react-icons/go';

const Allsellers = () => {
    const { data: allSellers = [], refetch } = useQuery({
        queryKey: ["allsellers"],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/sellers`)
            const data = await res.json()
            return data
        }
    })


    const handleVerify = (email, name) => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/seller/verify/${email}`)
            .then(res => res.json())
            .then(data => {
                if (data?.acknowledged) {
                    toast.success(`${name} Verified Succesfully`)
                    refetch()
                }
            })
    }


    const handleVerified = (name) => {
        toast.error(`${name} Alreary Verified`)
    }

    console.log(allSellers);

    return (
        <div>
            <h1 className="text-3xl">All Sellers</h1>
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
                            allSellers?.map((buyer, i) => {
                                const { name, email, role, varified } = buyer
                                return (
                                    <tr key={i} className="hover">
                                        <th>{i + 1}</th>
                                        <td className='flex items-center'>{name} {varified && <GoVerified className='ml-1 text-blue-400' />}</td>
                                        <td>{email}</td>
                                        <td>{role}</td>
                                        {
                                            !varified ?
                                                <>
                                                    <td onClick={() => handleVerify(email, name)}><button className='btn btn-accent text-white btn-xs'>Verify</button></td>
                                                </>
                                                : <>
                                                    <td><button onClick={() => handleVerified(name)} className='btn btn-success text-white btn-xs'>Verified</button></td>
                                                </>
                                        }
                                        <td><button className='btn btn-error text-white  btn-xs'>Delete</button></td>
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

export default Allsellers;