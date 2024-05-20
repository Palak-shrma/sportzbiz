import React from 'react';
import "../../styles/AboutUsPage.css";
import Store from "../../assets/images/Store.jpg";
import Footer from './Footer'; 
import Navbar from './Navbar';
function AboutUsPage() {
  return (
    <><Navbar/>
    <div className="about-us-page container mt-5">
      
      <div className="row">
        <div className="col-md-6">
          <img src={Store} alt="Sports Factory" className="img-fluid"/>
        </div>
        <div className="col-md-6">
          <h1>About Us</h1>
          <p>
            Welcome to the Sports Factory, where passion meets excellence. 
            Since our establishment in [Year], we have been dedicated to 
            producing high-quality sports equipment that empowers athletes 
            at every level. Our state-of-the-art factory utilizes the latest 
            technology and the finest materials to create products that 
            enhance performance and safety.
          </p>
          <p>
            With a rich history rooted in innovation and customer satisfaction, 
            the Sports Factory has grown to become a leader in the industry. 
            Our commitment to quality and innovation is reflected in the 
            thousands of positive reviews and testimonials we have received 
            from our satisfied customers.
          </p>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12">
          <h2>Contact Us</h2>
          <p>Email: info@sportsfactory.com</p>
          <p>Phone: 123-456-7890</p>
          <p>Address: 123 Sports Factory Lane, Sports City, Country</p>
        </div>
      </div>
      <Footer/>
    </div>
    </>
  );
}

export default AboutUsPage;
