import React, { useEffect, useState } from "react";
import CategoryCard from "../CategoryCard/CategoryCard";



const Category = () => {
  const [category, SetCategory] = useState([]);

  useEffect(() => {
    fetch("./category.json")
      .then((res) => res.json())
      .then((data) => SetCategory(data));
  }, []);

  return (
    <>
      {/* <h1 className=" text-xl lg:text-4xl font-semibold my-2 text-center">
        Featured Categories
      </h1> */}
      <div className="bg-base-100 pb-7">
        <h2 className="text-yellow-600 ml-12 pt-3">C A T E G O R I E S</h2>
      <h1 className=" text-xl lg:text-3xl font-semibold my-2 ml-12">
        Popular Categories
      </h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 p-1 lg:p-3 mb-1 ml-5 lg:ml-12 cursor-pointer">
          {category.map((item) => (
            <CategoryCard key={item.id} item={item}></CategoryCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;
