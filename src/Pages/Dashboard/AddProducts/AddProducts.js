import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';
import InputField from './InputField';

const AddProducts = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    // null
    const [image, setImage] = useState("")
    const imageHostKey = process.env.REACT_APP_IMBB_KEY

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.productName.value
        const originalPrice = form.originalPrice.value
        const resalePrice = form.resalePrice.value
        const number = form.number.value
        const location = form.location.value
        const purchaseDate = form.purchaseDate.value
        const yearsOfUse = form.yearsOfUse.value
        const category = form.category.value
        const condition = form.condition.value
        const description = form.descriptions.value

        console.log(image);
        const formData = new FormData()
        formData.append("image", image)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData?.success) {
                    const product = {
                        name,
                        sellerName: user?.displayName,
                        sellerEmail: user?.email,
                        status: "Available",
                        varified: false,
                        originalPrice,
                        resalePrice,
                        number,
                        location,
                        purchaseDate,
                        yearsOfUse: yearsOfUse + " " + "years",
                        category,
                        condition,
                        description,
                        advertised: false,
                        img: imageData.data.url,
                        postDate: new Date()
                    }
                    fetch(`${process.env.REACT_APP_SERVER_URL}/myproducts`, {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(data => {
                            toast.success(`${name} Added Sucessfully`)
                            navigate("/dashboard/myproducts")
                            console.log(data);
                        })
                }
            })




    }

    return (
        <div>
            {/* <h1 className='text-3xl'>Add Products</h1> */}
            <section className="my-8 ">
                <div className="mx-auto">
                    <div className="card w-2/3 mx-auto bg-slate-50 p-4">
                        <h1 className="text-center text-3xl font-semibold my-3 text-orange-500">
                            Add A New Product
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <InputField
                                label="Product Name"
                                placeholder="Product Name"
                                type="text"
                                //   handleOnChange={handleOnChange}
                                name="productName"
                            />
                            <InputField
                                label="Original Price"
                                placeholder="Price $"
                                type="text"
                                name="originalPrice"
                            //   handleOnChange={handleOnChange}
                            />
                            <InputField
                                label="Resale Price"
                                placeholder="Price $"
                                type="text"
                                name="resalePrice"
                            //   handleOnChange={handleOnChange}
                            />
                            <InputField
                                label="Mobile Number"
                                placeholder="Your Number"
                                type="tel"
                                name="number"
                            //   handleOnChange={handleOnChange}
                            />
                            <InputField
                                label="Location"
                                placeholder="Your Location"
                                type="text"
                                name="location"
                            //   handleOnChange={handleOnChange}
                            />
                            <InputField
                                label="Year of Purchase"
                                placeholder="Year of Purchase"
                                type="number"
                                name="purchaseDate"
                            //   handleOnChange={handleOnChange}
                            />
                            <InputField
                                label="Years of use"
                                placeholder="Years of use"
                                type="number"
                                name="yearsOfUse"
                            //   handleOnChange={handleOnChange}
                            />
                            <div className="form-control mb-4">
                                <label className="label">Select your product category</label>
                                <select
                                    required
                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    name="category"
                                // onChange={handleOnChange}
                                >
                                    <option value="Xiaomi">Xiaomi</option>
                                    <option value="Iphone">Iphone</option>
                                    <option value="Samsung">Samsung</option>
                                </select>
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">Product Condition</label>
                                <select
                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    name="condition"
                                // onChange={handleOnChange}
                                >
                                    <option defaultValue disabled>
                                        Select a Condition
                                    </option>
                                    <option value="excellent">Excellent</option>
                                    <option value="good">Good</option>
                                    <option value="fair">Fair</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description">Product Description</label>
                                <textarea
                                    required
                                    type="textarea"
                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="description"
                                    placeholder="Descriptions"
                                    name="descriptions"
                                    // onChange={handleOnChange}
                                    rows={5}
                                />
                            </div>
                            <div className="flex items-center justify-center w-full mb-4">
                                <label
                                    htmlFor="dropzone-file"
                                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg
                                            aria-hidden="true"
                                            className="w-10 h-10 mb-3 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                            ></path>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 ">
                                            <span className="font-semibold">Click to upload</span> your
                                            profile picture
                                        </p>
                                    </div>
                                    <input
                                        id="dropzone-file"
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => setImage(e.target.files[0])}
                                        name="image"
                                        accept="image/*"
                                    />
                                </label>
                            </div>
                            <div className="text-center">
                                <button
                                    className="inline-block  bg-orange-500 px-6 py-2.5 text-white font-medium text-lg leading-tight uppercase rounded shadow-md  hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-1/2 mb-3"
                                    type="submit"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    Submit Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AddProducts;