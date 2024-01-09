import React, { useEffect, useState } from "react";
import ProviderCard from "../ProviderCard/ProviderCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";


const FeatureProvider = () => {
  const [provider, SetProvider] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users/provider")
      .then((res) => res.json())
      .then((data) => SetProvider(data));
  }, []);
  return (
    <>
      <div >
        <h2 className="text-yellow-500 ml-12 pt-3"> P R O V I D E R S</h2>
        <h1 className=" text-xl lg:text-3xl font-semibold my-2 ml-12">
          Popular  Providers
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 p-2  lg:p-3 mb-1 ml-5 lg:ml-12">
          {provider.map((item) => (
            <ProviderCard key={item._id} item={item}></ProviderCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeatureProvider;
