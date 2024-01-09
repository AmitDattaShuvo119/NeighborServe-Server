import React, { useState, useEffect } from "react";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FcGoogle } from "react-icons/fc";
import Navbar from "../Component/Navbar/Navbar";
import Footer from "../Component/Footer/Footer";

function Login() {
  // const colors = [
  //   "#efbbff",
  //   "#d896ff",
  //   "#be29ec",
  //   "#7732A6",
  //   "#4C40ED",
  //   "#2E22AB",
  //   "black",
  // ];

  // Initialize the color index using the state
  // const [colorIndex, setColorIndex] = useState(0);

  // Update the color every 2 seconds
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // Calculate the next color index
  //     setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  //   }, 700);

  //   // Cleanup the interval to avoid memory leaks
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div className="l-container0 ">
          <div className="l-container1">
            <div>
              <p
                style={{
                  display: "flex",
                  color: "white",
                  justifyContent: "center",
                  marginTop: "150px",
                  fontSize: "22px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                Welcome to NeighborServe!
              </p>

              <p
                style={{
                  display: "flex",
                  color: "white",
                  justifyContent: "center",
                  fontSize: "16px",
                  marginBottom: "20px",
                }}
              >
                New here? Sign in to get started.
              </p>

              {/* <button
                className="btn"
                style={{
                  display: "flex",
                  marginLeft: "auto",
                  marginRight: "auto",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                  color: "white",
                }}
              >
                Sign In
              </button> */}
              <button
                style={{
                  display: "flex",
                  marginLeft: "auto",
                  marginRight: "auto",
                  justifyContent: "center",
                  color: "#570DF8",
                }}
                className="btn"
              >
                Sign In
              </button>
            </div>
          </div>

          <div className="l-container2">
            <div>
              <p
                style={{
                  display: "flex",
                  color: "black",
                  justifyContent: "center",
                  marginTop: "50px",
                  fontSize: "20px",
                  fontWeight: "bold",

                  // color: colors[colorIndex],
                  // transition: "color 0.5s",
                }}
              >
                LOGIN TO YOUR ACCOUNT
              </p>

              <div className="input-container">
                <input
                  type="text"
                  placeholder="Enter username"
                  className="input-field"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="input-field"
                />
              </div>

              <p
                style={{
                  textAlign: "center",
                  fontSize: "14px",
                  marginTop: "10px",
                  marginLeft: "150px",
                }}
              >
                <button className="l-r">Recover Password?</button>
              </p>

              {/* <button
                className="btn"
                style={{
                  display: "flex",
                  marginLeft: "auto",
                  marginRight: "auto",
                  justifyContent: "center",
                  marginTop: "20px",
                  width: "50%",
                  padding: "10px",
                  border: "1px",
                  borderRadius: "10px",
                  backgroundColor: "#4C40ED",
                  color: "white",
                }}
              >
                Sign In
              </button> */}
              <button
                style={{
                  color: "white",
                  display: "flex",
                  marginLeft: "auto",
                  marginRight: "auto",
                  justifyContent: "center",
                  width: "50%",
                  marginTop: "20px",
                }}
                className="btn btn-primary"
              >
                Primary
              </button>
              <div className="social-login">
                <p style={{ textAlign: "center", marginTop: "20px" }}>
                  Or, login with:
                </p>
                <div className="social-icons">
                  <FontAwesomeIcon
                    icon={faFacebook}
                    style={{ color: "#046ad7" }}
                  />
                  <FontAwesomeIcon
                    icon={faTwitter}
                    style={{ color: "#4386f9" }}
                  />
                  <div>
                    <FcGoogle style={{ color: "red" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default Login;
