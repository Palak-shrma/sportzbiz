import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import '../../styles/Footer.css'; 

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* Column 1 - Website Name */}
          <div className="col-md-3">
            <p>SportzBiz.com</p>
          </div>

          {/* Column 2 - Contact Details */}
          <div className="col-md-3">
            <p>Contact Number: +91238947293423</p>
            <p>Email: info@sportsbusiness.com</p>
          </div>

          {/* Column 3 - Address */}
          <div className="col-md-3">
            <p>Address: 123 Gandhi Street, Batala City, Gurdaspur - 12345, India</p>
          </div>

          {/* Column 4 - Social Media Icons */}
          <div className="col-md-3">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="footer-text text-center">
              © 2023 SportzBiz
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
