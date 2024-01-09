import React from 'react'
import calender from '../../assets/october-2023-calendar-large-numerals.png'

const ProviderDashboard = () => {
  return (

    <div>
    <div className='flex lg:flex-row flex-col justify-between'>

      <div>
         <div className='bg-secondary p-3 lg:p-5 w-[400px] lg:w-[700px] lg:h-[200px] m-6'>
          <p className='lg:m-6 text-3xl lg:text-5xl'>Hey,Rahman</p>
          <p className='lg:text-2xl'>Today is Monday,10 October,2023</p>
         </div>
         <div className='bg-secondary lg:p-5 w-[400px] lg:w-[700px] lg:h-[200px] m-6'>
          <p className='text-3xl lg:text-5xl p-4 mt-7'>
          Total Task : 12
          </p>
         </div>
         
      </div>

      <div className=' mx-auto lg:mr-24'>
        <img className='lg:w-[600px] w-[400px] lg:h-[450px]' src={calender} alt="" />
      </div>

    </div>

     <div>
      <h1 className='text-4xl font-bold ml-5'>Your Task</h1>
       <div className='m-6 border mx-12 border-primary flex lg:flex-row flex-col text-center justify-between p-4 rounded-lg '>
        <div className='ml-5'>
          ekta fan nosto hoiche oitar kaj korte hobe
        </div>
        <div>
          rampura
        </div>
        <div>
          01423252355
        </div>
        <div className='mr-5'>
          <button className='bg-primary p-1 text-white rounded-lg w-24'>Details</button>
        </div>
       </div>
       <div className='m-6 border mx-12 border-primary flex lg:flex-row flex-col text-center justify-between p-4 rounded-lg '>
        <div className='ml-5'>
          ekta fan nosto hoiche oitar kaj korte hobe
        </div>
        <div>
          rampura
        </div>
        <div>
          01423252355
        </div>
        <div className='mr-5'>
          <button className='bg-primary p-1 text-white rounded-lg w-24'>Details</button>
        </div>
       </div>
       <div className='m-6 border mx-12 border-primary flex lg:flex-row flex-col text-center justify-between p-4 rounded-lg '>
        <div className='ml-5'>
          ekta fan nosto hoiche oitar kaj korte hobe
        </div>
        <div>
          rampura
        </div>
        <div>
          01423252355
        </div>
        <div className='mr-5'>
          <button className='bg-primary p-1 text-white rounded-lg w-24'>Details</button>
        </div>
       </div>
       <div className='m-6 border mx-12 border-primary flex lg:flex-row flex-col text-center justify-between p-4 rounded-lg '>
        <div className='ml-5'>
          ekta fan nosto hoiche oitar kaj korte hobe
        </div>
        <div>
          rampura
        </div>
        <div>
          01423252355
        </div>
        <div className='mr-5'>
          <button className='bg-primary p-1 text-white rounded-lg w-24'>Details</button>
        </div>
       </div>
     </div>

    </div>
  )
}

export default ProviderDashboard