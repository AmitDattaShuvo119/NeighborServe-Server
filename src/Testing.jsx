import React, { useState } from "react";

function Testing() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState(null);
  const [isLocationFetched, setLocationFetched] = useState(false);

  const handleFindProsClick = () => {
    if (!isLocationFetched) {
      setLocationFetched(true);
      const apiKey = "pk.abc469b9f78bca652e6cedf09705e250";

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);

          const apiUrl = `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`;
          fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
              const fullAddress = data.display_name;
              // Find the index of "Dhaka" in the full address
              const dhakaIndex = fullAddress.indexOf("Dhaka");
              // If "Dhaka" is found, slice the address up to "Dhaka"
              const slicedAddress =
                dhakaIndex !== -1
                  ? fullAddress.slice(0, dhakaIndex + "Dhaka".length)
                  : fullAddress;
              const address = slicedAddress;
              setAddress(address);
              console.log("Address: " + address);
            })
            .catch((error) => {
              console.error("Error fetching address:", error);
            });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
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
            marginLeft: "15px",
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
              <p style={{ color: "#4C40ED", marginLeft: "15px" }}>{address}</p>
            ) : (
              <p style={{ color: "#4C40ED", marginLeft: "10px" }}>
                United International University, UIU Entrance Road, United City, Satarkul, Dhaka
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
          <button
            className="btn btn-primary"
            style={{ marginLeft: "5px", color: "white" }}
          >
            Find Pros
          </button>
        </div>
      </div>
    </div>
  );
}

export default Testing;
