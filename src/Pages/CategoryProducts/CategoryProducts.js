import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Product from '../Home/Product/Product';
import categoryImg1 from '../../Assets/categoryOption1.jpg'
import categoryImg2 from '../../Assets/categoryOption2.jpg'
import PurchaseModal from '../../Components/PurchaseModal/PurchaseModal';
import ColorRingSpinner from '../../Components/ReactSpinner/ColorRingSpinner';

const CategoryProducts = () => {
    const [product, setProduct] = useState(null)
    const { categoryName } = useParams()

    const { data: categoryProducts = [], refetch, isLoading } = useQuery({
        queryKey: ["categoryProducts", categoryName],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/allproducts/${categoryName}`)
            const data = res.json()
            return data
        }
    })

    const categoryOptions = [
        { categoryName: "Xiaomi", img: categoryImg1 },
        { categoryName: "Samsung", img: "https://images.unsplash.com/photo-1488509082528-cefbba5ad692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGhvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" },
        { categoryName: "Iphone", img: categoryImg2 },
    ]

    if (isLoading) {
        return <ColorRingSpinner />
    }




    // scroll bar issue fixing
    // useEffect(() => {
    //     document.body.style.overflow = 'hidden'
    //     document.body.style.maxHeight = '100vh'
    //     return () => {
    //         document.body.style.overflow = 'scroll'
    //         document.body.style.maxHeight = 'auto'
    //     }
    // }, [])



    console.log(categoryProducts);
    return (
        <div className=' mt-7'>

            {/* Drawer*/}
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content pl-10">
                    {/* button */}
                    <label htmlFor="my-drawer-2" className="btn btn-circle swap swap-rotate drawer-button lg:hidden">
                        <input type="checkbox" />
                        <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" /></svg>
                        <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>
                    </label>


                    {/* Products */}

                    <div className='flex flex-wrap gap-10'>
                        {
                            categoryProducts?.map(product => <Product key={product._id} product={product} setProduct={setProduct} />)
                        }
                    </div>
                    {
                        product && <PurchaseModal product={product} setProduct={setProduct} refetch={refetch} />
                    }
                </div>

                {/* menu */}
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">
                        {
                            categoryOptions?.map((categoryOption, i) => {
                                const { categoryName } = categoryOption
                                return (
                                    <li key={i}><Link to={`/category-products/${categoryName}`}>{categoryName}</Link></li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>



        </div>
    );
};

export default CategoryProducts;