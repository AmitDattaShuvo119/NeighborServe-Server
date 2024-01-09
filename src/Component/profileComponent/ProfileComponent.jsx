import React, { useState, useEffect } from "react";
import "./ProfileComponent.css";
import Icon_info from "../Icon_info";
import { Link, Outlet, useParams } from "react-router-dom";
const ProfileComponent = (props) => {
  const {
    _id,
    user_fullname,
    user_email,
    user_location,
    user_regYear,
    user_hireCount,
    user_verficationStatus,
    user_img,
    user_icon,
    user_rating,
    user_reviews,
  } = props;
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Update the screen width state when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Define responsive styles
  const buttonStyles = {
    marginLeft: screenWidth >= 768 ? "64%" : "1%", // Adjust the breakpoint and margin values as needed
    marginTop: screenWidth >= 768 ? "38%" : "1%",
    fontFamily: "Inter, sans-serif",
  };
  const buttonStyles2 = {
    marginLeft: screenWidth >= 768 ? "64%" : "5%", // Adjust the breakpoint and margin values as needed
    marginTop: screenWidth >= 768 ? "5%" : "1%",
    fontFamily: "Inter, sans-serif",
  };

  return (
    <div>
      <div className="pc-container1">
        <div className="avatar" >
          <div
            className="rounded-md w-44 h-[200px]"
           
          >
            <img src={user_img} />
          </div>
        </div>

        <div className="pc-container2 ">
          <p style={{ fontWeight: "bold", fontSize: "22px", color: "black" }}>
            {user_fullname}
          </p>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="pc-container3">
              <img
                src="gps.svg"
                alt="Icon Description"
                style={{ width: "25px", height: "25px" }}
              />
              &nbsp;{user_location}
            </div>

            <div className="pc-container3">
              <img
                src="Time.svg"
                alt="Icon Description"
                style={{ width: "25px", height: "25px" }}
              />
              &nbsp;Member since {user_regYear}
            </div>

            {/* <div className="pc-container3">
            <img
              src="trophy.svg"
              alt="Icon Description"
              style={{ width: "27px", height: "27px" }}
              className="pp-container11"
            />
            &nbsp;
            <p className="pp-container12" style={{ marginLeft: "-0.4%" }}>
              Hired {user_hireCount} times
            </p>
          </div>{" "} */}
            <div className="pc-container3">
              <img
                style={{ height: "25px", width: "25px" }}
                src="v.svg"
                alt=""
              />
              {/* <Icon_info index={user_icon} /> */}

              <p style={{ marginTop: "0.5%" }}>
                {" "}
                &nbsp;{user_verficationStatus}&nbsp; Verified
              </p>
            </div>

            <div className="pc-container3" style={{ marginTop: "-0.5%" }}>
              <img
                style={{ height: "25px", width: "25px" }}
                src="./Star.svg"
                alt=""
              />
              &nbsp;
              <p className="pp-container12" style={{ marginTop: "0.8%" }}>
                {user_rating} <span> star rated</span>
              </p>
              &nbsp;{" "}
            </div>

            <div></div>
            <p className="pc-container4">
              &nbsp;
              <img src="./cmnt.svg" alt="" />
              &nbsp;
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#555555",
                }}
              >
                {user_reviews.length > 0 ? user_reviews[0].reviewerName : ""}
                &nbsp;says&nbsp;{" "}
                <span style={{ fontWeight: "bold" }}>
                  "{user_reviews.length > 0 ? user_reviews[0].review : ""}"
                </span>
              </span>
              &nbsp;&nbsp;
            </p>
          </div>
        </div>
        <div className="pc-container5">
          <button
            className="btn bg-blue-purple btn-xl text-white w-28"
            style={buttonStyles}
          >
            Message
          </button>

          <Link to={`/provider_profile/${_id}`}>
            <button
              style={buttonStyles2}
              className="btn bg-blue-purple btn-xl text-white w-28"
            >
              View Profile
            </button>
          </Link>
        </div>
      </div>
      <hr className="pc-line1"></hr>
    </div>
  );
};

export default ProfileComponent;
