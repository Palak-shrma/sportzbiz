import React, { useState } from 'react';
import {  signInWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/config'; 
import { useNavigate } from 'react-router-dom';
import Footer from './Footer'; 
import Navbar from './Navbar';
function LoginUser() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate('/userdashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setMessage(`Error: ${errorMessage}`);
      });
  };

  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      {message && (
        <div className="mt-3">
          <p>{message}</p>
        </div>
      )}
      <div className="mt-3">
        <Link to="/register">Don't have an account? Register here</Link>
      </div>
      <Footer/>
    </div>
    </>
  );
}

export default LoginUser;
