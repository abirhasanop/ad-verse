import React from 'react';
import backgroundImage from '../../../Assets/bannerImg.png'

const Banner = () => {
    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', width: "100%", height: "650px" }}>
            <section className='flex items-center h-full lg:pl-24'>
                <div>
                    <h1 className="text-8xl font-extrabold text-white">Buy & Sell Anything</h1>
                    <h2 className='text-4xl font-bold text-white my-4'>WORLD'S BIGGEST CLASSIFIED MARKETPLACE</h2>
                    <p className='text-white text-lg mb-4'>Find your best quality used Mobile phone. We offer you 100% original Mobile Phone verified by the experts. </p>
                    <button className='btn btn-lg hover:bg-orange-700 bg-orange-600 mr-3'>Sell Your Product</button>
                    <button className='btn btn-lg hover:bg-orange-700 bg-orange-600'>Explore Product</button>

                    <p className="text-lg text-white mt-8"><strong>What’s Popular:</strong> Xiaomi m1, Galaxy A10, Iphone 14, Iphone 13 pro max</p>
                </div>
            </section>
        </div>
    );
};

export default Banner;