import React, { useContext } from 'react';
import { MdLocationPin } from "react-icons/md"
import { GoVerified } from "react-icons/go"
import { AuthContext } from '../../../Contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Moment from 'react-moment';

const Product = ({ product, setProduct }) => {
    const { user } = useContext(AuthContext)
    const { img, sellerName, varified, name, originalPrice, location, yearsOfUse, condition, description, resalePrice, _id, status, postDate, isPaid } = product

    const navigate = useNavigate()
    const handleSendToLogin = () => {
        navigate("/login")
    }

    const handleReport = (product) => {

        console.log(product);

        fetch(`${process.env.REACT_APP_SERVER_URL}/allproducts/report`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success("Reported Succesfully")
                }
            })
    }


    return (
        <div className={`card card-compact w-80 bg-base-100 rounded-lg shadow-2xl ${isPaid && "hidden"}`}>
            <figure><img className='w-full h-52' src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <div className='flex justify-between items-center'>
                    <div>
                        <h4 className='text-sm font-bold flex items-center'>
                            Sellers Name: {sellerName}
                            {
                                varified ?
                                    <GoVerified className='text-blue-400 ml-1' /> : ""
                            }
                        </h4>
                        <p className='text-sm text-gray-400'>Posted: {postDate ? <Moment className="text-xs ml-1 text-gray-500" fromNow>
                            {postDate}
                        </Moment> : "7 days ago"}</p>
                    </div>
                    <button disabled={status === "Sold"} onClick={() => handleReport(product)} className='font-bold btn bg-orange-500 border-none btn-xs'>Report</button>
                </div><hr />
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
                    {
                        user ?
                            <label onClick={() => setProduct(product)} htmlFor="my-modal-3" className={`btn bg-orange-500 border-none ${status === "Sold" && "btn-disabled bg-orange-300"}`}>Purchase</label>
                            :
                            <label onClick={handleSendToLogin} className="btn btn-sm bg-orange-500 border-none">Login To Purchase</label>
                    }
                </div>
            </div>
        </div>
    );
};

export default Product;