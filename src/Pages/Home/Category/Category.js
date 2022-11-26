import React, { useState } from 'react';
import categoryImg1 from '../../../Assets/categoryOption1.jpg'
import categoryImg2 from '../../../Assets/categoryOption2.jpg'
import { Link } from 'react-router-dom'

const Category = () => {

    const categoryOptions = [
        { categoryName: "Xiaomi", img: categoryImg1 },
        { categoryName: "Samsung", img: "https://images.unsplash.com/photo-1488509082528-cefbba5ad692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGhvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" },
        { categoryName: "Iphone", img: categoryImg2 },
    ]


    return (
        <section className='container mx-auto my-32'>
            <div>
                <h1 className='text-4xl font-bold'>Category</h1><hr className='my-7' />
            </div>

            {/* category Options */}
            <section className='flex justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-32'>
                    {
                        categoryOptions?.map((categoryOption, i) => {
                            const { categoryName } = categoryOption
                            return (
                                <Link key={i} to={`/category-products/${categoryName}`}>
                                    <section

                                        style={{ backgroundImage: `url(${categoryOption.img})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', width: "20rem", height: "24rem" }}
                                        className='w-80 h-96 rounded-xl cursor-pointer p-12'
                                    >
                                        <h2 className=' text-white font-bold text-3xl'>{categoryName}</h2>
                                    </section>
                                </Link>
                            )
                        })
                    }
                </div>
            </section>
        </section>
    );
};

export default Category;