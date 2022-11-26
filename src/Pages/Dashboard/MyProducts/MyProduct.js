import React from 'react';
import { GoVerified } from 'react-icons/go';
import { MdLocationPin } from 'react-icons/md';
import { Link } from 'react-router-dom';

const MyProduct = ({ myProduct }) => {
    const { img, sellerName, varified, name, originalPrice, location, yearsOfUse, condition, description, resalePrice, _id, status } = myProduct



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
                    {/* dropdown btn */}
                    <div className="dropdown dropdown-top">
                        <label tabIndex={0} className="btn bg-orange-500 border-none m-1">Action</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg rounded-box w-52  bg-orange-50">
                            <li className='font-semibold text-success'><Link>Advertize Now</Link></li>
                            <li className='font-semibold text-error'><Link>Delete Product</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProduct;