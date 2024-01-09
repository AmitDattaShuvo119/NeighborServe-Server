import React from "react"
import { Link } from "react-router-dom"

const ProviderDetails = ({ item }) => {
  const {
    _id,
    user_img,
    user_fullname,
    user_status,
    user_serviceDetails,
    user_hireCount,
    user_respondTime,
  } = item
  return (
    <div className="card w-80 mb-7 bg-base-100 shadow-xl">
      <figure>
        <img className="w-72" src={user_img} />
      </figure>
      <div className="card-body ">
        <h2 className="text-2xl ml-2 card-title">
          {user_fullname}
          <div className="badge badge-secondary">{user_status}</div>
        </h2>
        <p>{user_serviceDetails}</p>
        <p>Hire Count : {user_hireCount}</p>
        <p> Average Response Count : {user_respondTime} hours</p>
        <div className="card-actions justify-center">
          <div className="badge badge-outline p-4  hover:bg-blue-500 hover:text-white">Message</div>
          <Link to={`/users/provider/details/${_id}`}>
            {" "}
            <button className="badge badge-outline p-4 hover:bg-blue-500 hover:text-white">
              Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProviderDetails
