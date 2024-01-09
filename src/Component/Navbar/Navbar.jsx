import { Link, useLocation, useNavigate } from "react-router-dom";
import icon from "../../assets/icon.png";
import "./Navbar.css";
import { AuthContext } from "../../Providers/AuthProviders";
import { useContext, useEffect, useState } from "react";
import useAdmin from "../../hook/useAdmin";

import useUser from "../../hook/useUser";
import useProvider from "../../hook/useProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  // const [isHovering, setIsHovering] = useState(false)
  const [isAdmin] = useAdmin();
  const [isProvider] = useProvider();
  const [isUser] = useUser();
  const userId = localStorage.getItem("userID");
  const [dataArray, setDataArray] = useState([]);
  const [pendingAppointmentsCount, setPendingAppointmentsCount] = useState(0);
  const [acceptedAppointmentsCount, setAcceptedAppointmentsCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  console.log("Admin", isAdmin);
  console.log("provider", isProvider);
  console.log("user", isUser);
  // console.log("email here: "+user.email);
  // console.log(user);
  const [user_img, setUser_img] = useState(null);
  const apiUrl = user
    ? `http://localhost:5000/providers/getId/${user.email}`
    : null;

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setDataArray(data);
      setUser_img(data.map((user1) => user1.user_img)[0]);
      const appointment = data[0].appointments;
      const count = appointment.reduce(
        (acc, appointment) => acc + (appointment.status === "Pending" ? 1 : 0),
        0
      );
      const count2 = appointment.reduce(
        (acc, appointment) => acc + (appointment.status === "Accepted" ? 1 : 0),
        0
      );
      setPendingAppointmentsCount(count);
      setAcceptedAppointmentsCount(count2);
      setTotalCount(count + count2);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData(); // Fetch data initially
      console.log("acceptedAppointmentsCount: abcd", acceptedAppointmentsCount);
      console.log("isUser:", isUser);

      const intervalId = setInterval(fetchData, 5000); // Fetch data every 5 seconds (adjust as needed)

      // Clear the interval on component unmount or user changes
      return () => clearInterval(intervalId);
    }
  }, [user]);

  const handleLogOut = () => {
    logout()
      .then()
      .catch((error) => {
        console.log(error);
      });
    navigate("/login");
  };
  // const handleMouseEnter = () => {
  //   setIsHovering(true)
  // }

  // const handleMouseLeave = () => {
  //   setIsHovering(false)
  // }

  return (
    <div className="border border-b c2 nav-container" style={{ height: "82px" }}>
      <div className="navbar bg-base-100 nav-container2">
        <div className="navbar">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="text-xl s-text">
                <Link to={"/"}>
                  <a>About us</a>
                </Link>
              </li>
              <li className="text-xl s-text">
                <Link to={"/browse_service"}>
                  <a>Services</a>
                </Link>
              </li>
              <li className="text-xl ">
                <a>Sign Up</a>
              </li>
              <li className="text-xl ">
                <Link to={"/login"}>
                  <a>Login</a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <Link to={"/"}>
              <img className="w-42 h-12" src={icon} alt="" />
            </Link>
          </div>
          <div>
            <div className="join ml-72">
              <div>
                <div>
                  <input
                    className="input input-bordered rounded-none join w-96"
                    placeholder="Search"
                  />
                </div>
              </div>

              <div className="indicator">
                {/* <span className="indicator-item badge badge-secondary">new</span>  */}
                <button className="btn join-item rounded-none bg-primary text-white ">Search</button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", width: "900px" }}>
          <ul>
            <Link
              to={"/browse_service"}
              className="lg:text-xl c1 lg:mr-7 ml-10 mr-2 s-text"
            >
              Services
            </Link>
            <Link to={"/"} className="lg:text-xl c1 s-text">
              About us
            </Link>

            {!user && (
              <Link to={"/login"} className="text-xl ml-8 c1">
                Log in
              </Link>
            )}

            {/* {user ? (
              <button className="text-xl mx-8" onClick={handleLogOut}>
                LogOut
              </button>
            ) : (
              <Link to={"/login"} className="text-xl ml-8 mr-8 c1">
                Log In
              </Link>
            )} */}
            {/* {isAdmin && (
              <Link to={"/dashboard/admindashboard"} className="text-xl c1">
                Dashboard
              </Link>
            )}
            {isProvider && (
              <Link to={"/dashboard/providerdashboard"} className="text-xl c1">
                Dashboard
              </Link>
            )}
            {isUser && (
              <Link to={"/dashboard/userdashboard"} className="text-xl c1">
                Dashboard
              </Link>
            )} */}
          </ul>
        </div>

        <div>
          {!user && (
            <button className="bg-primary mr-24 p-1 lg:p-2 lg:text-xl rounded-md n-btn1">
              <Link className="text-white " to={"/service"}>
                Become a Provider
              </Link>
              {/* Become a Pro */}
            </button>
          )}

          <div>
            {user && (
              <div
                className="relative cursor-pointer"
                // onMouseEnter={handleMouseEnter}
                // onMouseLeave={handleMouseLeave}
              >
                <div className="flex gap-2 mr-24">
                  <div className="dropdown">
                    <button tabIndex={0} className=" m-1  rounded-full ">
                      {/* <img
                        className="rounded-full w-14 h-14 mr-12 border border-blue-500 "
                        src={user.photoURL || './user1.png'}
                        alt="abcd"
                        title={user.displayName} 
                      /> */}

                      <div className="indicator">
                        {(acceptedAppointmentsCount !== 0 && isUser) ||
                          (isProvider && totalCount !== 0 && (
                            <span
                              style={{
                                color: "white",
                                backgroundColor: "red",
                                border: "none",
                                fontSize: "11px",
                              }}
                              className="indicator-item badge badge-secondary w-5 h-5"
                            >
                              {isUser ? acceptedAppointmentsCount : totalCount}
                            </span>
                          ))}
                        <div className="avatar">
                          <div className="w-12 rounded-full">
                            <img
                              src={user.photoURL || user_img || "./default.svg"}
                              alt="User's profile picture"
                              title={user.displayName}
                            />
                          </div>
                        </div>
                      </div>
                    </button>

                    <ul
                      tabIndex={0}
                      style={{
                        backgroundColor: "white",
                        borderRadius: "7px",
                        color: "red",
                      }}
                      className="dropdown-content z-[1] menu p-2 shadow  mt-3  w-40 "
                    >
                      <li>
                        <Link to={`/user_profile/${userId}`}>Profile</Link>
                      </li>
                      <li className="black-text">
                        {isProvider && (
                          <Link to={`/view_request/${userId}`}>
                            Requests{" "}
                            <span>
                              {" "}
                              <div className="badge">
                                {pendingAppointmentsCount}
                              </div>
                            </span>
                          </Link>
                        )}
                      </li>
                      <li>
                        <Link to={`/view_appointment/${userId}`}>
                          Appointment{" "}
                          <span>
                            {" "}
                            <div className="badge">
                              {acceptedAppointmentsCount}
                            </div>
                          </span>
                        </Link>
                      </li>

                      <li>
                        {isAdmin && (
                          <Link
                            to={"/dashboard/admindashboard"}
                            className="text-sm "
                          >
                            Dashboard
                          </Link>
                        )}
                        {isProvider && (
                          <Link
                            to={"/dashboard/providerdashboard"}
                            className="text-sm "
                          >
                            Dashboard
                          </Link>
                        )}
                        {isUser && (
                          <Link
                            to={"/dashboard/userdashboard"}
                            className="text-sm "
                          >
                            Dashboard
                          </Link>
                        )}
                      </li>
                      <li>
                        <Link>
                          {user ? (
                            <button className="text-sm " onClick={handleLogOut}>
                              Log Out
                            </button>
                          ) : (
                            <Link
                              to={"/login"}
                              className="text-xl ml-8 mr-8 c1"
                            >
                              Log In
                            </Link>
                          )}
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* <div>
                    <p>{user.displayName}</p>
                  </div> */}
                </div>

                {/* {isHovering && (
                                <div className="absolute transform -translate-x-1/2 bg-white shadow-lg rounded-lg py-2 px-4">
                                    <p className="text-gray-800">{user.displayName}</p>
                                </div>
                            )} */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
