
import React, { useEffect } from 'react';
import Header from '../Shared/Header/Header';
import { Outlet } from 'react-router-dom';

const Main = () => {




    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
};

export default Main;