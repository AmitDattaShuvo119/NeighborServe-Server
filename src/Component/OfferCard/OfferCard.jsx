import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
const words = ["We", "offer", "14", "days", "free", "trail"];
const OfferCard = () => {

  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-500 py-16 mx-2 text-white mb-4 mt-4">
      <div className="container mx-auto text-center">
        <h1 className="text-xl lg:text-3xl font-extrabold mb-4 text-white">
          Welcome to Our Platform
        </h1>
        <h2 className=" text-2xl lg:text-4xl font-bold mb-4">
          Start Your 14-Day Free Trial
        </h2>
        <p className="text-lg mb-8">
          Explore all the premium features for free. No credit card required.
        </p>

        <button className="bg-white text-blue-500 font-bold py-2 px-6 rounded-full hover:bg-blue-700 hover:text-white transition duration-300">
          Get Started
        </button>
      </div>
    </section>
  
  );
};

export default OfferCard;
