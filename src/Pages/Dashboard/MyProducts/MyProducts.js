import React, { useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import MyProduct from './MyProduct';
const MyProducts = () => {
    const { user } = useContext(AuthContext)
    const { data: myProducts = [] } = useQuery({
        queryKey: ["myproducts"],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/myproducts?email=${user?.email}`)
            const data = await res.json()
            return data
        }
    })

    console.log(myProducts);
    return (
        <div>
            <h1 className="text-3xl">My Products {myProducts.length}</h1>

            <div className='flex flex-wrap gap-10'>
                {
                    myProducts?.map(myProduct => <MyProduct key={myProduct._id} myProduct={myProduct} />)
                }
            </div>
        </div>
    );
};

export default MyProducts;