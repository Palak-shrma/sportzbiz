import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useParams,Link } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { auth } from '../../firebase/config';
import Footer from './Footer'; 
function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [enquiry, setEnquiry] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const user = auth.currentUser;

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const productDoc = doc(db, 'products', id);
        const productSnapshot = await getDoc(productDoc);
        if (productSnapshot.exists()) {
          const productData = productSnapshot.data();

          // Assuming the product data has a categoryId field
          if (productData.category) {
            const categoryDoc = doc(db, 'categories', productData.category);
            const categorySnapshot = await getDoc(categoryDoc);

            if (categorySnapshot.exists()) {
              // Combine product data and category data
              setProduct({
                ...productData,
                categoryName: categorySnapshot.data().name
              });
            } else {
              console.log('No such category!');
              setProduct(productData);
            }
          } else {
            setProduct(productData);
          }
        } else {
          console.log('No such product!');
        }
      } catch (error) {
        console.error('Error fetching product: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);
  const handleEnquirySubmit = async () => {
    if (enquiry.trim() === "") {
      setMessage("Enquiry cannot be empty");
      return;
    }
    if (/[~`!@#$%^&*()\-_+={}[\]|\\:;"'<>,.?/]/.test(enquiry)) {
      setMessage("Enquiry cannot contain special characters");
      return;
    }
    try {
      // ... (no changes here)
      //const user = auth.currentUser;
      const userId = user.uid;
      const dateTime = new Date();

      const newEnquiry = {
        message: enquiry,
        productID: id,
        userId: userId,
        dateTime: dateTime,
        status: 0,
      };

      await addDoc(collection(db, 'enquiries'), newEnquiry);

      setEnquiry(""); // clear the textarea
      setMessage("Enquiry sent successfully");

    } catch (e) {
      console.error('Error submitting enquiry: ', e);
      setMessage("Error submitting enquiry");
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      {product ? (
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <h2>{product.name}</h2>
              {product.categoryName && <p>Category: {product.categoryName}</p>}
              <img src={product.image} alt={product.name} className="img-fluid" />
              <p className='btn btn-warning'>{product.description}</p>
              <p class='btn btn-info'>Rs.{product.price}/-</p>
            </div>
            <div className="col-md-6">
              <h2>Enquire About This Product</h2>
              {user ? (
                <>
                  <textarea
                    className="form-control mb-3"
                    value={enquiry}
                    onChange={(e) => setEnquiry(e.target.value)}
                    placeholder="Write your enquiry here..."
                  />
                  <button className="btn btn-primary" onClick={handleEnquirySubmit}>Submit Enquiry</button>
                </>
              ) : (
                <div>
                  <p>Login to Submit Your Enquiry</p>
                  <Link to="/loginuser">Login</Link>
                </div>
              )}
              {message && <div className="mt-3">{message}</div>}
            </div>
          </div>
        </div>
      ) : (
        <div className="container mt-5">
          <div className="alert alert-danger">
            No Product Found
          </div>
        </div>
      )}

<div className="container mt-5">
  <h2>Other Related Products</h2>
  <div className="row">
    {relatedProducts.slice(0, 4).map((relatedProduct, index) => (
      <div key={index} className="col-md-3">
        <h3>{relatedProduct.name}</h3>
        <img src={relatedProduct.image} alt={relatedProduct.name} className="img-fluid" />
        <p>{relatedProduct.description}</p>
        <p>Rs.{relatedProduct.price}/-</p>
      </div>
    ))}
  </div>
</div>

      <Footer/>
    </div>
  );
}

export default ProductDetailPage;
