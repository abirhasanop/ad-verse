import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import CategoryProducts from "../Pages/CategoryProducts/CategoryProducts";
import AddProducts from "../Pages/Dashboard/AddProducts/AddProducts";
import AllBuyers from "../Pages/Dashboard/AllBuyers/AllBuyers";
import Allsellers from "../Pages/Dashboard/Allsellers/Allsellers";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import MyOrders from "../Pages/Dashboard/MyOrders/MyOrders";
import MyProducts from "../Pages/Dashboard/MyProducts/MyProducts";
import ReportedProduct from "../Pages/Dashboard/ReportedProduct/ReportedProduct";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/signup",
                element: <SignUp></SignUp>
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/category-products/:categoryName",
                element: <PrivateRoute><CategoryProducts /></PrivateRoute>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "/dashboard/allsellers",
                element: <AdminRoute><Allsellers /></AdminRoute>
            },
            {
                path: "/dashboard/allbuyers",
                element: <AdminRoute><AllBuyers /></AdminRoute>
            },
            {
                path: "/dashboard/myorders",
                element: <MyOrders />
            },
            {
                path: "/dashboard/addproduct",
                element: <AddProducts />
            },
            {
                path: "/dashboard/myproducts",
                element: <MyProducts />
            },
            {
                path: "/dashboard/reported-products",
                element: <ReportedProduct />
            }
        ]
    }
])