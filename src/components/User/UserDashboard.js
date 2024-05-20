import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase/config'; 
import { collection, query, where, getDocs } from 'firebase/firestore';
import Footer from './Footer';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 


  const handleLogout = () => {
    navigate('/userlogout');
  };
  const handleEnquires = () => {
    navigate('/myenquires');
  };
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const q = query(collection(db, 'users'), where('uid', '==', user.uid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            setUserDetails(querySnapshot.docs[0].data());
          } else {
            console.error('No such document!');
            setError('No user details found in the database.');
          }
        } else {
          console.log('No user is signed in');
          setError('No user is signed in.');
          navigate('/loginuser');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Error fetching user details.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <><Navbar/>
    <div className="container mt-5">
      <h2>User Dashboard</h2>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {userDetails ? (
        <div>
          <p><strong>First Name:</strong> {userDetails.firstName}</p>
          <p><strong>Last Name:</strong> {userDetails.lastName}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Contact Number:</strong> {userDetails.contactNumber}</p>
          <button className='btn btn-success' onClick={handleEnquires}>My Enquires</button> {/* Add this button */}
          <hr/>
        </div>
      ) : (
        <div>No user details available</div>
      )}

      <button className='btn btn-danger' onClick={handleLogout}>Logout</button> {/* Add this button */}

      <Footer/>
    </div>
    </>
  );
}

export default UserDashboard;
