import React from 'react';

import liveSupport from '../../assets/live-chat.png'
import FAQ from '../../assets/faq.png'
import danger from '../../assets/danger.png'

const CustomerSupport = () => {
    return (
        <>
        <p className='text-center mb-12 text-2xl lg:text-4xl font-semibold'>Customer Support </p>
        <div className='flex lg:flex-row flex-col justify-center lg:gap-24 gap-12 p-5'>
            
            <div>
                <img className='lg:w-32 w-28 mx-auto' src={liveSupport} alt="" />
            </div>
            <div>
                  <img className='lg:w-32 w-28 mx-auto' src={FAQ} alt="" />
            </div>
            <div>
               <img className='lg:w-32 w-28 mx-auto' src={danger} alt="" />
            </div>
        </div>
        </>
    );
};

export default CustomerSupport;