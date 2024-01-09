import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';

const CustomerSupportSection = () => {
  const [ticketCode, setTicketCode] = useState('');

  const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomCode = '';
    const codeLength = 8; // You can adjust the length of the generated code

    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomCode += characters[randomIndex];
    }

    setTicketCode(randomCode);
  };

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_oplekyh', 'template_csmfmx6', form.current, 'oHO5x-vse-XwULzcN')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };
  return (
    <>
    <h2 className="text-yellow-500 ml-12 pt-3"> S U P P O R T</h2>
        <h1 className=" text-xl lg:text-3xl font-semibold my-2 ml-12">
        Customer Support
        </h1>
    <div className="hero ">
      
  <div className="hero-content  flex-col lg:flex-row-reverse">
    
    <div className="text-center lg:text-left">
    
      <div className="card w-96 bg-base-100 shadow-xl">
  <figure className="px-10 pt-10">
   <div className="bg-green-500 p-12 radious-lg">
   {ticketCode && (
        <div>
          <p className="text-3xl font-bold text-white"> {ticketCode}</p>
        </div>
      )}
   </div>
  </figure>
  <div className="card-body items-center text-center">
    
    <p>Generate Your Unique Ticket Number </p>
    <div className="card-actions">
    <button className="btn btn-primary " onClick={generateRandomCode}>Generate Ticket</button>
    </div>
  </div>
</div>
     </div>
    
    <div className="card shrink-0  w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" ref={form} onSubmit={sendEmail}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="Email" name="form_email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="Name" name="form_name" className="input input-bordered" required />
         
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Ticket</span>
          </label>
          <input type="text" placeholder="Ticket" name="ticket" className="input input-bordered" required />
         
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Message</span>
          </label>
          <textarea className="input input-bordered" placeholder="Message" name="message" rows="40" cols="50"></textarea>
         
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
    



     {/* <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" /> 
      <input className="btn btn-primary" type="submit" value="Send" />
    </form> */}
  </div>
</div>
</>
  );
};

export default CustomerSupportSection;
