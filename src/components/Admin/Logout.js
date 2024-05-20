import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config'; // adjust the path as per your file structure

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/admin/admin-login'); // Redirect to admin login page after logout
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Are you sure you want to logout?</h2>
      <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
