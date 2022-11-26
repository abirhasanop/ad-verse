import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import Advertized from './Advertized/Advertized';
import AllProducts from './AllProducts/AllProducts';
import Banner from './Banner/Banner';
import Category from './Category/Category';

const Home = () => {
    return (
        <main className=''>
            <Banner />
            <Category />
            <Advertized />
            <AllProducts />
            <Footer />
        </main>
    );
};

export default Home;