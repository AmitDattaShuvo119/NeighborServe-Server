// src/StatisticsSection.js
import React from "react";
import Chart from "react-apexcharts";

const ChartSection = () => {
  const statistics = [
    { label: "Total Providers", value: 50 },
    { label: "Total Users", value: 1000 },
    { label: "Total Categories", value: 20 },
  ];

  // Chart options
  const chartOptions = {
    labels: ["Providers", "Users", "Categories"],
    colors: ["#4CAF50", "#2196F3", "#FFC107"],
    legend: {
      show: true,
      position: "bottom",
    },
  };

  // Chart series data
  const chartSeries = statistics.map((stat) => stat.value);

  return (
    // <div className=" py-16">
    //   <div className="container mx-auto text-center text-white">
    //     <h2 className="text-5xl font-bold mb-8">Key Statistics</h2>
    //     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    //       {statistics.map((stat, index) => (
    //         <div
    //           key={index}
    //           className="p-8 bg-white rounded-md shadow-md text-center"
    //         >
    //           <div className="text-4xl font-bold mb-4">{stat.value}</div>
    //           <div className="text-gray-800">{stat.label}</div>
    //         </div>
    //       ))}
    //     </div>

    //     {/* Donut Chart */}
    //     <div className="mt-12">
    //       <h3 className="text-3xl font-bold mb-4">Distribution</h3>
    //       <Chart
    //         options={chartOptions}
    //         series={chartSeries}
    //         type="donut"
    //         height={350}
    //       />
    //     </div>
    //   </div>
    // </div>
    <>
    <h2 className="text-yellow-500 ml-12 pt-3">  S T A T I S T I C S</h2>
        <h1 className=" text-xl lg:text-3xl font-semibold my-2 ml-12">
           Statistics  
        </h1>
    <div className="stats ml-[500px] mb-12 p-24 shadow">
  
  <div className="stat">
     
    <div className="stat-figure text-primary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
    </div>
    <div className="stat-title">Total User</div>
    <div className="stat-value text-primary">560</div>
    <div className="stat-desc">21% more than last month</div>
  </div>
  
  <div className="stat">
    <div className="stat-figure text-red-400">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
    </div>
    <div className="stat-title">Total Provider</div>
    <div className="stat-value text-red-400">206</div>
    <div className="stat-desc">11% more than last month</div>
  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
      
    </div><div className="stat-title">Tasks done</div>
    <div className="stat-value">123</div>
    
    <div className="stat-desc text-red-400">31 tasks remaining</div>
  </div>
  
</div>
</>
  );
};

export default ChartSection;


