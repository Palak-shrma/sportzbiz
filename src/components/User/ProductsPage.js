import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; // Adjust the path according to your folder structure
import { collection, getDocs } from 'firebase/firestore'; // Import necessary functions from Firestore
import { db } from '../../firebase/config'; // Import Firestore from your config file
import { Link } from 'react-router-dom'; // Import Link to create a link to the product details page
import Footer from './Footer';

function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        const productsList = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2>Products</h2>
        <div className="row">
          {products.map(product => (
            <div className="col-md-3" key={product.id}>
              <div className="card">
                <img src={product.image} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <Link to={`/product/${product.id}`} className="btn btn-primary">Show Details</Link>



                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default ProductsPage;
