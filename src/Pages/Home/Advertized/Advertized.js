import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import PurchaseModal from '../../../Components/PurchaseModal/PurchaseModal';
import BlockSpinner from '../../../Components/ReactSpinner/BlockSpinner';
import Product from '../Product/Product';

const Advertized = () => {
    const [product, setProduct] = useState(null)

    const { data: advertizedProduct = [], refetch, isLoading } = useQuery({
        queryKey: ["advertizedproduct"],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/advertizedproduct`)
            const data = await res.json()
            return data
        }
    })

    if (isLoading) {
        return <BlockSpinner />
    }



    return (
        <section className='container mx-auto my-32'>
            <div>
                <h1 className='text-4xl font-bold'>Advertized {advertizedProduct.length}</h1><hr className='my-7' />
            </div>


            <section id='allproducts' className='flex justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
                    {
                        advertizedProduct?.map((product, i) => <Product key={i} product={product} setProduct={setProduct} />)
                    }
                </div>
            </section>
            {
                product && <PurchaseModal product={product} setProduct={setProduct} refetch={refetch} />
            }
        </section>
    );
};

export default Advertized;