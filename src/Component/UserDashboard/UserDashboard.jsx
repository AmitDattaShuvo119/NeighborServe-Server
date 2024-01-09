import React, { useContext, useEffect, useState } from 'react'
import icon from '../../assets/photo-1.jpeg'
import icon2 from '../../assets/icon.png'
import { AuthContext } from '../../Providers/AuthProviders'



const UserDashboard = () => {
  const [Favorite, setFavorite] = useState([]);
  const { user, logout } = useContext(AuthContext)

  useEffect(() => {
    fetch("http://localhost:5000/users/favProvide")
      .then((response) => response.json())
      .then((data) => {
        setFavorite(data);
      })
  }, []);
    
      console.log(Favorite, " favorite kdfjdkfjdkfj")
  return (
    <div className='p-4 lg:p-7 mt-24 lg:mt-4'>
          <div className='bg-secondary mx-auto w-[380px] h-[100px] lg:w-[1650px] lg:h-[150px] flex lg:flex-row flex-col-reverse  lg:p-5 justify-between '>
              <div >
                <p className=' text-3xl lg:text-6xl font-semibold  p-4'>Hello, {user?.displayName}</p>
                <p className='p-2 text-2xl'>Today is Monday,9 October ,2023</p>
              </div>
              <div className='mb-5 lg:mr-12'>
                <img className=' w-72 lg:w-96' src={icon2}alt="" />
              </div>
          </div>

          <div className='flex flex-col lg:flex-row justify-between lg:gap-[400px]'>
            <div>
               <h1 className='mb-7 mx-auto text-3xl font-semibold mt-4'>Favourite Provider</h1>


                <div className='border border-primary rounded flex flex-col lg:flex-row p-4 items-center ml-10 mb-5 lg:w-[500px] w-[300px]'>
                  <div className='flex'>
                     <div>

                  <img className='w-24 h-24' src={icon} alt="" />
                     </div>
                     <div className='ml-5'>
                    <h1 className='text-xl'>Mehedi Hasan</h1> 
                     <p>Electrician</p>
                     <p>Uttor badda ,Dhaka</p>
                     </div>

                  </div>
                  <div>
                    <button className='bg-primary text-white p-2 rounded-lg w-24 ml-24'> view</button>
                  </div>
                </div>
               
               
            </div>
            <div>
               <div>
                ffff
               </div>
            </div>
          </div>
    </div>
  )
}

export default UserDashboard