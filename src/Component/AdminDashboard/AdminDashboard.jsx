import React from 'react';
import icon from '../../assets/photo-1.jpeg'
import icon2 from '../../assets/icon.png'


const AdminDashboard = () => {
    return (
        <div>
             <h1 className='text-3xl p-2'>Today is Monday,October , 2023</h1>
              <div className='flex flex-col lg:flex-row justify-between'>
                 <div className='bg-secondary p-12 m-4 w-[450px]  rounded-lg '>
                    <p className='text-5xl font-bold mb-4 text-center'>Total User</p>
                    <p className='text-3xl text-center'>24</p>
                 </div>
              
                 <div className='bg-secondary p-12 m-4 w-[450px] rounded-lg'>
                    <p className='text-5xl font-bold mb-4 text-center'>Total Provider</p>
                    <p className='text-3xl text-center'>21</p>
                 </div>
             
                 <div className='bg-secondary p-12 m-4 w-[450px]  rounded-lg'>
                    <p className='text-5xl font-bold mb-4 text-center'>Membership</p>
                    <p className='text-3xl text-center'>4</p>
                 </div>
              </div>


              <div className='flex  justify-between gap-[400px]'>
            <div className='ml-20'>
               <h1 className='mb-7 text-3xl font-semibold mt-4'>Risky User</h1>
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
    );
};

export default AdminDashboard;