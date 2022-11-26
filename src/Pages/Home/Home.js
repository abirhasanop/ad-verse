import React from 'react';
import Footer from '../../Shared/Footer/Footer';
import AllProducts from './AllProducts/AllProducts';
import Banner from './Banner/Banner';
import Category from './Category/Category';

const Home = () => {
    return (
        <main className=''>
            <Banner />
            <Category />
            <AllProducts />
            <Footer />
        </main>
    );
};

export default Home;