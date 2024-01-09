import React, { useState, useEffect } from "react";
import Navbar from "./Component/Navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import useUser from "./hook/useUser";
import Footer from "./Component/Footer/Footer";
import "./styles/UserProfile.css";
const UserProfile = () => {
  const userId = localStorage.getItem("userID");
  const [isUser] = useUser();
  const { searchString } = useParams();
  const searchString2 = localStorage.getItem("userID");
  const apiUrl = `http://localhost:5000/providers/providersProfile?id=${userId}`;
  const [dataArray, setDataArray] = useState([]);
  const x = "Client";
  const y = "Pro's Name";
  const [location, setLocation] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [name, setName] = useState(null);
  const [img, setImg] = useState(null);
  const [usertype, setUsertype] = useState(null);
  const [ep, setEp] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [buttonText, setButtonText] = useState("Submit now");

  const editProfile = () => {
    setButtonText("Submit now");
    setEp(true);
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("image", selectedImage);

    const response = await axios.post(
      "https://api.imgbb.com/1/upload?key=29ece6b8b3a3a74d990e6534dd31ece7",
      formData
    );

    setImageUrl(response.data.data.url);
    console.log("Uploaded Image URL:", response.data.data.url);
  };

  const handleSubmit = async () => {
    // Log input values to the console
    console.log("New Name: ", name);
    console.log("New Email: ", userEmail);
    console.log("New Phone: ", phone);
    console.log("New IMG url: ", imageUrl);

    try {
      // Fetch userId from the backend based on the user's email
      // const userId = data[0]._id; // Assuming you have a single userId associated with the email
      const apiUrl1 = `http://localhost:5000/providers/updateProfile/${userId}`;

      const data1 = {
        user_fullname: name,
        user_email: userEmail,
        user_phone: phone,
        user_img: imageUrl,
      };

      axios
        .patch(apiUrl1, data1)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
        setButtonText("Submitted");
      setTimeout(() => {
        setEp(false);
        fetchData(); // Re-fetch data after updating the profile
      }, 3000);
    } catch (error) {
      console.error("Error fetching userId:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0 && data[0].user_location) {
        setLocation(data[0].user_location);
        setUserEmail(data[0].user_email);
        setPhone(data[0].user_phone);
        setName(data[0].user_fullname);
        setImg(data[0].user_img);
        setUsertype(data[0].user_status);
        console.log(location); // Note: This log might not reflect the updated state immediately due to the asynchronous nature of setState
      }
      if (Array.isArray(data[0].appointments)) {
        setDataArray(data[0].appointments);
        console.log(dataArray);
      } else {
        console.error("Appointments data is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data initially
  }, [apiUrl]);

  useEffect(() => {
    // Your logic for handling changes in dataArray
    console.log("dataArray has changed:", dataArray);
  }, [dataArray]);

  return (
    <div>
      <Navbar />
      <br /><br /><br />
      <br />
      <br />
      <div className="up-container1">
        <div className="up-container2">
          <div className="up-container3">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center", // Center vertically
                alignItems: "center", // Center horizontally
                height: "100%", // Ensure the container takes full height
              }}
            >
              {" "}
              <div className="avatar">
                <div
                  className="w-36 rounded-full"
                  style={{ border: "2px #4C40ED groove" }}
                >
                  <img src={img} />
                </div>
              </div>
              <p
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  fontSize: "24px",
                }}
              >
                {name}
              </p>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "16px",
                  color: "#4C40ED",
                }}
              >
                {usertype} User
              </p>
            </div>
          </div>
          <div className="up-container4">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "30px",
                marginLeft: "20px",
              }}
            >
              <ul>
                <li>
                  <p style={{ fontSize: "22px" }}>Address</p>
                </li>
                <li>
                  <div style={{ display: "flex" }}>
                    {" "}
                    <img src="./gps.svg" alt="" />
                    &nbsp;&nbsp; <p style={{ color: "#6B6E81" }}>{location}</p>
                  </div>
                </li>
                <br />
                <li>
                  <p style={{ fontSize: "22px" }}>Contact</p>
                </li>
                <li>
                  {" "}
                  <div style={{ display: "flex" }}>
                    {" "}
                    <img src="./email.svg" alt="" />
                    &nbsp;&nbsp; <p style={{ color: "#6B6E81" }}>{userEmail}</p>
                  </div>
                </li>
                <li>
                  {" "}
                  <div style={{ display: "flex" }}>
                    {" "}
                    <img src="./call.svg" alt="" />
                    &nbsp;&nbsp;{" "}
                    <p style={{ color: "#6B6E81", marginTop: "2px" }}>
                      {phone}
                    </p>
                  </div>
                </li>
                <br />
                <li style={{ marginTop: "10px" }}>
                  <button
                    className="btn btn-active up-modal-btn3"
                    onClick={editProfile}
                  >
                    Edit Profile
                  </button>
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-active up-modal-btn4"
                  >
                    Disable Profile
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <br />
        <div
          className="up-container5"
          style={{
            backgroundColor: "white",
            justifySelf: "center",
            flexDirection: "column",
            paddingTop: "10px",
          }}
        >
          <p style={{ fontSize: "18px", marginLeft: "20px" }}>
            Previous appointments
          </p>{" "}
          <hr style={{ marginTop: "-15px" }} />
          <div
            className="overflow-x-auto"
            style={{ width: "95%", marginLeft: "auto", marginRight: "auto" }}
          >
            {dataArray.length > 0 ? (
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Appointment ID</th>
                    <th>Service Provider</th>
                    <th>Service Type</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {dataArray
                    .filter((appointment) => appointment.status === "Done")
                    .map((appointment, index) => (
                      <tr key={appointment.appointmentId}>
                        <td>{appointment.appointmentId}</td>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img
                                  src={appointment.pro_img}
                                  alt="Avatar Tailwind CSS Component"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">
                                {appointment.pro_name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{appointment.pro_category}</td>
                        <td>
                          {appointment.appointmentDate}
                          <br />
                          <span className="badge badge-ghost badge-sm">
                            {appointment.appointmentTime}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
                {/* foot */}
              </table>
            ) : (
              <p>No appointments found.</p>
            )}
          </div>
        </div>
      </div>
      <div className={isUser && ep === true ? "up-modal-container" : "hidden"}>
        <div className="up-modal-content">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: "10px", width: "200px" }}>
              <img
                src="./edit.svg"
                alt=""
                style={{ width: "30px", height: "auto" }}
              />
              <p style={{ marginTop: "8px", color: "#6B6E81" }}>Edit profile</p>
            </div>{" "}
            <button
              className="btn btn-circle up-modal-btn1"
              onClick={() => setEp(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ width: "20px", height: "20px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "300px", // Center horizontally
            }}
          >
            <div className="avatar">
              <div
                className="w-24 rounded-full"
                style={{
                  border: "2px #4C40ED groove",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <img src={imageUrl || img} />
              </div>
            </div>
            <br />
            <div style={{ display: "flex" }}>
              <input
                type="file"
                onChange={handleImageChange}
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              />{" "}
              &nbsp;{" "}
              <button onClick={handleImageUpload} className="btn btn-square">
                <img src="./upload.svg" alt="" />
              </button>
            </div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Change your name</span>
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered input-primary w-full max-w-xs"
              />
            </label>
            <br />
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Change your email</span>
              </div>
              <input
                type="text"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="input input-bordered input-primary w-full max-w-xs"
              />
            </label>
            <br />
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Change your phone number</span>
              </div>
              <input
                type="text"
                placeholder={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input input-bordered input-primary w-full max-w-xs"
              />
            </label>
            <br />
            <button
              className="btn btn-wide up-modal-btn2"
              style={{ marginTop: "10px" }}
              onClick={handleSubmit}
              disabled={buttonText === "Submitted"} 
            >
                {buttonText}{" "}
                    {buttonText === "Submitted" && (
                      <img src="./submitted.svg" alt="" />
                    )}
            </button>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default UserProfile;
