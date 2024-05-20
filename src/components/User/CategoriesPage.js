import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config'; // Import Firestore from your config file
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer'; 
function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryCollection = collection(db, 'categories');
      const categorySnapshot = await getDocs(categoryCollection);
      const categoryList = categorySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCategories(categoryList);
    };

    fetchCategories();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-5">

        <h2>Categories</h2>
        <div className="row">
          {categories.map(category => (
            <div className="col-md-3" key={category.id}>
              <div className="card">
                <img src={category.image || 'path/to/default/image.jpg'} className="card-img-top" alt={category.name} />
                <div className="card-body">
                  <h5 className="card-title">{category.name}</h5>
                  <p className="card-text">{category.description}</p>
                  <Link to={`/category/${category.id}/products`} className="btn btn-secondary mt-2">Show Products</Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Footer/>
      </div>
    </>

  );
}

export default CategoriesPage;
