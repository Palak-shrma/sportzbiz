import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../components/User/HomePage';
import Dashboard from '../components/Admin/Dashboard';
import AddProduct from '../components/Admin/AddProduct'; // Import the AddProduct component
//import Login from '../components/Auth/Login';
// ... import other components

const Routes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/add-product" element={<AddProduct />} /> {/* Add route for AddProduct */}
      {/* <Route path="/login" component={<Login />} /> */}
      {/* ... define other routes */}
    </Routes>
  </Router>
);

export default Routes;
