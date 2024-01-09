import React, { useState, useEffect, useContext } from "react";
import "./styles/browse_service.css";
import { Link, Outlet } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar";
import ElectricalService from "./Component/Services/ElectricalService";
import PlumbingService from "./Component/Services/PlumbingService";
import CleaningService from "./Component/Services/CleaningService";
import PaintService from "./Component/Services/PaintService";
import MoveService from "./Component/Services/MoveService";
import PestService from "./Component/Services/PestService";
import HvacService from "./Component/Services/HvacService";
import GasService from "./Component/Services/GasService";
import WallRepairService from "./Component/Services/WallRepairService";
import CarService from "./Component/Services/CarService";
import CarpentryService from "./Component/Services/CarpentryService";
import ComputerService from "./Component/Services/ComputerService";
import Footer from "./Component/Footer/Footer";
import { motion } from "framer-motion";


function Browse_service() {
  const text =
    " We offer a diverse suite of services, from home maintenance and repairs to renovations and installations. Whatever your home needs, we've got you covered with expert solutions tailored to your preferences.";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03, // Adjust the stagger duration between characters
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

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const backgroundImageUrls = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg",
    "image4.jpg",
    "car.jpg",
    "gas.jpg",
    "plumb.jpg",
    "pest.jpg",
    "move.jpg",
    "wall.jpg",
    "paint.jpg",
    "cleaning.jpg",
    "computer.jpg",
    "hvac.jpg",
    "carpentry.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate the next image index
      const nextIndex = (currentImageIndex + 1) % backgroundImageUrls.length;
      setCurrentImageIndex(nextIndex);
    }, 2000); // Change image every 2 seconds (2000 milliseconds)

    return () => {
      clearInterval(interval); // Clean up the interval on unmount
    };
  }, [currentImageIndex]);

  const containerStyle = {
    backgroundImage: `url('${backgroundImageUrls[currentImageIndex]}')`,
  };

  return (
    <div>
      <Navbar />
      
      <Outlet />
      <div className="bs-container1" style={containerStyle}>
        <div className="bs-container2">Hire Professonal Service Providers</div>
      </div>
      <br />

      <div className="bs-container4">
        {/* <p className="bs-p1">
          We offer a diverse suite of services, from home maintenance and
          repairs to renovations and installations. Whatever your home needs,
          we've got you covered with expert solutions tailored to your
          preferences.
        </p> */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          style={{  fontSize:"22px" }}
          className="staggered-text"
        >
          {text.split("").map((char, index) => (
            <motion.span key={index} variants={textVariants}>
              {char}
            </motion.span>
          ))}
        </motion.div>
        <br />
        <br />
        <p className="bs-container5">All Services</p>
        <div className="bs-container3">
          <ElectricalService />
          <PlumbingService />
          <CleaningService />
          <PaintService />
          <PestService />
          <MoveService />
          <HvacService />
          <GasService />
          <WallRepairService />
          <ComputerService />
          <CarpentryService />
          <CarService />
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Browse_service;
