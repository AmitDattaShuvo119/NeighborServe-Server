import React, { useState, useEffect, useContext } from "react";
import Navbar from "./Navbar/Navbar";
import "../styles/AppointmentDetails.css";
import { Link, useParams } from "react-router-dom";
import useUser from "../hook/useUser";
import useProvider from "../hook/useProvider";
import axios from "axios";
import Footer from "./Footer/Footer";
import { AuthContext } from "../Providers/AuthProviders";
import Countdown from "react-countdown";

const AppointmentDetails = () => {
  const [isUser] = useUser();
  const [isProvider] = useProvider();
  const { searchString } = useParams();
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [isAppointmentCanceled, setIsAppointmentCanceled] = useState(false);
  const [isJobFinished, setIsJobFinished] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const { user, logout } = useContext(AuthContext);
  const userId = localStorage.getItem("userID");
  const userImg = localStorage.getItem("userImg");
  const [buttonText, setButtonText] = useState("Submit now");
  const [distanceData, setDistanceData] = useState("");

  function formatDateToDDMMYYYY(date) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }

  const handleSubmitReview = (pro_id, appointmentId) => {
    if (!review.trim()) {
      // Comment is empty, you can prevent the submission or show an error message
      alert("Please add a comment before submitting.");
      return;
    }

    setButtonText("Submitted");
    const apiUrl = `http://localhost:5000/providers/post_review/${pro_id}`;

    const newReview = {
      reviewId: userId,
      reviewerId: userId,
      reviewerName: user.displayName,
      reviewerImg: userImg,
      review: review,
      date: formatDateToDDMMYYYY(new Date()),
    };
    axios
      .post(apiUrl, newReview)
      .then((response) => {
        // navigate(`/view_appointment/${searchString2}`);
        alert("Feedback submitted successfully!");
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });

    const apiUrl1 = `http://localhost:5000/providers/update_pro/${pro_id}`;
    const data1 = {
      user_rating: rating,
    };

    axios
      .patch(apiUrl1, data1)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Close the modal
    console.log("rating: ", rating);
    console.log("Submitted Review:", newReview);
    setTimeout(() => {
      updateStatus(appointmentId, userId, pro_id, "Done");
      setModalOpen(false);
    }, 3000);
  };

  const fetchAppointmentDetails = async () => {
    try {
      console.log(userId);
      const apiUrl = `http://localhost:5000/providers/appointment_details/${searchString}/${appointmentId}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setAppointment(data);
      const x = data.pro_id;
      const y = data.user_id;
      // console.log("id " + x);
      // console.log("id " + y);

      // Fetch distance data only if pro_id is available
      if (x) {
        console.log("Nihad");
        // console.log("Hello");
        const distanceApiUrl = `http://localhost:5000/providers/getDistance/${y}/${x}`;
        const response2 = await fetch(distanceApiUrl);
        const data2 = await response2.json();
        setDistanceData(data2);
        console.log(data2);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch appointment details initially
    fetchAppointmentDetails();

    // Set up a periodic fetch every 5 seconds (adjust as needed)
    const intervalId = setInterval(fetchAppointmentDetails, 500);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [appointmentId, searchString, userId]);

  const cancelAppointment = () => {
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

  const updateStatus = async (appointmentId, user_id, pro_id, newStatus) => {
    try {
      const apiUrl = `http://localhost:5000/providers/updateAppointment/${pro_id}/${user_id}/${appointmentId}`;
      const response = await axios.patch(apiUrl, { status: newStatus });

      // Update the local state with the new status
      setAppointment((prevAppointment) => ({
        ...prevAppointment,
        status: newStatus,
      }));

      setIsJobFinished(true);
      console.log(response.data);
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  // const CountdownRenderer = ({ hours, minutes, seconds, completed }) => {
  //   if (completed) {
  //     return <span>Appointment has ended!</span>;
  //   } else {
  //     return (
  //       <span>
  //         {hours}:{minutes}:{seconds}
  //       </span>
  //     );
  //   }
  // };
  const [countdownTime, setCountdownTime] = useState("");

  useEffect(() => {
    // Fetch appointment details initially
    fetchAppointmentDetails();

    // Set up a periodic fetch every 5 seconds (adjust as needed)
    const intervalId = setInterval(fetchAppointmentDetails, 5000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [appointmentId, searchString, userId]); // Log countdownTime changes

  return (
    <div>
      <Navbar />{" "}
      <br /><br /><br />
      {isAppointmentCanceled && (
        <div className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your purchase has been confirmed!</span>
        </div>
      )}
      {appointment ? (
        <div className="ad-container1">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <Link to={"/"}>
                  {" "}
                  <a>Home</a>
                </Link>
              </li>
              <li>
                <Link to={`/view_appointment/${searchString}`}>
                  {" "}
                  <a>Scheduled Appointments</a>
                </Link>
              </li>
              <li>Appoinment {appointment.appointmentId}</li>
            </ul>
          </div>
          <br />
          <div className="ad-main-container">
            <div
              style={{
                display: "flex",
                marginLeft: "20px",
              }}
            >
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                  width: "615px",
                }}
              >
                <div>
                  {" "}
                  <div style={{ display: "flex", gap: "10px" }}>
                    <img src="./appointment.svg" alt="" />
                    <p style={{ marginTop: "4px", color: "#6B6E81" }}>
                      {appointment.appointmentId}
                    </p>
                  </div>{" "}
                  {appointment.status === "Accepted" && (
                    <div
                      style={{
                        marginTop: "3px",
                        display: "flex",
                        fontSize: "13px",
                        color: "#6B6E81",
                      }}
                    >
                      {" "}
                      Appointment in &nbsp;
                      <span
                        style={{
                          color: "#4C40ED",
                          fontSize: "15px",
                          marginTop: "-1px",
                        }}
                      >
                        {" "}
                        <Countdown
                          date={`${appointment.appointmentDate} ${appointment.appointmentTime}`}
                          renderer={({
                            hours,
                            minutes,
                            seconds,
                            completed,
                          }) => {
                            if (completed) {
                              return <span>0s</span>;
                            } else {
                              const timeLeft = `${hours}h:${minutes}m:${seconds}s`;
                              setCountdownTime(timeLeft);
                              return (
                                <span>
                                  <span
                                    className="countdown font-mono text-2xl"
                                    style={{
                                      fontSize: "14px",
                                      fontFamily: "Söhne, sans-serif",
                                    }}
                                  >
                                    <span
                                      style={{ "--value": `${hours}` }}
                                    ></span>
                                    h &nbsp;
                                    <span
                                      style={{ "--value": `${minutes}` }}
                                    ></span>
                                    m&nbsp;
                                    <span
                                      style={{ "--value": `${seconds}` }}
                                    ></span>
                                    s
                                  </span>
                                </span>
                              );
                            }
                          }}
                        />
                      </span>{" "}
                    </div>
                  )}
                </div>

                <div
                  style={{
                    height: "27px",
                    width: "90px",
                    backgroundColor:
                      appointment.status === "Pending"
                        ? "#ff7e26"
                        : appointment.status === "Accepted"
                        ? "#78be20"
                        : appointment.status === "Completed"
                        ? "#0f9200"
                        : appointment.status === "Done"
                        ? "#2081f9"
                        : "#000000", // Default color if none of the statuses match
                    textAlign: "center",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "25px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Add box shadow
                  }}
                >
                  {appointment.status}
                </div>
              </div>
            </div>
            <hr
              style={{
                marginTop: "10px",
                width: "calc(100% - 20px)",
                marginLeft: "10px",
              }}
            />

            <div
              style={{ marginLeft: "35px", marginTop: "10px", display: "flex" }}
            >
              <Link to={`/provider_profile/${appointment.pro_id}`}>
                {" "}
                <div className="avatar">
                  <div className="w-20 rounded">
                    <img
                      src={isProvider ? distanceData.uimg : distanceData.pimg}
                      alt="Tailwind-CSS-Avatar-component"
                    />
                  </div>
                </div>{" "}
              </Link>
              <div>
                <ul>
                  <li>
                    <Link to={`/provider_profile/${appointment.pro_id}`}>
                      {" "}
                      <p
                        style={{
                          marginLeft: "10px",
                          color: "black",
                          fontSize: "22px",
                          fontWeight: "bold",
                        }}
                      >
                        {isProvider
                          ? appointment.user_fullname
                          : appointment.pro_name}{" "}
                        {!isProvider && (
                          <span style={{ marginTop: "-1.5x" }}>
                            <div className="badge badge-primary badge-outline">
                              {appointment.pro_category}
                            </div>
                          </span>
                        )}
                      </p>
                    </Link>
                  </li>
                  <li style={{ display: "flex", marginLeft: "5px" }}>
                    <img src="./gps.svg" alt="" />
                    <p
                      style={{
                        marginLeft: "5px",
                        fontSize: "15px",
                        color: "#6B6E81",
                      }}
                    >
                      {isProvider
                        ? distanceData.userLocation
                        : distanceData.proLocation}
                    </p>
                  </li>
                  <li style={{ display: "flex", marginLeft: "5px" }}>
                    <img src="./distance.svg" alt="" />
                    <p
                      style={{
                        marginLeft: "5px",
                        fontSize: "15px",
                        color: "#6B6E81",
                      }}
                    >
                      {distanceData.distance}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="ad-main-container2">
              <div>
                <span style={{ color: "#6B6E81" }}>Added on:</span>{" "}
                {appointment.appointmentDate}
              </div>
              <div className="vertical-line"></div>
              <div>
                {" "}
                <span style={{ color: "#6B6E81" }}>Appointment Date:</span>{" "}
                {appointment.appointmentDate}
              </div>
              <div className="vertical-line"></div>
              <div>{appointment.appointmentTime}</div>
            </div>
            {appointment.note && (
              <div className="ad-main-container3">
                <p
                  style={{
                    color: "#6B6E81",
                    marginLeft: "10px",
                    marginTop: "10px",
                  }}
                >
                  Note:{" "}
                  <span style={{ color: "black" }}>{appointment.note}</span>
                </p>
              </div>
            )}

            {isProvider && appointment.status === "Accepted" && (
              <button
                className="btn btn-primary text-white"
                style={{ marginLeft: "35px", marginTop: "10px" }}
                onClick={() =>
                  updateStatus(
                    appointment.appointmentId,
                    appointment.user_id,
                    appointment.pro_id,
                    "Completed"
                  )
                }
              >
                Finish Job
              </button>
            )}
            {isUser && appointment.status === "Completed" && !modalOpen && (
              <button
                className="btn btn-primary text-white"
                style={{ marginLeft: "35px", marginTop: "10px" }}
                onClick={() => {
                  console.log("Rate the Pro button clicked");
                  setModalOpen(true);
                }}
              >
                Rate the Pro
              </button>
            )}
            <div
              className={
                isUser && appointment.status === "Completed" && modalOpen
                  ? "ad-modal-container"
                  : "hidden"
              }
            >
              <div className="ad-modal-content">
                <div style={{ display: "flex", gap: "8px" }}>
                  <img src="./feedback.svg" alt="" />
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Feedback
                  </p>
                </div>
                <hr style={{ marginTop: "10px" }} />
                <br />
                <br />
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "22px",
                    fontWeight: "bold",
                  }}
                >
                  Give your feedback
                </p>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    color: "#B0B2B7",
                  }}
                >
                  Share your thoughts and help others make informed decisions!
                  Let us know what you liked or any areas where there's room for
                  improvement. Your feedback is valuable to our community
                </p>
                <br />
                <div
                  className="rating"
                  style={{
                    justifyContent: "center",
                    gap: "7px",
                  }}
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <input
                      key={value}
                      type="radio"
                      name="rating-1"
                      className="mask mask-star-2 bg-blue-purple w-8 h-8"
                      value={value}
                      checked={rating === value}
                      onChange={() => setRating(value)}
                    />
                  ))}
                </div>
                <br />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <textarea
                    style={{ width: "100%" }}
                    id="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="textarea textarea-primary"
                    placeholder="Add a comment"
                    required
                  ></textarea>
                  <br />
                  <button
                    onClick={() =>
                      handleSubmitReview(
                        appointment.pro_id,
                        appointment.appointmentId,
                        appointment.user_id
                      )
                    }
                    className="btn btn-wide ad-modal-btn"
                    disabled={buttonText === "Submitted"} // Disable the button when it's in the "Submitted" state
                  >
                    {buttonText}{" "}
                    {buttonText === "Submitted" && (
                      <img src="./submitted.svg" alt="" />
                    )}
                  </button>
                </div>

                <br />
              </div>
            </div>
            {!isJobFinished &&
              (appointment.status === "Pending" ||
                appointment.status === "Accepted") && (
                <Link to={`/view_appointment/${searchString}`}>
                  <button
                    style={{ marginLeft: "35px", marginTop: "10px" }}
                    className="btn btn-outline btn-primary"
                    onClick={cancelAppointment}
                  >
                    Cancel Appointment
                  </button>
                </Link>
              )}
          </div>
        </div>
      ) : (
        <p>Loading appointment details...</p>
      )}
      <br />
      <br />
      <br /> <br />
      <br />
      <br /> <br />
      <br />
      <br /> <br />
      {/* <Footer /> */}
    </div>
  );
};

export default AppointmentDetails;
