import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase/config'; 
import { collection, getDocs } from 'firebase/firestore';
import Navbar from './Navbar';
import banner1 from '../../assets/images/banner1.PNG';
import banner2 from '../../assets/images/banner2.PNG';
import banner3 from '../../assets/images/banner3.PNG';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Footer from './Footer'; 

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchCategories = async () => {
      const categoryCollection = collection(db, 'categories');
      const categorySnapshot = await getDocs(categoryCollection);
      const categoryList = categorySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).slice(0, 4); // Get the first 4 categories
      setCategories(categoryList);
    };

    const fetchProducts = async () => {
      const productCollection = collection(db, 'products');
      const productSnapshot = await getDocs(productCollection);
      const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).slice(0, 4); // Get the first 4 products
      setProducts(productList);
    };

    fetchCategories();
    fetchProducts();
  }, []);
  return (
    <div>
      {/* Navigation Bar */}
      <Navbar />
      {/* Carousel */}
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={banner1} className="d-block w-100" alt="banner1" />
          </div>
          <div className="carousel-item">
            <img src={banner2} className="d-block w-100" alt="banner2" />
          </div>
          <div className="carousel-item">
            <img src={banner3} className="d-block w-100" alt="banner3" />
          </div>
          {/* Add more carousel items as needed */}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>


      <div className="container mt-5">
        <h2>Top 4 Categories</h2>
        <div className="row">
          {categories.map(category => (
            <div className="col-md-3" key={category.id}>
              <div className="card">
                <img src={category.image} className="card-img-top" alt={category.name} />
                <div className="card-body">
                  <h5 className="card-title">{category.name}</h5>
                  <p className="card-text">{category.description}</p>
                  <Link to={`/category/${category.id}/products`} className="btn btn-primary">Browse</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div className="container mt-5">
        <h2>Top 4 Products</h2>
        <div className="row">
          {products.map(product => (
            <div className="col-md-3" key={product.id}>
              <div className="card">
                <img src={product.image} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <Link to={`/product/${product.id}`} className="btn btn-primary">View Product</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <Footer/>

    </div>
  );
}

export default HomePage;
