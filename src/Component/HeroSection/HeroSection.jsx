import React, { useState, useEffect } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import photo from "../../assets/photo-1.jpeg";
import { Link } from "react-router-dom";
import axios from "axios";
import LocationBar from "./LocationBar";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const serviceNames = [
    "Electrical",
    "Plumbing",
    "Cleaning",
    "Painting",
    "Pest",
    "Moving",
    "HVAC",
    "Gas Stove",
    "Wall/Ceiling Repair",
    "Computer",
    "Carpentry",
    "Car Wash",
  ];

  const [serviceIndex, setServiceIndex] = useState(0);
  const [isServiceChanged, setServiceChanged] = useState(false);

  const updateServiceName = () => {
    if (serviceIndex < serviceNames.length - 1) {
      setServiceChanged(true);
      setTimeout(() => {
        setServiceIndex(serviceIndex + 1);
        setServiceChanged(false);
      }, 500);
    } else {
      setServiceIndex(0);
    }
  };

  useEffect(() => {
    const interval = setInterval(updateServiceName, 1500);

    return () => {
      clearInterval(interval);
    };
  }, [serviceIndex]);

  const bounceVariants = {
    initial: { y: 0 },
    animate: { y: [20, 0, 20], transition: { yoyo: Infinity, duration: 18 } },
  };
  const bounceVariants1 = {
    initial: { y: 0 },
    animate: { y: [-20, 0, -20], transition: { yoyo: Infinity, duration: 18 } },
  };
  const bounceVariants2 = {
    initial: { y: 0 },
    animate: { y: [0, -20, 0], transition: { yoyo: Infinity, duration: 18 } },
  };
  const bounceVariants3 = {
    initial: { x: 0 },
    animate: { x: [-20, 20, -20, 0], transition: { yoyo: Infinity, duration: 18 } },
  };
  return (
    <div >
      <div
        className="flex flex-col lg:flex-row lg:gap-2 "
        style={{ marginLeft: "5px", style: "red" }}
      >
        <div className="flex lg:w-1/2 lg:p-24 mt-7">
          <div>
            <motion.div
              variants={bounceVariants}
              initial="initial"
              animate="animate"
            >
              <img
                className="lg:w-96 lg:h-96  rounded-full"
                src="./home-bg1.png"
                alt=""
              />
            </motion.div>
            <motion.div
              variants={bounceVariants1}
              initial="initial"
              animate="animate"
            >
              <img
                className="lg:w-48 lg:h-48 lg:ml-24 rounded-full "
                src="./home-bg2.png"
                alt=""
              />
            </motion.div>
          </div>

          <div className="flex-col">
            <motion.div
              variants={bounceVariants2}
              initial="initial"
              animate="animate"
            >
              <img
                className="lg:w-36 lg:h-36 rounded-full"
                src="./home-bg3.png"
                alt=""
              />
            </motion.div>
            <motion.div
              variants={bounceVariants3}
              initial="initial"
              animate="animate"
            >
              <img
                className="lg:w-48 lg:h-48  rounded-full"
                src="./home-bg4.png"
                alt=""
              />
            </motion.div>
            <motion.div
              variants={bounceVariants3}
              initial="initial"
              animate="animate"
            >
              <img
                className="lg:w-72 lg:h-72  rounded-full"
                src="./home-bg5.png"
                alt=""
              />
            </motion.div>
          </div>
        </div>
        <div className="lg:w-1/2 mx-5 text-center my-7 lg:my-36 ">
          <h1 className="text-lg lg:text-3xl lg:text-right font-semibold leading-loose lg:mb-5  lg:mr-[152px]  ">
            Your{" "}
            <span className="text-primary font-bold text-xl lg:text-4xl">
              One-Stop
            </span>{" "}
            Solution for Every Home Service, We Offer{" "}
            <span className="text-primary font-bold text-xl lg:text-4xl">
              {" "}
              {serviceNames[serviceIndex]}
            </span>{" "}
            Service
          </h1>
          <div className="lg:mx-[-15px] ">
            {/* <input
            type="text"
            placeholder="Search for exparts"
            className=" input input-bordered  rounded-l rounded-r-none shadow-xl border-r-0  lg:h-[54.5px]  input-primary w-48 lg:w-full max-w-xs"
          />
          <button className="bg-primary lg:h-[55px] px-3 lg:px-5 py-3 lg:py-4 mt-3  text-white rounded-l-none rounded-r ">
            Search
          </button> */}
          </div>
          {/* <div className="flex flext-col lg:flex-row lg:mt-4 ml-[50px] lg:ml-[360px]">
          <button className=" ml-24 lg:ml-0 my-3 lg:my-0 lg:text-xl bg-primary font-bold text-white p-1 rounded-sm">
            {" "}
            Smart Recomendation{" "}
          </button>
          <BsFillInfoCircleFill
            size={20}
            fill="rgb(76, 64, 237)"
            className=" mt-5 ml-2 lg:mt-2 "
          />
        </div> */}
          <LocationBar />
          <p className=" text-center lg:mr-[150px] lg:text-right lg:mt-4 lg:text-2xl">
            Your <span className="text-primary">Neighborhood</span>,Your{" "}
            <span className="text-primary">Services</span> <br></br>
            Let's Shape a Better Tomorrow Together.
          </p>
        </div>
      </div>
    </div>
  );
};
