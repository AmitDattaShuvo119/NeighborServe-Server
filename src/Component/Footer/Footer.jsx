import React from "react";
import "../Navbar/Navbar.css";
const Footer = () => {
  return (
<div>
  <footer className="footer p-4 border text-base-content flex flex-col lg:flex-row justify-center space-x-0 lg:space-x-72">
    <nav className="mb-4 lg:mb-0">
      <header className="footer-title">Discovery</header>
      <a className="link c1">Become a Provider</a>
      <a className="link c1">All Services</a>
      <a className="link c1">Help</a>
    </nav>
    <nav className="mb-4 lg:mb-0">
      <header className="footer-title">Company</header>
      <a className="link c1">About us</a>
      <a className="link c1">Contact Us</a>
      <a className="link c1">Terms and Policies</a>
      <a className="link c1">Do not Sell or Share My Information</a>
    </nav>
    <nav>
      <header className="footer-title">Social</header>
      <div className="flex space-x-4">
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            {/* ... SVG path */}
          </svg>
        </a>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            {/* ... SVG path */}
          </svg>
        </a>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            {/* ... SVG path */}
          </svg>
        </a>
      </div>
    </nav>
  </footer>
</div>

  );
};

export default Footer;
