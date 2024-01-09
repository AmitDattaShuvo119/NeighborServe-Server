import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import "../styles/Appointment.css";
import { Link, useParams } from "react-router-dom";
import useUser from "../hook/useUser";
import Footer from "./Footer/Footer";

const Appointment = () => {
  const [isUser] = useUser();
  const { searchString } = useParams();
  const searchString2 = localStorage.getItem("userID");
  const apiUrl = `http://localhost:5000/providers/view_appointment/${searchString2}`;
  const [dataArray, setDataArray] = useState([]);
  const x = "Client";
  const y = "Pro's Name";

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (Array.isArray(data.appointments)) {
        setDataArray(data.appointments);
      } else {
        console.error("Appointments data is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data initially

    const intervalId = setInterval(fetchData, 500); // Fetch data every 5 seconds (adjust as needed)

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [apiUrl]);

  useEffect(() => {
    // Your logic for handling changes in dataArray
    console.log("dataArray has changed:", dataArray);
  }, [dataArray]);

  return (
    <div>
      <Navbar />
      <br /><br /><br />
      <div className="at-container1">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link to={"/"}>
                <a>Home</a>
              </Link>
            </li>
            <li>
              <a>Scheduled Appointment</a>
            </li>
          </ul>
        </div>
        <h1 style={{ fontWeight: "bold", fontSize: "24px" }}>
          Scheduled Appointments
        </h1>
        <div className="overflow-x-auto" style={{ marginTop: "3%" }}>
          {dataArray.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th style={{ fontSize: "16px", color: "#4C40ED" }}>SL</th>
                  <th style={{ fontSize: "16px", color: "#4C40ED" }}>
                    {isUser ? y : x}
                  </th>
                  <th style={{ fontSize: "16px", color: "#4C40ED" }}>
                    Date Added
                  </th>
                  <th style={{ fontSize: "16px", color: "#4C40ED" }}>Status</th>
                  <th style={{ fontSize: "16px", color: "#4C40ED" }}>
                    Scheduled Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataArray
                  .filter(
                    (appointment) =>
                      (isUser && (appointment.status === "Accepted" ||
                      appointment.status === "Pending")) || (!isUser && appointment.status === "Accepted")
                  )

                  .map((appointment, index) => (
                    <tr key={appointment.appointmentId}>
                      <td>{index + 1}</td>
                      <td style={{ display: "flex" }}>
                        {isUser
                          ? appointment.pro_name
                          : appointment.user_fullname}{" "}
                        {}{" "}
                        {isUser ? (
                          <span className="badge badge-ghost badge-sm ml-1 mt-[3px] bg-slate-300">
                            {appointment.pro_category}
                          </span>
                        ) : (
                          ""
                        )}
                      </td>
                      <td>{appointment.dateAdded}</td>
                      <td>{appointment.status}</td>
                      <td>
                        {appointment.appointmentDate}{" "}
                        <span className="badge badge-ghost badge-sm ml-1">
                          {appointment.appointmentTime}
                        </span>
                      </td>
                      <td>
                        <Link
                          to={`/appointment_details/${searchString2}/${appointment.appointmentId}`}
                        >
                          <button
                            className="btn btn-primary btn-sm"
                            style={{
                              backgroundColor: "white",
                              color: "#4C40ED",
                              border: "none",
                            }}
                          >
                            View details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p>No appointments found.</p>
          )}
        </div>
      </div>
      <br />
      <br />
      <br /> <br />
      <br />
      <br /> <br />
      <br />
      <br /> <br />
      <br />
      <br /> <br />
      <br />
      <br /> <br />
      <Footer />
    </div>
  );
};

export default Appointment;
