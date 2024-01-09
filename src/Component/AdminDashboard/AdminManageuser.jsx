import React, { useEffect, useState } from "react"
import useAuth from "../../hook/useAuth";
import { Link } from "react-router-dom";

const AdminManageuser = () => {

const {user} = useAuth();
    const [alluser, setAllUser] = useState([]);
    const url ="http://localhost:5000/users/alluser"

    useEffect(() => {

        fetch(url)
            .then(res => res.json())
            .then(data => setAllUser(data))
    }, [])
  return (
    <div>
            <p className="text-3xl font-bold ml-5 mb-5">All User List</p>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead >
                        <tr>
                            <th>
                             #
                            </th>
                            <th> User Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Location</th>
                             <th>User Type</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>

                    {
                            alluser.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                               
                                <td>{user.user_fullname}</td>
                                <td>{user.user_email}</td>
                                <td>{user.user_phone}</td>
                                <td>{user.user_location}</td>     
                                <td>{user.user_type}</td>     
                                
                                
                               <td><Link to={`/userdetails/${user._id}`}>  <button className="btn bg-orange-500 border-none ml-3">Details</button></Link> </td> 
                                
                            </tr>)
                        }
                       

                    </tbody>

                </table>
            </div>
        </div>
  )
}

export default AdminManageuser
