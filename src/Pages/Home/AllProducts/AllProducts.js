import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import Product from '../Product/Product';
import PurchaseModal from '../../../Components/PurchaseModal/PurchaseModal';

const AllProducts = () => {
    const [product, setProduct] = useState(null)

    const { data: allProducts = [], refetch } = useQuery({
        queryKey: ["allproducts"],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/allproducts`)
            const data = await res.json()
            return data
        }
    })

    console.log(allProducts);



    return (
        <section className='container mx-auto my-32'>
            <div>
                <h1 className='text-4xl font-bold'>Explore All Products{allProducts.length}</h1><hr className='my-7' />
            </div>

            {/* products */}
            <section id='allproducts' className='flex justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
                    {
                        allProducts?.map((product, i) => <Product key={i} product={product} setProduct={setProduct} />)
                    }
                </div>
            </section>
            {
                product && <PurchaseModal product={product} setProduct={setProduct} refetch={refetch} />
            }
        </section>
    );
};

export default AllProducts;