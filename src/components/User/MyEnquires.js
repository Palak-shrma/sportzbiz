import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase/config';
import { collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import Navbar from './Navbar';
import Footer from './Footer';

function MyEnquiries() {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = auth.currentUser;

    useEffect(() => {
        const fetchEnquiries = async () => {
            try {
                if (user) {
                    const q = query(collection(db, 'enquiries'), where('userId', '==', user.uid));
                    const querySnapshot = await getDocs(q);

                    const enquiriesData = [];
                    for (const enquiryDoc of querySnapshot.docs) {
                        const data = enquiryDoc.data();
                        const productDoc = doc(db, 'products', data.productID);
                        const productSnapshot = await getDoc(productDoc);
                        if (productSnapshot.exists()) {
                            enquiriesData.push({
                                id: enquiryDoc.id,
                                ...data,
                                productName: productSnapshot.data().name,
                            });
                        } else {
                            enquiriesData.push({
                                id: enquiryDoc.id,
                                ...data,
                                productName: 'Product not found',
                            });
                        }
                    }

                    setEnquiries(enquiriesData);
                } else {
                    console.log('No user is signed in');
                }
            } catch (error) {
                console.error('Error fetching enquiries: ', error);
            } finally {
                setLoading(false);
            }
        };


        fetchEnquiries();
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <h2>My Enquiries</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Enquiry Date</th>
                            <th>Product Name</th>
                            <th>Message</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enquiries.map(enquiry => (
                            <tr key={enquiry.id}>
                                <td>{new Date(enquiry.dateTime?.seconds * 1000).toLocaleDateString()}</td>
                                <td>{enquiry.productName}</td>
                                <td>{enquiry.message}</td>
                                <td>
                                    {enquiry.status === 0 ? 'Pending' : 'Admin replied to your email, kindly check'}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}

export default MyEnquiries;
