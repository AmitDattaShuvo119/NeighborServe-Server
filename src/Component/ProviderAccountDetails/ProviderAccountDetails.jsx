import React from "react"
import { useLoaderData } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"

const ProviderAccountDetails = () => {
  const details = useLoaderData()

  const {
    user_img,
    user_fullname,
    user_type,
    user_status,
    user_category,
    user_location,
    user_verficationStatus,
    user_hireCount,
    user_email,
    user_gender,
    user_serviceDetails,
  } = details

  return (
    <>
      <Navbar></Navbar>
      <div className="flex justify-center gap-36 p-12">
        <div>
          <img src={user_img} alt="" />
        </div>
        <div>
          <p className="text-3xl"> {user_fullname}</p> <br />
          <p className="text-xl mb-6">{user_category}</p>
          <div className="flex gap-8">
            <div className="bg-blue-500 p-2 rounded-sm text-white">
              Send Message
            </div>
            <div className="bg-orange-500 p-2 rounded-sm text-white">
              {" "}
              Status : {user_status}
            </div>
            <div className="bg-blue-500 p-2 rounded-sm text-white">
              {" "}
              Verification : {user_verficationStatus}
            </div>
          </div>
          <div className="mt-6">
            <p>Email : {user_email}</p>
          </div>
          <div>
            <p>Gender : {user_gender}</p>
          </div>
          <div>
            <p>Location : {user_location}</p>
          </div>
          <div>
            <p>Type : {user_type}</p>
          </div>
          <div>
            <p>Hire Count : {user_hireCount}</p>
          </div>
          <div>
            <p>{user_serviceDetails}</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default ProviderAccountDetails
