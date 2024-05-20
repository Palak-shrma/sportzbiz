import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config'; // adjust the path as per your file structure
import AdminNavbar from './AdminNavbar';
import withAuthentication from './withAuthentication';
function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/admin/admin-login');
      }
    });
  }, [navigate]);

  return (
    <div className="container">
      <h1 className="my-4">Admin Dashboard</h1>
      <p className="mb-4">Welcome to the admin dashboard, manage your website content here.</p>
      <AdminNavbar />


    </div>
  );
}
export default withAuthentication(Dashboard);
