import React, { useState, useRef, useEffect } from "react";
import Navbar from "./Component/Navbar/Navbar";
import "./styles/Provider_Profile.css";
import Icon_info from "./Component/Icon_info";
import { Link, useNavigate, useParams } from "react-router-dom";
import CommentList from "./Component/Comment";
import Footer from "./Component/Footer/Footer";
import axios from "axios";
import useAuth from "./hook/useAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./NordDatePicker.css";
// import { v4 as uuidv4 } from "uuid";

function Provider_Profile() {
  const { user} = useAuth();
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState(""); // State to store selected time slot
  const [note, setNote] = useState("");
  const [homeAddress, sethomeAddress] = useState("");
  const [address, setAddress] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]); // Replace with your available slots
  const [dataArray, setDataArray] = useState([]);
  const [dataArray2, setDataArray2] = useState([]);
  const [dayStatus, setdayStatus] = useState("Today");
  const { searchString } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const availabilityRef = useRef(null);
  const searchString2 = localStorage.getItem("userID");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const toggleDiv = () => {
    setIsOpen(!isOpen);
  };

  const [isFavorite, setIsFavorite] = useState(false);
   const userEmail = user?.email;
  const handleFavoriteClick = async () => {
    try {
      const response = await axios.post("http://localhost:5000/users/addFavoriteProvider", {
        userEmail,
        providerId: searchString,
      });
      if (response.status === 200) {

        setIsFavorite(!isFavorite);
      }
    } catch (error) {
      console.log("Error adding favorite provider");
    }
  };

  const apiUrl = `http://localhost:5000/providers/providersProfile?id=${searchString}`; // Replace with your API endpoint

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setDataArray(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const apiUrl2 = `http://localhost:5000/providers/providersProfile?id=${searchString2}`; // Replace with your API endpoint

  useEffect(() => {
    fetch(apiUrl2)
      .then((response) => response.json())
      .then((data) => {
        setDataArray2(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        availabilityRef.current &&
        !availabilityRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const apiUrl1 = `http://localhost:5000/providers/appointment/${searchString}/${selectedDate2}`; // Replace with your API endpoint

  useEffect(() => {
    if (selectedDate2) {
     
    fetch(apiUrl1)
        .then((response) => response.json())
        .then((data) => {
          setAvailableSlots(data.availableTimeSlots);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [apiUrl1, selectedDate2]);

  function renderFreeSlots() {
    if (!availableSlots) {
      return (
        <option value="" disabled>
          Select a time slot
        </option>
      );
    }

    return availableSlots.map((slot) => (
      <option key={slot} value={slot}>
        {slot}
      </option>
    ));
  }

  function generateAppointmentId() {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 1000); // Adjust the range as needed
    return `${timestamp}-${randomNum}`;
  }
  function formatDateToDDMMYYYY(date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  }

  const reqAppoint = () => {
    if (!selectedSlot || !homeAddress || !selectedDate2) {
      // One or more required fields are missing, display an error or prevent form submission.
      alert("Please fill in all required fields.");
      return; // Do not continue with the form submission.
    }
    const apiUrl2 = `http://localhost:5000/providers/create-appointment/${searchString}`;
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const newAppointment = {
      appointmentId: generateAppointmentId(),
      pro_id: searchString,
      pro_name: dataArray[0].user_fullname,
      pro_category: dataArray[0].user_category,
      pro_img: dataArray[0].user_img,
      user_fullname: dataArray2[0].user_fullname,
      user_id: searchString2,
      dateAdded: formatDateToDDMMYYYY(new Date()),
      appointmentTime: selectedSlot,
      appointmentDate: selectedDate2,
      homeAddress: homeAddress,
      note: note,
      status: "Pending",
    };
    // Make a POST request to the server to save the new appointment
    axios
      .post(apiUrl2, newAppointment)
      .then((response) => {
        navigate(
          `/appointment_details/${searchString2}/${newAppointment.appointmentId}`
        );
        setIsOpen(false);
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
  };

  const CustomDatePickerInput = ({ onClick }) => (
    <div
      style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      onClick={onClick}
    >
      <img src="./calendar.svg" alt="" />
      &nbsp;{" "}
      {selectedDate ? formatDateToDDMMYYYY(selectedDate) : "Choose a date"}
    </div>
  );

  const dateFormatter = (date) => {
    if (date) {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      const formattedDate = `${month}-${day}-${year}`;
      setSelectedDate2(formattedDate);
    }
  };
  
    console.log(selectedDate2);
  

  const filterPastDates = (date) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set current date to midnight

    return date >= currentDate;
  };

  function validateForm() {
    return selectedSlot && homeAddress && note;
  }

  const shareId = () => {
    const currentLink = window.location.href;

    // Create a temporary input element
    const tempInput = document.createElement("input");
    tempInput.value = currentLink;

    // Append the input element to the document
    document.body.appendChild(tempInput);

    // Select the input element's content
    tempInput.select();

    try {
      // Execute the copy command using the modern approach
      document.execCommand("copy");
      // Provide feedback to the user (you can customize this part)
      alert("Link copied to clipboard");
    } catch (err) {
      // Handle the error (e.g., by informing the user)
      console.error("Unable to copy to clipboard", err);
    } finally {
      // Remove the temporary input element
      document.body.removeChild(tempInput);
    }
  };

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      {dataArray
        // .filter((person) => person.user_id === val)
        .map((person, personIndex) => (
          <div className="pp-container0">
            <div style={{ display: "flex", height: "50px" }}>
              <img
                src="back.png"
                style={{ width: "25px", height: "25px" }}
                alt=""
              />
              <Link to={`/search_result/${person.user_category}`}>
                {" "}
                <p style={{ color: "#4C40ED", opacity: "0.8" }}>
                  Back to other {person.user_category}s
                </p>
              </Link>
            </div>

            <div className="pp-container1">
              <div className="pp-container2">
                <div style={{ display: "flex" }}>
                  <button className="pp-bt1">About</button>
                  <button className="pp-bt1" style={{ marginLeft: "4%" }}>
                    Service History
                  </button>
                </div>
                <hr style={{ marginTop: "10px" }} />
                <div style={{ display: "flex", marginTop: "3%" }}>
                  <div className="avatar">
                    <div className="xl:w-48 xl:h-52 sm:w-32 sm:h-36 rounded object-contain">
                      <img
                        src={person.user_img}
                        class="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      flex: "display",
                      flexDirection: "column",
                      marginLeft: "3%",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <p className="pp-container9">{person.user_fullname}</p>
                      &nbsp; &nbsp;
                      <div
                        className="badge text-blue-purple pp-container10 "
                        style={{ marginTop: "8px" }}
                      >
                        {person.user_category}
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div className="pp-container4">
                        <img
                          src="gps.svg"
                          alt="Icon Description"
                          style={{ width: "25px", height: "25px" }}
                        />
                        &nbsp;
                        <p className="pp-container12">{person.user_location}</p>
                      </div>

                      {/* <div className="pp-container4">
                      <img
                        src="Time.png"
                        alt="Icon Description"
                        style={{ width: "25" }}
                        className="pp-container11"
                      />
                      &nbsp;
                      <p className="pp-container12">
                        Member since {person.user_regYear}
                      </p>
                    </div> */}

                      <div className="pp-container4">
                        <img
                          src="trophy.svg"
                          alt="Icon Description"
                          style={{ width: "25px", height: "25px" }}
                          className="pp-container11"
                        />
                        &nbsp;
                        <p className="pp-container12">
                          Hired {person.user_hireCount} times
                        </p>
                      </div>

                      <div className="pp-container4">
                        {/* <Icon_info index={"./v.svg"} /> */}
                        <img
                          src="v.svg"
                          alt="Icon Description"
                          style={{ width: "25px", height: "25px" }}
                          className="pp-container11"
                        />
                        &nbsp;
                        <p
                          className="pp-container12"
                          style={{ marginTop: "0.8%" }}
                        >
                          {person.user_verficationStatus} Verified
                        </p>
                      </div>

                      <div
                        className="pp-container4"
                        style={{ marginTop: "-0.5%" }}
                      >
                        <img
                          style={{ height: "25px", width: "25px" }}
                          src="./Star.svg"
                          alt=""
                        />
                        &nbsp;
                        <p
                          className="pp-container12"
                          style={{ marginTop: "1%" }}
                        >
                          {person.user_rating} <span> star rated</span>
                        </p>
                      </div>
                    </div>
                    <div
                      className="pp-container7"
                      style={{ marginTop: "1.5%" }}
                    >
                      <button
                        style={{ marginLeft: "5%" }}
                        onClick={shareId}
                        className="btn bg-blue-purple btn-sm text-white w-24 h-10"
                      >
                        Share
                      </button>
                      {/* <button
                        style={{ marginLeft: "3%" }}
                        className="btn bg-blue-purple btn-sm text-white w-24 h-10"
                      >
                        Favorite
                      </button> */}
                       
                      <button style={{ marginLeft: "3%" }}  className="btn bg-blue-purple btn-sm text-white w-24 h-10"  onClick={handleFavoriteClick}>
                        {isFavorite
                          ? "Remove Favorites"
                          : "Add Favorites"}
                      </button>
                      <button
                        style={{ marginLeft: "3%" }}
                        className="btn bg-blue-purple btn-sm text-white w-24 h-10"
                      >
                        Message
                      </button>
                    </div>
                  </div>
                </div>
                <br />
                <p className="pp-container8">Service Details</p>
                <p style={{ textAlign: "justify", color: "#8E8D8D" }}>
                  {person.user_serviceDetails}
                </p>
                <br />
                <div
                  className="carousel w-full"
                  style={{ borderRadius: "7px" }}
                >
                  <div id="slide1" className="carousel-item relative w-full">
                    <img src="image1.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                      <a href="#slide4" className="btn btn-circle">
                        ❮
                      </a>
                      <a href="#slide2" className="btn btn-circle">
                        ❯
                      </a>
                    </div>
                  </div>
                  <div id="slide2" className="carousel-item relative w-full">
                    <img src="image2.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                      <a href="#slide1" className="btn btn-circle">
                        ❮
                      </a>
                      <a href="#slide3" className="btn btn-circle">
                        ❯
                      </a>
                    </div>
                  </div>
                  <div id="slide3" className="carousel-item relative w-full">
                    <img src="image3.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                      <a href="#slide2" className="btn btn-circle">
                        ❮
                      </a>
                      <a href="#slide4" className="btn btn-circle">
                        ❯
                      </a>
                    </div>
                  </div>
                  <div id="slide4" className="carousel-item relative w-full">
                    <img src="image4.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                      <a href="#slide3" className="btn btn-circle">
                        ❮
                      </a>
                      <a href="#slide1" className="btn btn-circle">
                        ❯
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ width: "360px", marginLeft: "3%" }}>
                {" "}
                <div className="pp-container3">
                  {" "}
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginLeft: "3%",
                    }}
                  >
                    Book an appointment
                  </p>
                  <select
                    className="select select-primary w-full max-w-xs border-blue-purple"
                    style={{
                      marginTop: "1%",
                      margin: "auto",
                      borderRadius: "5px",
                    }}
                  >
                    <option disabled selected>
                      Select Urgency Level
                    </option>
                    <option>Yes, It is urgent</option>
                    <option>No, It is not urgent</option>
                  </select>
                  <button
                    style={{
                      margin: "auto",
                      marginTop: "-2%",
                      borderRadius: "5px",
                    }}
                    className="btn bg-blue-purple btn-sm text-white w-80 h-10"
                    onClick={toggleDiv}
                  >
                    Check Availability
                  </button>
                  {isOpen && (
                    <div className="availability-div " ref={availabilityRef}>
                      <p
                        style={{
                          fontWeight: "bold",
                          fontSize: "18px",
                          marginTop: "2%",
                        }}
                      >
                        Preffered day for Service
                      </p>
                      <div style={{ display: "flex" }}>
                        {/* <button
                          style={{ marginLeft: "12.5%", marginTop: "3%" }}
                          className={`btn bg-blue-purple btn-sm text-white w-32 h-10 ${
                            dayStatus === "Today" ? "active" : ""
                          }`}
                          // onClick={() => handleDayChange("Today")}
                        >
                          Today
                        </button>{" "} */}
                        {/* <button
                          style={{ marginLeft: "3%", marginTop: "3%" }}
                          className={`btn bg-blue-purple btn-sm text-white w-32 h-10 ${
                            dayStatus === "Tomorrow" ? "active" : ""
                          }`}
                          // onClick={() => handleDayChange("Tomorrow")}
                        >
                          Tomorrow
                        </button> */}
                      </div>
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => dateFormatter(date)}
                        dateFormat="MMMM d, yyyy"
                        placeholderText="Choose a date"
                        customInput={<CustomDatePickerInput />}
                        showPopperArrow={false}
                        popperPlacement="bottom-start"
                        popperModifiers={{
                          preventOverflow: {
                            enabled: true,
                            escapeWithReference: false,
                            boundariesElement: "viewport",
                          },
                        }}
                        filterDate={filterPastDates}
                      />

                      <p
                        style={{
                          fontWeight: "bold",
                          fontSize: "18px",
                          marginTop: "2%",
                        }}
                      >
                        Free Slots
                      </p>

                      <select
  required
  className="select select-primary w-full max-w-xs border-blue-purple"
  style={{
    marginTop: "1%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "5px",
  }}
  value={selectedSlot || ""}  // Change here
  onChange={(e) => setSelectedSlot(e.target.value)}
>
  <option disabled value="">
    Choose a slot
  </option>
  {renderFreeSlots()}
</select>

                      <p style={{ marginTop: "5px", fontWeight: "bold" }}>
                        Your Address{" "}
                      </p>
                      <input
                        required
                        style={{ marginLeft: "auto", marginRight: "auto" }}
                        type="text"
                        placeholder="Your address"
                        className="input input-bordered input-primary w-full max-w-xs"
                        value={homeAddress}
                        onChange={(e) => sethomeAddress(e.target.value)}
                      />
                      <p
                        style={{
                          fontWeight: "bold",
                          fontSize: "18px",
                          marginTop: "2%",
                        }}
                      >
                        Leave note
                      </p>
                      <textarea
                        style={{
                          marginTop: "2%",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                        className="textarea textarea-primary w-[330px]"
                        placeholder="Please leave any additional notes or information here..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      ></textarea>

                      {/* <Link to={`/view_appointment/${searchString}`}> */}
                      <button
                        style={{
                          marginLeft: "29px",
                          marginTop: "3%",
                        }}
                        className="btn bg-blue-purple btn-sm text-white w-[300px] h-10"
                        onClick={() => {
                          // Execute the reqAppoint function

                          reqAppoint();
                        }}
                      >
                        Request Service
                      </button>
                    </div>
                  )}
                  <div
                    style={{
                      display: "flex",
                      marginLeft: "10%",
                      marginBottom: "3%",
                    }}
                  >
                    <img
                      src="msg2.png"
                      alt=""
                      style={{ height: "25px", width: "25px" }}
                    />
                    <p style={{ fontSize: "16px", marginLeft: "1%" }}>
                      Responds in about {person.user_respondTime} minutes
                    </p>
                  </div>
                </div>
                <div className="pp-container6">
                  <p
                    style={{
                      color: "#4C40ED",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    Reviews
                  </p>
                  <p style={{ fontSize: "13px" }}>
                    Users rated this service provider highly for
                    professionalism, responsiveness, and work quality.
                  </p>
                  <div
                    style={{
                      maxHeight: "580px",
                      width: "340px",
                      borderTop: "4px solid #4C40ED",
                      borderRadius: "0 0 5px 5px",
                      marginTop: "3%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between", // Added this to space items vertically
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <CommentList userReviews={person.user_reviews} />{" "}
                    {/* <button
                      className="btn btn-sm w-28"
                      style={{
                        marginTop: "1%",
                        marginBottom: "2%",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    >
                      Load more
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}
export default Provider_Profile;
