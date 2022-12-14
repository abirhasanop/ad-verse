import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import ColorRingSpinner from '../Components/ReactSpinner/ColorRingSpinner';
import { AuthContext } from '../Contexts/AuthProvider';
import useSeller from '../hooks/useSeller';

const SellerRoute = ({ children }) => {
    const { user, loding } = useContext(AuthContext)
    const [isSeller, isSellerLoading] = useSeller(user?.email)
    const location = useLocation()

    if (loding || isSellerLoading) {
        return <ColorRingSpinner />
    }
    if (!user || !isSeller) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }

    return children

};

export default SellerRoute;