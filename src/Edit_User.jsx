import React, { useState, useRef, useEffect } from "react";
import Navbar from "./Component/Navbar/Navbar";
import "./styles/Edit_User.css";

function Edit_User() {
  return (
    <div>
      <Navbar />
      <div className="eu-container0">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Profile</a>
            </li>
            <li>Edit User Profile</li>
          </ul>
        </div>
        <div>
          <p className="text-xl text-blue-purple">Edit profile</p>
          <p>
            Only your name & profile picture will be displayed in public profile
          </p>
        </div>
        <div className="eu-container1">
          <div className="eu-container4">
            <div style={{ marginLeft: "auto", marginRight: "auto" }}>
              <p className="text-xl text-blue-purple font-bold">
                Profile picture
              </p>
              <div className="avatar">
                <div className="w-32 rounded">
                  <img src="user.png" />
                </div>
              </div>
            </div>
            <button
              className="btn btn-wide mt-2 bg-blue-purple text-white"
              style={{ marginRight: "auto", marginLeft: "auto" }}
              type="submit"
            >
              Update picture
            </button>
            <button
              className="btn btn-wide mt-2 bg-blue-purple text-white"
              style={{ marginRight: "auto", marginLeft: "auto" }}
              type="submit"
            >
              Remove picture
            </button>
          </div>
          <div className="eu-container2">
            <p className="text-blue-purple ml-5 mt-3">User details</p>
            <form action="" className="eu-container3">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text" style={{ color: "#ABABAB" }}>
                    Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="your full name"
                  className="input input-bordered input-primary w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text" style={{ color: "#ABABAB" }}>
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="your email"
                  className="input input-bordered input-primary w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text" style={{ color: "#ABABAB" }}>
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="your password"
                  className="input input-bordered input-primary w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text" style={{ color: "#ABABAB" }}>
                    Confirm Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="confirm your password"
                  className="input input-bordered input-primary w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text" style={{ color: "#ABABAB" }}>
                    Location
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="your location"
                  className="input input-bordered input-primary w-full max-w-xs"
                />
              </div>
              <button
                className="btn btn-wide mt-5 bg-blue-purple text-white"
                style={{ marginRight: "auto", marginLeft: "auto" }}
                type="submit"
              >
                Save
              </button>
            </form>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Edit_User;
