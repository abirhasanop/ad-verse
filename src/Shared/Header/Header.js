import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import { FaUserAlt } from "react-icons/fa"

const Header = () => {
    const { user, logOut } = useContext(AuthContext)


    return (
        <nav className='shadow-lg h-20 flex items-center'>
            <div className="navbar container mx-auto bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li className='font-semibold'><Link to='/'>Home</Link></li>
                            <li className='font-semibold'><Link to='/blogs'>Blog</Link></li>
                            {
                                user?.uid ?
                                    <>
                                        <li className='font-semibold'><Link to="/dashboard">Dashboard</Link></li>
                                        <li className='font-semibold' onClick={logOut}><Link>Log Out</Link></li>
                                    </>
                                    :
                                    <>
                                        <li className='font-semibold'><Link to='/login'>Sign In</Link></li>
                                        <li className='font-semibold'><Link to='/signup'>Sign Up</Link></li>
                                    </>
                            }
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost normal-case text-xl"><h2 className='text-3xl font-bold'>Ad <span className='text-orange-600'>Verse</span></h2></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        <li className='font-semibold'><Link to='/'>Home</Link></li>
                        <li className='font-semibold'><Link to='/blogs'>Blog</Link></li>
                        {
                            user?.uid ?
                                <>
                                    <li className='font-semibold'><Link to="/dashboard">Dashboard</Link></li>
                                    <li className='font-semibold' onClick={logOut}><Link>Log Out</Link></li>
                                </>
                                :
                                <>
                                    <li className='font-semibold'><Link to='/login'>Sign In</Link></li>
                                    <li className='font-semibold'><Link to='/signup'>Sign Up</Link></li>
                                </>
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className='flex items-center'>
                        <p className='text-md font-semibold'>{user?.displayName}</p>
                        {/* <img className='w-8 h-8 ml-3 rounded-full' src={user?.photoURL} alt="" /> */}
                        <FaUserAlt className='ml-3 text-2xl text-orange-500' />
                    </div>

                    {/* <Link className="btn">Sell Your Product</Link> */}


                    <label htmlFor="dashboard-drawer" tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                </div>
            </div>
        </nav>
    );
};

export default Header;