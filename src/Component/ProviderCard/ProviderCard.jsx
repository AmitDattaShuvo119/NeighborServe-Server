import React from "react";
import { motion } from "framer-motion";
import { FaHeart } from 'react-icons/fa';
const ProviderCard = (props) => {
  const { user_fullname, user_category, user_img } = props.item;
  return (
    <div className="my-2 mx-2 lg:my-4 lg:mx-4  ">
      <motion.div whileHover={{ scale: 1.1 }}>
        <div className="card max-w-[300px] mx-auto mt-2 lg:max-w-[400px] lg:max-h-[200px] bg-base-200 shadow-xl relative overflow-hidden hover:scale-105 transform transition-transform duration-300">
          <figure className="px-2  pt-2">
            <img
              src={user_img}
              alt="Category Icon"
              className=" w-12 mt-2 p-3 lg:w-20 transition-transform transform-gpu duration-300 hover:scale-150"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{user_fullname}</h2>

            <h2>{user_category}</h2>
          </div>
        </div>
      </motion.div>
    </div>


  );
};

export default ProviderCard;
