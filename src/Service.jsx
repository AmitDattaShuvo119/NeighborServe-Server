import React from "react";
import "./service.css";

function Service(){
    return(
    <div className="service-div">
        <div className="main1">
            <div className="main2">

            <div>
                            <p
                            style={{
                                display: "flex",
                                color: "black",
                                justifyContent: "center",
                                marginTop: "30px",
                                fontSize: "25px",
                                fontWeight: "bold",
                            }}
                            >
                                SERVICE PROVIDER REGISTRATION
                            </p>

                            <div className="service-reg-container">

                                <div className="reg-form">
            
                                        <div className="service-reg-label">Full Name*</div>
                                        <input type="text" placeholder="Enter your first name" className="service-reg-field" />

                                        
                                        <div className="service-reg-label">Email*</div>
                                        <input type="text" placeholder="Enter your last name" className="service-reg-field" />

                                        
                                        <div className="service-reg-label">City*</div>
                                        <input type="text" placeholder="Enter your phone number" className="service-reg-field" />

                                                 
                                        <div className="service-reg-label">Create Password*</div>
                                        <input type="password" placeholder="Create a password" className="service-reg-field" />
                                </div>
                        
            


                                <div className="additional-service-reg-container">
                            
                                    <div className="service-reg-label">Position you are applying for*</div>
                                    <select className="service-reg-field">
                                    <option value="">Choose option</option>
                                    <option value="electrician">Electrician</option>
                                    <option value="plumber">Plumber</option>
                                    <option value="handyman">Handyman</option>
                                    </select>
                                                                        
                                
                                    <div className="service-reg-label">Phone Number*</div>
                                    <input type="text" placeholder="Enter your phone number" className="service-reg-field" />

                                    
                                    <div className="service-reg-label">Area*</div>
                                    <input type="text" placeholder="Enter your email address" className="service-reg-field" />

                                    
                                    <div className="service-reg-label">Confirm Password*</div>
                                    <input type="password" placeholder="Create a password" className="service-reg-field" />
                                </div>
                            </div>    






                                <button
                                className="service-reg-btn"
                                style={{
                                    display: "flex",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    justifyContent: "center",
                                    marginTop: "20px",
                                    width:"30%",
                                    padding:"10px",
                                    border:"1px",
                                    borderRadius:"10px",
                                    backgroundColor:"#4C40ED",
                                    color:"white",
                                  }}
                                >
                                Sign Up
                                </button>
                  </div>



 
            </div>

                <div className="main3">
                         

                <div>
                        <p style={{
                            display:"flex",
                            color:"white",
                            justifyContent:"center",
                            marginTop:"170px",
                            fontSize:"20px",
                            fontWeight:"bold",
                        }}>
                            Already have an account?
                        </p>
                        
                        <button className="service-signin-btn"
                        style={{
                            display: "flex",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    justifyContent: "center",
                                    marginTop: "20px",
                                    width:"30%",
                                    padding:"10px",
                                    border:"1px",
                                    borderRadius:"10px",
                                    backgroundColor:"#4C40ED",
                                    color:"white",
                          }}>
                            Sign In
                        </button>

                </div>
























            </div>
         </div>
    </div>


    );
}

export default Service;