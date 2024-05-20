import React, { useEffect } from 'react';
import { auth } from '../../firebase/config'; // Adjust the path as per your file structure
import { useNavigate } from 'react-router-dom';

function UserLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await auth.signOut();
        navigate('/loginuser'); // Adjust the route to your login page
      } catch (error) {
        console.error('Error during logout:', error);
        // Optionally set an error state here to display an error message
      }
    };

    logout();
  }, [navigate]);

  return (
    <div className="logout-page">
      <p>Logging out...</p>
      // Optionally add a loader here to indicate the logout process
    </div>
  );
}

export default UserLogout;
