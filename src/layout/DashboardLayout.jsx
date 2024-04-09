
import logo from "/logo.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { MdDashboard, MdOutlineDashboardCustomize } from "react-icons/md";
import {
  FaEdit,
  FaHome,
  FaLocationArrow,
  FaPlusCircle,
  FaQuestionCircle,
  FaRegUser,
  FaShoppingBag,
  FaUsers,
  FaComments,
} from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import useAdmin from "../hooks/useAdmin";
import Login from "../components/Login";
import useAuth from "../hooks/useAuth";
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { FaIndustry } from "react-icons/fa";

const sharedMenu = (
  <>
    <li className="mt-3">
      <Link to="/">
        <FaHome />
        Home
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaCartShopping />
        Menu
      </Link>
    </li>
    <li>
      <Link to="/dashboard/order-tracking">
      <FaLocationArrow />
        Orders Tracking
      </Link>
    </li>
    <li>
      <Link to="/dashboard/customer-support">
      <FaQuestionCircle />
        Customer Support
      </Link>
    </li>
  </>
);

const DashboardLayout = () => {
  const {loading} = useAuth()
  const [isAdmin, isAdminLoading] = useAdmin();
  // console.log(isAdmin);

  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate()
 // logout
 const handleLogout = () => {
  logOut()
    .then(() => {
      // Sign-out successful.
      navigate("/")
    })
    .catch((error) => {
      console.log(error);
    });
};

  return (
    <div>
      {
        isAdminLoading || isAdmin ? <div className="drawer sm:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
          {/* Page content here */}
          <div className="flex items-center justify-between mx-4">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button sm:hidden"
            >
              <MdOutlineDashboardCustomize />
            </label>

            {/* login or signout */}
            <button onClick={handleLogout} className="btn flex items-center gap-2 rounded-full px-6 bg-green text-white sm:hidden">
              <FaRegUser /> Logout
            </button>
          </div>
          <div className="mt-5 md:mt-2 mx-4">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link to="/dashboard" className="flex justify-start mb-3">
                <img src={logo} alt="" className="w-20" />
                <span className="indicator-item badge badge-primary">
                  Admin
                </span>
              </Link>
            </li>
            <hr />

            {/* dashboard */}
            <li className="mt-3">
              <Link to="/dashboard">
                <MdDashboard /> Dashboard
              </Link>
            </li>

            {/* manage orders */}
            <li>
              <Link to="/dashboard/bookings">
                <FaShoppingBag /> Manage Bookings
              </Link>
            </li>

            {/* Add Menu Items */}
            <li>
              <Link to="/dashboard/add-menu">
                <FaPlusCircle /> Add Menu
              </Link>
            </li>

            {/* Manage Menu Items */}
            <li>
              <Link to="/dashboard/manage-items">
                <FaEdit /> Manage Items
              </Link>
            </li>

             {/* manage comments */}
             <li>
              <Link to="/dashboard/comments">
                <FaComments />
                Manage Comments
              </Link>
            </li>

            {/* users */}
            <li className="mb-3">
              <Link to="/dashboard/users">
                <FaUsers />
                Users
              </Link>
            </li>
            
            {/* jobs */}
            <li className="mb-3">
              <Link to="/dashboard/jobs">
              <FaIndustry />
                Jobs
              </Link>
            </li>

            {/* shared menu */}
            <hr />
            {sharedMenu}
          </ul>
        </div>
      </div> :  (loading ? <Login/> : <div className="h-screen flex items-center justify-center">
        <Link to="/" >Back to Home</Link>
        </div> )
      }
    </div>
  );
};

export default DashboardLayout;
