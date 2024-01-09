import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Providers/AuthProviders";

const LocationBar = () => {
  const { user } = useContext(AuthContext);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState(null);
  const [isLocationFetched, setLocationFetched] = useState(false);

  const userEmail = localStorage.getItem("userEmail");
  const userId = localStorage.getItem("userID");
  // console.log("id:"+userId);

  const handleFindProsClick = async () => {
    if (!isLocationFetched) {
      setLocationFetched(true);

      const apiKey = "pk.abc469b9f78bca652e6cedf09705e250";

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);

          try {
            // Fetch userId from the backend based on the user's email
            // const userId = data[0]._id; // Assuming you have a single userId associated with the email
            const apiUrl1 = `http://localhost:5000/providers/update_location/${userId}`;
            const userAddress = await fetchUserAddress(
              apiKey,
              position.coords.latitude,
              position.coords.longitude
            );

            setAddress(userAddress);

            const data1 = {
              user_lat: position.coords.latitude,
              user_lon: position.coords.longitude,
              user_location: userAddress,
            };

            axios
              .patch(apiUrl1, data1)
              .then((response) => {
                console.log(response.data);
              })
              .catch((error) => {
                console.error(error);
              });
          } catch (error) {
            console.error("Error fetching userId:", error);
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    }
  };

  const fetchUserAddress = async (apiKey, latitude, longitude) => {
    const apiUrl = `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${latitude}&lon=${longitude}&format=json`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const fullAddress = data.display_name;
      const dhakaIndex = fullAddress.indexOf("Dhaka");
      const slicedAddress =
        dhakaIndex !== -1
          ? fullAddress.slice(0, dhakaIndex + "Dhaka".length)
          : fullAddress;
      return slicedAddress;
    } catch (error) {
      console.error("Error fetching address:", error);
      return null;
    }
  };

  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            width: "785px",
            height: "60px",
            marginTop: "2%",
            alignItems: "center",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            marginRight: "50px",
          }}
        >
          <div
            style={{
              outline: "none",
              height: "40px",
              width: "625px",
              marginLeft: "10px",
              borderRadius: "7px",
              border: "1px solid #4C40ED",
              display: "flex",
              alignItems: "center",
            }}
          >
            {isLocationFetched ? (
              <input
                style={{
                  backgroundColor: "white",
                  marginLeft: "2%",
                  fontWeight: "bold",
                }}
                disabled
                type="text"
                value={address}
              />
            ) : (
              <p style={{ color: "#B7C8E6", marginLeft: "2%" }}>
                Your location
              </p>
            )}
          </div>
          <button>
            <img
              src="./gps.svg"
              style={{ width: "25px", height: "25px", marginLeft: "5px" }}
              alt=""
              onClick={handleFindProsClick}
            />
          </button>
          <Link to={"/browse_service"}>
            {" "}
            <button
              className="btn btn-primary"
              style={{ marginLeft: "5px", color: "white" }}
            >
              Find Pros
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LocationBar;
