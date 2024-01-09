import React, { useState, useEffect, useContext } from "react";
import ProfileComponent from "./ProfileComponent";
import { AuthContext } from "../../Providers/AuthProviders";
import BarLoader from "react-spinners/BarLoader";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./ProfileComponent.css";

function PersonList2({ searchString }) {
  const userId = localStorage.getItem("userID");
  const [recommendationValue, setRecommendationValue] = useState(0);
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!userId; // Convert to a boolean

  const [refreshKey, setRefreshKey] = useState(0);

  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(index1 + 5);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(0);

  const [loadingRecommendation, setLoadingRecommendation] = useState(false);

  const text2 = " Result generated based on rating, review, experience";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.015, // Adjust the stagger duration between characters
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const pageChange = () => {
    setIndex1(index1 + 5);
    setPage(page + 1);
  };

  const pageChange2 = () => {
    setIndex1(Math.max(0, index1 - 5));
    setPage(Math.max(1, page - 1));
  };

  useEffect(() => {
    setIndex2(index1 + 5);
  }, [index1]);

  const handleRefreshClick = () => {
    // Increment the key to trigger a re-render
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#4C40ED",
  };

  const [dataArray, setDataArray] = useState([]);
  const [initialData, setInitialData] = useState([]);

  const x = searchString;

  const apiUrl = `http://localhost:5000/providers/providers/${userId}/${x}`;
  const apiUrlnew = `http://127.0.0.1:5001/api/v1/hello?id=${userId}&category=${x}`;
  const [recommendationId, setRecommendationId] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setDataArray(data);
          const l = data.length;
          console.log("page: " + l / 5);
          setPageLimit(l / 5); // Assuming you want to set the page limit based on the data length
          setInitialData(data); // Store the initial data
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [apiUrl, isLoggedIn]);

  const recommendation = async () => {
    setLoadingRecommendation(true);
    setRecommendationValue(1);
    try {
      console.log("Hello");
      const response = await fetch(apiUrlnew);
      const data = await response.json();

      if (data) {
        setRecommendationId(data.recommendation);
      }
      console.log(recommendationId); // Move the log here
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingRecommendation(false);
    }
  };

  useEffect(() => {
    // Fetch data based on recommendationId or recommendationValue
    if (
      isLoggedIn &&
      (recommendationId !== null || recommendationValue === 1)
    ) {
      const apiUrlnew2 = `http://localhost:5000/providers/providersProfile?id=${recommendationId}`;
      fetch(apiUrlnew2)
        .then((response) => response.json())
        .then((data) => {
          setDataArray(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [recommendationId, isLoggedIn]);

  const handleShowAllClick = () => {
    // Reset the recommendation state and show the initial results
    setRecommendationValue(0);
    setRecommendationId(null);
    setDataArray(initialData);
  };

  if (loadingRecommendation) {
    return (
      <div style={{ marginLeft: "50%", marginTop: "2%" }}>
        <BarLoader
          color="#4C40ED"
          loading={loadingRecommendation}
          css={override}
          size={9}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ marginLeft: "50%", marginTop: "2%" }}>
        {isLoggedIn ? (
          <BarLoader
            color="#4C40ED"
            loading={!dataArray.length}
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

  return (
    <section key={refreshKey}>
      {recommendationValue !== 1 && (
        <div
          className="tooltip tooltip-right"
          data-tip="This recommendation system provides personalized suggestions to users based on their history and preferences"
        >
          <button
            style={{
              marginBottom: "10px",
              marginTop: "10px",
              color: "white",
              whiteSpace: "nowrap",
            }}
            onClick={recommendation}
            className="btn btn-primary smart-btn"
          >
            Smart Recommendation
          </button>
        </div>
      )}
      {recommendationValue === 1 && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          style={{ fontSize: "18px", color: "#676464" }}
        >
          {text2.split("").map((char, index) => (
            <motion.span key={index} variants={textVariants}>
              {char}
            </motion.span>
          ))}
        </motion.div>
      )}
      {dataArray
        .filter((person) => userId !== person._id)
        .slice(index1, index2)
        .map((person, personIndex) => (
          <ProfileComponent {...person} key={person.id} />
        ))}

      {recommendationValue === 1 && (
        <button
          style={{ marginBottom: "10px", marginTop: "10px", color: "white" }}
          onClick={handleShowAllClick}
          className="btn btn-primary"
        >
          Show All
        </button>
      )}
      <br />
      {recommendationValue !== 1 && (
        <div
          className="join"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {page > 1 && (
            <button
              style={{ color: "#4C40ED" }}
              className="join-item btn"
              onClick={pageChange2}
            >
              «
            </button>
          )}
          <button
            style={{ color: "#4C40ED", backgroundColor: "#F2F2F2" }}
            disabled
            className="join-item btn"
          >
            Page {page}
          </button>
          {page < pageLimit && (
            <button
              style={{ color: "#4C40ED" }}
              className="join-item btn"
              onClick={pageChange}
            >
              »
            </button>
          )}
        </div>
      )}
    </section>
  );
}

export default PersonList2;
