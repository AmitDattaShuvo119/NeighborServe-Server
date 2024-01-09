import React, { useContext } from "react";
import Navbar from "../Navbar/Navbar";
import { Link, Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import icon from "../../assets/mop.png";
import { AuthContext } from "../../Providers/AuthProviders";
import useAdmin from "../../hook/useAdmin";
import useProvider from "../../hook/useProvider";
import useUser from "../../hook/useUser";

const Dashboard = () => {
  const [isAdmin] = useAdmin()
  const [isProvider] = useProvider()
  const [isUser] = useUser()
  const { user, logout } = useContext(AuthContext)
  return (
    <>
      <Navbar></Navbar>
      <div className="drawer lg:drawer-open  mb-7">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col  ">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button ml-72 w-24 mt-5  lg:hidden"
          >
            Open/close drawer
          </label>

          <Outlet></Outlet>
        </div>

        <div className="w-60 drawer-side my-6 ml-4  rounded-lg">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-7 h-full bg-base-200 text-base-content">
            {
              <>
                <div className="p-4 mb-10">
                  <img
                    className="w-16 h-16 mx-auto mb-3 rounded-full"
                    src={user?.photoURL}
                    alt=""
                  />
                  <p className="text-center font-bold text-xl">{user?.displayName}</p>
                </div>

                <Link to={"/dashboard/userdashboard"}>
                  <button className="btn btn-outline btn-accent mb-5 w-36">
                    DashBoard
                  </button>
                </Link>
                {isAdmin && 
                <Link to={"/dashboard/adminmanageuser"}>
                  <button className="btn btn-outline btn-accent mb-5 w-36">
                    User List
                  </button>
                </Link>
}                
{isAdmin &&
                <Link to={"/dashboard/adminmanageprovider"}>
                  <button className="btn btn-outline btn-accent mb-5 w-36">
                    Provider List
                  </button>
                </Link>
}
   {isAdmin && 
                <Link to={"/dashboard/adminverifyprovider"}>
                  <button className="btn btn-outline btn-accent mb-5 w-36">
                    Verify Provider 
                  </button>
                </Link>
}
{ isAdmin &&
                <Link to={"/dashboard/adminmonitoruser"}>
                  <button className="btn btn-outline btn-accent mb-5 w-36">
                    User Monitor
                  </button>
                </Link>
}
{ isUser &&
                <Link to={"/dashboard"}>
                  <button className="btn btn-outline btn-accent mb-5 w-36">
                    Previous Work
                  </button>
                </Link>
}

              </>
            }
          </ul>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Dashboard;
