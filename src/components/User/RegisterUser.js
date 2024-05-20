import React, { useState } from 'react';
import { db, auth } from '../../firebase/config'; // Import your Firestore and Auth from your config file
import { collection, addDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import Footer from './Footer';
import Navbar from './Navbar';
function RegisterUser() {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      contactNumber: '',
      password: '',
      confirmPassword: '',
    });
  
    const [message, setMessage] = useState('');
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (formData.password !== formData.confirmPassword) {
        setMessage('Passwords do not match');
        return;
      }
  
      
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then(async (userCredential) => {
          // Signed in 
          const user = userCredential.user;
  
          // Store additional user information in Firestore
          try {
            await addDoc(collection(db, 'users'), {
              uid: user.uid,
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              contactNumber: formData.contactNumber,
            });
  
            setMessage('User registered! You can now login.');
            // Clearing the form data
            setFormData({
              firstName: '',
              lastName: '',
              email: '',
              contactNumber: '',
              password: '',
              confirmPassword: '',
            });
          } catch (error) {
            console.error("Error adding user info to Firestore:", error);
            setMessage('Error registering user.');
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(`Error (${errorCode}): ${errorMessage}`);
          setMessage('Error registering user.');
        });
    };
  
  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <h2>Register User</h2>
      <form onSubmit={handleSubmit}>

      {message && (
          <div className="alert alert-success" role="alert">
            <div className="mt-3">
              <p>{message}</p>
              {message === 'User registered! You can now login.' && (
                <Link to="/loginuser">Login here</Link>
              )}
            </div>
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="contactNumber" className="form-label">Contact Number</label>
          <input type="text" className="form-control" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    
    <Footer/>
    </div>
    </>
    
  );
}

export default RegisterUser;
