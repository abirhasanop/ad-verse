import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const { user, loding } = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin(user?.email)
    const location = useLocation()

    if (loding || isAdminLoading) {
        return <div>Loding..........</div>
    }

    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }
    if (!isAdmin) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }
    return children
};

export default AdminRoute;