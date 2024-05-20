import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, getDoc, query, where, doc, setDoc } from 'firebase/firestore'; // Import setDoc

import AdminNavbar from './AdminNavbar';
import withAuthentication from './withAuthentication';
function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchEnquiries = async () => {
    try {
      const enquiryCollection = collection(db, 'enquiries');
      const querySnapshot = await getDocs(enquiryCollection);

      const enquiriesData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));


      const enquiriesList = [];
      for (let enquiry of enquiriesData) {
        const productSnapshot = await getDoc(doc(db, 'products', enquiry.productID));

        // Fetch user data using a where query
        const userQuery = query(collection(db, 'users'), where('uid', '==', enquiry.userId));
        const userQuerySnapshot = await getDocs(userQuery);

        let productName = '';
        if (productSnapshot.exists()) {
          productName = productSnapshot.data().name;
        } else {
          console.warn(`Product document with ID ${enquiry.productID} does not exist`);
        }

        let userName = '';
        let userEmail = '';

        // Checking if we got any user data and if yes, taking the first one
        if (!userQuerySnapshot.empty) {
          const userData = userQuerySnapshot.docs[0].data();
          console.log('User Data:', userData);
          userName = userData.firstName;
          userEmail = userData.email;
        } else {
          console.warn(`User document with ID ${enquiry.userId} does not exist`);
        }

        enquiriesList.push({
          ...enquiry,
          productName,
          userName,
          userEmail,
        });
      }

      setEnquiries(enquiriesList);
    } catch (error) {
      console.error('Error fetching enquiries: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);


  const handleReply = async (enquiryId) => {
    try {
      await setDoc(doc(db, 'enquiries', enquiryId), { status: 1 }, { merge: true });
      alert('Already replied to user');
    } catch (error) {
      console.error('Error updating enquiry status: ', error);
    }

    // Call fetchEnquiries to update the list with the new status
    fetchEnquiries();
  };
  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <AdminNavbar />
      <div className="container mt-5">
        <h2>All Enquiries</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>Message</th>
              <th>Date Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry, index) => (
              <tr key={index}>
                <td>{enquiry.productName}</td>
                <td>{enquiry.userName}</td>
                <td>{enquiry.userEmail}</td>
                <td>{enquiry.message}</td>
                <td>{new Date(enquiry.dateTime.seconds * 1000).toLocaleString()}</td>
                <td>
                  {enquiry.status === 0 ? (
                    <button className='btn btn-warning' onClick={() => handleReply(enquiry.id)}>Replied</button>
                  ) : (
                    enquiry.status === 1 && <span>Already replied</span>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

}
export default withAuthentication(AdminEnquiriesPage);
