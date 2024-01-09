import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import "../styles/Appointment.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ReqAppointment = () => {
  const { searchString } = useParams();
  const searchString2 = localStorage.getItem("userID");
  const apiUrl = `http://localhost:5000/providers/view_appointment/${searchString2}`;
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.appointments)) {
          setDataArray(data.appointments);
        } else {
          console.error("Appointments data is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [apiUrl]);

  const updateStatus = async (appointmentId, user_id, newStatus) => {
    try {
      const apiUrl = `http://localhost:5000/providers/updateAppointment/${searchString2}/${user_id}/${appointmentId}`;
      const response = await axios.patch(apiUrl, { status: newStatus });

      // Update the local state with the new status
      setDataArray((prevData) => {
        return prevData.map((appointment) =>
          appointment.appointmentId === appointmentId
            ? { ...appointment, status: newStatus }
            : appointment
        );
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  const cancelAppointment = (appointmentId) => {
    // Make an API request to cancel the appointment
    fetch(
      `http://localhost:5000/providers/cancel_appointment/${searchString}/${appointmentId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Handle the response, you can display a message to the user
        if (data.message === "Document deleted successfully") {
          setIsAppointmentCanceled(true);
          setTimeout(() => {
            setIsAppointmentCanceled(false);
          }, 2000);
        } else {
          alert("Failed to cancel the appointment.");
        }
      })
      .catch((error) => {
        console.error("Error canceling appointment:", error);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data initially

    const intervalId = setInterval(fetchData, 500); // Fetch data every 5 seconds (adjust as needed)

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [apiUrl]);

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
              <a>Appointment Requests</a>
            </li>
          </ul>
        </div>
        <h1 style={{ fontWeight: "bold", fontSize: "24px" }}>
          Appointment Requests
        </h1>
        <div className="overflow-x-auto" style={{ marginTop: "3%" }}>
          {dataArray.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th style={{ fontSize: "16px", color: "#4C40ED" }}>SL</th>
                  <th style={{ fontSize: "16px", color: "#4C40ED" }}>
                    Client Name
                  </th>
                  <th style={{ fontSize: "16px", color: "#4C40ED" }}>
                    Date Added
                  </th>
                  <th style={{ fontSize: "16px", color: "#4C40ED" }}>Status</th>
                  <th style={{ fontSize: "16px", color: "#4C40ED" }}>
                    Scheduled Date
                  </th>
                  {/* <th style={{ fontSize: "16px", color: "#4C40ED", textAlign:"center" }}>
                    Actions
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {dataArray
                  .filter((appointment) => appointment.status === "Pending")
                  .map((appointment, index) => (
                    <tr key={appointment.appointmentId}>
                      <td>{index + 1}</td>
                      <td>{appointment.user_fullname}</td>
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
                        <button
                          className="btn btn-primary btn-sm ml-2 text-white"
                          onClick={() =>
                            updateStatus(
                              appointment.appointmentId,
                              appointment.user_id,
                              "Accepted"
                            )
                          }
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-primary btn-sm ml-2"
                          style={{ background: "none", color: "#4C40ED" }}
                          onClick={() =>
                            cancelAppointment(appointment.appointmentId)
                          }
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#4C40ED";
                            e.target.style.color = "white";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "white";
                            e.target.style.color = "#4C40ED";
                          }}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p>No appointment requests found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReqAppointment;
