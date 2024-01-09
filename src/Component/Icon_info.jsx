import React from "react";
import "./Icon_info.css";

const Icon_info = (props) => {
  const icon1 = props.index;

  return (
    <div>
      {" "}
      <div className="icon-container">
        <img
          src={icon1}
          style={{ width: "25px", height: "25px" }}
          className="pp-container11"
          alt=""
        />{" "}
        {/* Use your icon here */}
        <div className="pc-item-box">
          <div style={{ display: "flex" }}>
            <img
              src="v100.png"
              style={{ width: "25px", height: "25px" }}
              alt=""
            />
            <p style={{ fontSize: "15px" }}>
              100%{" "}
              <span style={{ color: "#4C40ED", fontWeight: "bold" }}>
                verified
              </span>
              - NID, Phone, Certificate checked
            </p>
          </div>
          <hr />
          <div style={{ display: "flex" }}>
            <img
              src="v50.png"
              style={{ width: "25px", height: "25px" }}
              alt=""
            />
            <p style={{ fontSize: "15px" }}>
              50%{" "}
              <span style={{ color: "#4C40ED", fontWeight: "bold" }}>
                verified
              </span>
              - NID, Phone checked
            </p>
          </div>
          <hr />
          <div style={{ display: "flex" }}>
            <img
              src="v25.png"
              style={{ width: "25px", height: "25px" }}
              alt=""
            />
            <p style={{ fontSize: "15px" }}>
              25%{" "}
              <span style={{ color: "#4C40ED", fontWeight: "bold" }}>
                verified
              </span>
              - Phone Checked
            </p>
          </div>
          <hr />
          <div style={{ display: "flex" }}>
            <img
              src="v0.png"
              style={{ width: "25px", height: "25px" }}
              alt=""
            />
            <p style={{ fontSize: "15px" }}>
              0%{" "}
              <span style={{ color: "#4C40ED", fontWeight: "bold" }}>
                verified
              </span>
              - No credentials provided
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Icon_info;
