import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import { toast } from "react-hot-toast"

const PurchaseModal = ({ product, setProduct, refetch }) => {
    const { user } = useContext(AuthContext)

    const { name, resalePrice, img } = product


    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.target
        const buyerName = form.name.value
        const email = form.email.value
        const price = form.price.value
        const phone = form.phone.value
        const location = form.location.value



        const orderInfo = {
            productName: name,
            img: img,
            buyerName,
            email,
            price,
            phone,
            location
        }
        console.log(orderInfo);
        fetch(`${process.env.REACT_APP_SERVER_URL}/orders`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(orderInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    console.log(data);
                    toast.success(`${name} Orderd Succesfully`)
                    setProduct(null)
                    // refetch()
                } else {
                    setProduct(null)
                    toast.error(data.message)
                }

            })


        setProduct(null)
    }


    return (
        <div>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                    <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-y-3'>
                        <input type="text" name='name' value={user?.displayName} disabled className="input w-full shadow-lg" />
                        <input name='email' type="email" value={user?.email} disabled className="input w-full shadow-lg" />
                        <input name='price' value={resalePrice} disabled type="text" className="input w-full shadow-lg" />
                        <input name='phone' required type="text" placeholder="Your Phone Number" className="input w-full shadow-lg" />
                        <input name='location' required type="text" placeholder="Meeting Location" className="input w-full shadow-lg" />
                        <input type="submit" className='btn bg-orange-500 border-none' value="Order" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PurchaseModal;