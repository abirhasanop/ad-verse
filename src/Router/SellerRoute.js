import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
import useSeller from '../hooks/useSeller';

const SellerRoute = ({ children }) => {
    const { user, loding } = useContext(AuthContext)
    const [isSeller, isSellerLoading] = useSeller(user?.email)
    const location = useLocation()

    if (loding || isSellerLoading) {
        return <div>Loding Seller Route ............</div>
    }
    if (!user || !isSeller) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }

    return children

};

export default SellerRoute;