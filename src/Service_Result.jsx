import React, { useState } from "react";
import Navbar from "./Component/Navbar/Navbar";
import PersonList from "./Component/profileComponent/PersonList";
import PersonList2 from "./Component/profileComponent/PersonList2";
import Footer from "./Component/Footer/Footer";
import "./styles/Service_Result.css";
import { Link, Outlet, useParams } from "react-router-dom";
const Service_Result = () => {
  const { searchString } = useParams();
  const [sr, setSr] = useState(2);
  return (
    <div>
      <Navbar />
      <br /><br /><br />
      <Outlet />
      <br />
      <div className="sr-container0">
        <div className="sr-container6">
          <p style={{ color: "black", fontWeight: "bold", fontSize: "20px" }}>
            Sort Result
          </p>
          <p>Verification Level</p>
          <select className="select select-info w-max max-w-xs border-blue-purple">
            <option disabled selected>
              Select Verification Level
            </option>
            <option>More verified</option>
            <option>Less verified</option>
          </select>
        </div>

        <div className="sr-container1">
          <p style={{ fontWeight: "bold", color: "black" }}>
            Top 5 Electricians near you
          </p>
          <div className="text-sm breadcrumbs text-gray-400">
            <ul>
              <li>
                <Link to={"/"}>
                  <a>Home</a>
                </Link>
              </li>
              <li>
                <Link to={"/browse_service"}>
                  {" "}
                  <a>Browse Services</a>{" "}
                </Link>
              </li>
              <li>{searchString}</li>
            </ul>
          </div>
          <h2 className="sr-h2">{searchString}</h2>
          <select className="select select-info w-max max-w-xs border-blue-purple sr-container7">
            <option disabled selected>
              Select Verification Level
            </option>
            <option>More verified</option>
            <option>Less verified</option>
          </select>

          <hr className="sr-line1"></hr>
          {sr === 1 ? (
            <PersonList searchString={searchString} />
          ) : (
            <PersonList2 searchString={searchString} />
          )}

          {/* <PersonList searchString={searchString} /> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Service_Result;
