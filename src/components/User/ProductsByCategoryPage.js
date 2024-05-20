import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import Footer from './Footer';
function ProductsByCategoryPage() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const productCollection = collection(db, 'products');
        const q = query(productCollection, where('category', '==', id));
        const productSnapshot = await getDocs(q);
        const productList = productSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productList);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };

    fetchProductsByCategory();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2>Products</h2>
        <div className="row">
          {products.map(product => (
            <div className="col-md-3" key={product.id}>
              <div className="card">
                <img src={product.image || 'path/to/default/image.jpg'} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <Link to={`/product/${product.id}`} className="btn btn-primary">Show Details</Link>
                  {/* other details */}
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

export default ProductsByCategoryPage;
