import React, { useState, useEffect, useContext, CSSProperties } from "react";
import ProfileComponent from "./ProfileComponent";
import { AuthContext } from "../../Providers/AuthProviders";
import BarLoader from "react-spinners/BarLoader";
import { Link } from "react-router-dom";

const PersonList = ({ searchString }) => {
  const userId = localStorage.getItem("userID");
  console.log(userId);
  // Check if the user is logged in based on the presence of "UserID" in localStorage
  const isLoggedIn = !!userId; // Convert to a boolean
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#4C40ED",
  };
  const { user } = useContext(AuthContext);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#4C40ED");
  const x = searchString;
  // console.log(x);

  const apiUrl = `http://localhost:5000/providers/providers/${userId}/${x}`; // Replace with your API endpoint
  const [dataArray, setDataArray] = useState([]);
  // const [dataArray2, setDataArray2] = useState([]);
  const [dataArray3, setDataArray3] = useState([]);
  const [colorIndex, setColorIndex] = useState(0);
  const predefinedColors = ["#4C40ED", "#0000FF", "#ab20fd"]; // Define an array of color
  // Function to update the color state
  const updateColor = () => {
    setColorIndex((prevIndex) => (prevIndex + 1) % predefinedColors.length);
  };

  useEffect(() => {
    // Use the setInterval function to update the color every 1 second
    const colorInterval = setInterval(() => {
      updateColor();
    }, 1500);

    // Clear the interval when the component unmounts
    return () => clearInterval(colorInterval);
  }, []);

  useEffect(() => {
    // Use the useEffect hook to fetch data when the component mounts
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setDataArray(data);
        // Update the state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // const apiUrl3 = `http://localhost:5000/providers/getId/${userEmail}`; // Replace with your API endpoint

  // useEffect(() => {
  //   fetch(apiUrl3)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setDataArray3(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  // const userLat = dataArray3.map((item) => item.user_lat);
  // const userLon = dataArray3.map((item) => item.user_lon);

  if (!user) {
    return (
      <div style={{ marginLeft: "50%", marginTop: "2%" }}>
        {isLoggedIn ? (
          <BarLoader
            color={predefinedColors[colorIndex]}
            loading={loading}
            css={override}
            size={9}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <p style={{ marginLeft: "-25%" }}>
            Please{" "}
            <Link to={"/login"}>
              <span style={{ color: "#4C40ED" }}>Login</span>
            </Link>{" "}
            or{" "}
            <Link to={"/reg"}>
              <span style={{ color: "#4C40ED" }}>Signup</span>
            </Link>{" "}
            first
          </p>
        )}
      </div>
    );
  }

  // let result = "South Badda, Gulshan, Dhaka";
  // let regex = new RegExp(", Dhaka");
  // let modifiedString = result.replace(regex, "");
  // result = modifiedString;
  // let inputString = result;
  // let lastSpaceIndex = inputString.lastIndexOf(",");

  // if (lastSpaceIndex !== -1) {
  //   let lastSubstring = inputString.slice(lastSpaceIndex + 1);
  //   result = lastSubstring;
  // } else {
  //   result = inputString;
  // }

  // //haversine algorithm to calculate distances between 2 coordinates
  // function toRadians(degrees) {
  //   return degrees * (Math.PI / 180);
  // }

  // function haversine(lat1, lon1, lat2, lon2) {
  //   const R = 6371; // Radius of the Earth in kilometers
  //   const lat1Rad = toRadians(lat1);
  //   const lon1Rad = toRadians(lon1);
  //   const lat2Rad = toRadians(lat2);
  //   const lon2Rad = toRadians(lon2);
  //   const dlon = lon2Rad - lon1Rad;
  //   const dlat = lat2Rad - lat1Rad;

  //   const a =
  //     Math.sin(dlat / 2) ** 2 +
  //     Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dlon / 2) ** 2;
  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   const distance = R * c;
  //   // console.log("distance: " + distance);
  //   return distance;
  // }

  // const dataArrayUpdated = dataArray.map((place) => {
  //   const distance = haversine(
  //     userLat,
  //     userLon,
  //     place.user_lat,
  //     place.user_lon
  //   );
  //   return { ...place, distance };
  // });

  // // Sort the dataArrayWithDistances by distance in ascending order
  // dataArrayUpdated.sort((a, b) => a.distance - b.distance);

  return (
    <section>
      {dataArray
        // .filter((person) => person.user_location.includes(result))
        .slice(0, 5)
        .map((person, personIndex) => (
          <ProfileComponent {...person} key={person.id} />
        ))}
    </section>
  );
};

export default PersonList;
