import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import ColorRingSpinner from '../../../Components/ReactSpinner/ColorRingSpinner';
import { AuthContext } from '../../../Contexts/AuthProvider';
import useAdmin from '../../../hooks/useAdmin';
import useSeller from '../../../hooks/useSeller';

const Dashboard = () => {
    const { user, loding } = useContext(AuthContext)
    const [isSeller, isSellerLoading] = useSeller(user?.email)
    const [isAdmin, isAdminLoading] = useAdmin(user?.email)

    if (loding || isAdminLoading || isSellerLoading) {
        return <ColorRingSpinner />
    }
    return (
        <div>
            <h1 className="text-3xl">Dashboard</h1>
            {
                isSeller && <Navigate to='/dashboard/addproduct'></Navigate>
            }
            {
                isAdmin && <Navigate to='/dashboard/allsellers'></Navigate>
            }
            {
                !isAdmin && !isSeller && <Navigate to='/dashboard/myorders'></Navigate>
            }
        </div>
    );
};

export default Dashboard;