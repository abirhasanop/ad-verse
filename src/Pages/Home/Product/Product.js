import React from 'react';
import { MdLocationPin } from "react-icons/md"
import { GoVerified } from "react-icons/go"

const Product = ({ product, setProduct }) => {
    const { img, sellerName, varified, name, originalPrice, location, yearsOfUse, condition, description, resalePrice, _id, status } = product



    return (
        <div className="card card-compact w-80 bg-base-100 rounded-lg shadow-2xl">
            <figure><img className='w-full h-52' src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h4 className='text-sm font-bold flex items-center'>
                    Sellers Name: {sellerName}
                    {
                        varified ?
                            <GoVerified className='text-blue-400 ml-1' /> : ""
                    }
                </h4><hr />
                <div>
                    <h2 className="card-title ">{name}</h2>
                    <div className='flex w-full items-center'>
                        <p className='font-semibold'>Original Price: {originalPrice} </p>
                        <p className='font-semibold text-lg text-end text-orange-500'>{status} </p>
                    </div>
                </div>
                <p className='font-light text-base flex items-center text-gray-500'><MdLocationPin /> {location}</p>
                <div className='font-semibold flex justify-between '>
                    <p>Used: {yearsOfUse + ''}</p>
                    <p className='text-end'>Condition: {condition}</p>
                </div>
                <p>{description.length > 100 ? description.slice(0, 100) + "..." : description}</p>
                <div className="card-actions justify-between items-center">
                    <h3 className='text-xl font-bold'><span className='text-orange-500'>Price</span>: ${resalePrice}</h3>
                    <label onClick={() => setProduct(product)} htmlFor="my-modal-3" className="btn bg-orange-500 border-none">Purchase</label>
                </div>
            </div>
        </div>
    );
};

export default Product;