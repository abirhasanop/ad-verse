import React, { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import MyProduct from './MyProduct';
import toast from 'react-hot-toast';
const MyProducts = () => {
    const { user } = useContext(AuthContext)
    const { data: myProducts = [], refetch } = useQuery({
        queryKey: ["myproducts"],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/myproducts?email=${user?.email}`)
            const data = await res.json()
            return data
        }
    })


    const handleProductDelete = (_id) => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/myproducts/${_id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch()
                toast.success("Deleted Succesfully")
            })
    }

    const handleAdvertize = (_id) => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/allproduct/${_id}`, {
            method: "PUT",
            // headers: {
            //     "content-type": "application/json",
            // },
            // body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success(`Advertized Succesfully`)
            })
    }

    console.log(myProducts);
    return (
        <div>
            <h1 className="text-3xl">My Products {myProducts.length}</h1>

            <div className='flex flex-wrap gap-10'>
                {
                    myProducts?.map(myProduct => <MyProduct key={myProduct._id} myProduct={myProduct} handleProductDelete={handleProductDelete} handleAdvertize={handleAdvertize} />)
                }
            </div>
        </div>
    );
};

export default MyProducts;