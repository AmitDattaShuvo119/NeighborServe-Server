import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FcGoogle } from "react-icons/fc";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { AuthContext } from "../../Providers/AuthProviders";
import { useForm } from "react-hook-form";

function Login() {

  // const colors = [
  //   "#efbbff",
  //   "#d896ff",
  //   "#be29ec",
  //   "#7732A6",
  //   "#4C40ED",
  //   "#2E22AB",
  //   "black",
  // ]

  // const [colorIndex, setColorIndex] = useState(0)

  const { googleSignIn } = useContext(AuthContext);
  const { userlogin } = useContext(AuthContext);
  const [err, setErr] = useState("");

  const location = useLocation();

  const from = location.state?.form?.pathname || "/";
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 700);

    return () => clearInterval(interval);
  }, []);

  const handleLogIn = async (data) => {
    data.preventDefault();

    const form = data.target;

    const email = form.email.value;

    const password = form.password.value;

    userlogin(email, password)
      .then((result) => {
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setErr(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const loggedInUser = result.user;
      console.log(loggedInUser);
      const saveUser = {
        name: loggedInUser.displayName,
        email: loggedInUser.email,
        image: loggedInUser.photoURL,
        role: "user",
      };
      fetch("http://localhost:5000/users/googlelogin", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(saveUser),
      })
        .then((res) => res.json())
        .then(() => {
          navigate(from, { replace: true });
        });
    });
  };

  return (
    <>
      <div>
        <Navbar />
        
        <div className="p-12">
          <form onSubmit={handleLogIn}>
            <div className="l-container0 ">
              <div className="l-container1 mt-12  " >
                <div>
                  <p
                    style={{
                      display: "flex",
                      color: "white",
                      justifyContent: "center",
                      marginTop: "150px",
                      fontSize: "22px",
                      fontWeight: "bold",
                      marginBottom: "20px",
                    }}
                  >
                    Welcome to NeighborServe !
                  </p>

                  <p
                    style={{
                      display: "flex",
                      color: "white",
                      justifyContent: "center",
                      fontSize: "16px",
                      marginBottom: "20px",
                    }}
                  >
                    New here? Sign up to get started.
                  </p>

                  <button
                    style={{
                      display: "flex",
                      marginLeft: "auto",
                      marginRight: "auto",
                      justifyContent: "center",
                      color: "#570DF8",
                    }}
                    className="btn w-36"
                  >
                    <Link to={"/reg"}>Sign up</Link>
                  </button>
                </div>
              </div>

              <div className="l-container2 p-2">
                <div>
                  <p
                    style={{
                      display: "flex",
                      color: "black",
                      justifyContent: "center",
                      marginTop: "30px",
                      fontSize: "30px",
                      fontWeight: "bold",

                      // color: colors[colorIndex],
                      // transition: "color 0.5s",
                    }} className=" mb-4"
                  >
                    Login Your Account
                  </p>
                  
                  <div className="p-2  rounded-lg border w-48 mx-auto ">
                      <button onClick={handleGoogleSignIn}  type='submit' className="flex mx-auto text-primary font-semibold "> <FcGoogle className="mt-1 mr-1 "/>Google</button>
                      </div>
                  <div className="mx-auto text-center m-5 text-gray-400"> ---- or continue with email ----</div>
                  <div className="input-container">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      className="input-field"
                    />

                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="input-field"
                    />
                  </div>

                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "14px",
                      marginTop: "10px",
                      marginLeft: "150px",
                    }}
                  >
                    {/* <button className="l-r">Recover Password?</button> */}
                  </p>
                   <p className="text-red-500 text-center">{err && "Invalide Email or Password"}</p>
                  <button
                    style={{
                      color: "white",
                      display: "flex",
                      marginLeft: "auto",
                      marginRight: "auto",
                      justifyContent: "center",
                      width: "50%",
                      marginTop: "20px",
                    }}
                    className="btn btn-primary"
                  >
                    Sign in
                  </button>

                  <div className="social-login text-center ">
                    {/* <div className="divider w-72 ml-36"></div> */}

                    <div className="social-icons">
                      {/* <FontAwesomeIcon
                        icon={faFacebook}
                        style={{ color: "#046ad7" }}
                      />
                      <FontAwesomeIcon
                        icon={faTwitter}
                        style={{ color: "#4386f9" }}
                      /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <Footer></Footer>
    </>
  );
}

export default Login;
