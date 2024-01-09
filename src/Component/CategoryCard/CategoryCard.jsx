import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import './style.css'

const CategoryCard = (props) => {
  const { category, icon } = props.item;
  return (
    <Link to={`/users/provider/${category}`}>
      <div className=" m-2 lg:my-4 lg:mx-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="card  bg-base-100 shadow-sm hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white "
          
        >
          <div className="card  bg-base-200 shadow-sm hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white ">
            <figure className="px-2 pt-2">
              <img src={icon} alt="Category Icon" className=" w-12 lg:w-20" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{category}</h2>
            </div>
          </div>
        </motion.div>
      </div>
{/* <div className="m-2 lg:my-4 lg:mx-4 relative overflow-hidden">
  <motion.div
    whileHover={{ scale: 1.1 }}
    className="card bg-base-100 shadow-xl relative overflow-hidden group"
  >
    <div className="relative z-10">
      <figure className="px-2 pt-2">
        <img src={icon} alt="Category Icon" className="w-12 lg:w-20" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{category}</h2>
      </div>
    </div>

    {/* Blue Flow Animation */}
    {/* <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-purple-500 wave-animation "></div>
  </motion.div> */}
{/* </div> */} 






    </Link>
  );
};

export default CategoryCard;
