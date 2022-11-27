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
import Payment from "../Pages/Dashboard/Payment/Payment";
import ReportedProduct from "../Pages/Dashboard/ReportedProduct/ReportedProduct";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";

export const router = createBrowserRouter([
    {
        path: "*",
        element: <ErrorPage />
    },
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
                element: <SellerRoute><AddProducts /></SellerRoute>
            },
            {
                path: "/dashboard/myproducts",
                element: <SellerRoute><MyProducts /></SellerRoute>
            },
            {
                path: "/dashboard/reported-products",
                element: <AdminRoute><ReportedProduct /></AdminRoute>
            },
            {
                path: "/dashboard/myorders/payment/:id",
                loader: ({ params }) => fetch(`${process.env.REACT_APP_SERVER_URL}/orders/${params.id}`),
                element: <Payment />
            }
        ]
    }
])