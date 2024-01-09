import React from "react"
import { useLoaderData } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import ProviderDetails from "../ProviderDetails/ProviderDetails"
import Footer from "../Footer/Footer"

const TypeProvider = () => {
  const detailsData = useLoaderData()

  return (
    <div>
      <Navbar></Navbar>

      <div className="grid grid-cols-4  ">
        <div className="col-span-1 p-5 ">
          <div className="w-72" >
            <div className=" w-72 p-6  ml-12 mb-7  rounded-lg shadow-xl  ">
              <p className="text-xl font-semibold  mb-2">Average Response</p>
              
              <div className="form-control w-48 ml-5 mb-12 ">
                <label className="label cursor-pointer"> 
                  <input
                    type="checkbox"                 
                    className="checkbox  checkbox-primary "
                  />
                  <span className="mr-24">Low</span>
                </label>
                <label className="label cursor-pointer"> 
                  <input
                    type="checkbox"                 
                    className="checkbox  checkbox-primary "
                  />
                  <span className="mr-24">High</span>
                </label>
              
              </div>
            </div>
            <div className=" w-72 p-6 ml-12 mb-7 rounded-lg shadow-xl">
              <p className="text-xl font-semibold mb-2">Average Response</p>
              <div className="form-control w-48 ml-5 mb-12">
                <label className="label cursor-pointer"> 
                  <input
                    type="checkbox"                 
                    className="checkbox checkbox-primary"
                  />
                  <span className="mr-24">Low</span>
                </label>
                <label className="label cursor-pointer"> 
                  <input
                    type="checkbox"                 
                    className="checkbox  checkbox-primary "
                  />
                  <span className="mr-24">Low</span>
                </label>
                <label className="label cursor-pointer"> 
                  <input
                    type="checkbox"                 
                    className="checkbox  checkbox-primary"
                  />
                  <span className="mr-24">Low</span>
                </label>
                <label className="label cursor-pointer"> 
                  <input
                    type="checkbox"                 
                    className="checkbox  checkbox-primary "
                  />
                  <span className="mr-24">High</span>
                </label>
              
              </div>
              
            </div>
            <div className=" w-72 p-6 ml-12 mb-7 rounded-lg shadow-xl">
              <p className="text-xl font-semibold mb-2">Status</p>
              
              <div className="form-control w-48 ml-5 mb-12 ">
                <label className="label cursor-pointer"> 
                  <input
                    type="checkbox"                 
                    className="checkbox  checkbox-primary"
                  />
                  <span className="mr-16">Premium</span>
                </label>
                <label className="label cursor-pointer"> 
                  <input
                    type="checkbox"                 
                    className="checkbox  checkbox-primary"
                  />
                  <span className="mr-20">Regular</span>
                </label>
                
              
              </div>
            </div>
            
          </div>
        </div>
        <div className="col-span-3 grid grid-cols-1 lg:grid-cols-4 gap-2 p-1 lg:p-4 mb-1  ">
          {detailsData.map(item => (
            <ProviderDetails key={item._id} item={item}></ProviderDetails>
          ))}
        </div>
      </div>
      {/* <ProviderDetails key={detailsData._id} detailsData={detailsData}></ProviderDetails> */}
      <Footer></Footer>
    </div>
  )
}

export default TypeProvider
