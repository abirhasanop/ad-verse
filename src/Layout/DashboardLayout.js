import React, { useContext, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useSeller from '../hooks/useSeller';
import Header from '../Shared/Header/Header';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext)
    const [isSeller] = useSeller(user?.email)
    const [isAdmin] = useAdmin(user?.email)

    console.log("isAdmin =", isAdmin);


    // scroolbar issue fixing
    // useEffect(() => {
    //     document.body.style.overflow = 'hidden'
    //     document.body.style.maxHeight = '100vh'
    //     return () => {
    //         document.body.style.overflow = 'scroll'
    //         document.body.style.maxHeight = 'auto'
    //     }
    // }, [])


    return (
        <div className='overflow-hidden'>
            <Header />
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content pl-10">
                    <Outlet />
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">

                        <li><Link to='/dashboard'>Dashboard</Link></li>
                        {
                            isAdmin &&
                            <>
                                <li><Link to='/dashboard/allsellers'>All Sellers</Link></li>
                                <li><Link to='/dashboard/allbuyers'>All Buyers</Link></li>
                                <li><Link to='/dashboard/reported-products'>Reported Product</Link></li>
                            </>
                        }
                        {
                            isSeller &&
                            <>
                                <li><Link to='/dashboard/myproducts'>My Products</Link></li>
                                <li><Link to='/dashboard/addproduct'>Add Products</Link></li>
                            </>
                        }
                        {
                            !isAdmin && !isSeller &&
                            <>
                                <li><Link to='/dashboard/myorders'>My Orders</Link></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;