import React, { useState, useEffect } from 'react';
import withAuthentication from './withAuthentication';
import { db } from '../../firebase/config'; 
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import AdminNavbar from './AdminNavbar';
function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

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

  useEffect(() => {
    const fetchProducts = async () => {
      const productCollection = collection(db, 'products');
      const productSnapshot = await getDocs(productCollection);
      const productList = productSnapshot.docs.map(doc => {
        const data = doc.data();
        const category = categories.find(cat => cat.id === data.category);
        return {
          id: doc.id,
          ...data,
          categoryName: category ? category.name : 'Unknown Category'
        };
      });
      setProducts(productList);
    };

    if (categories.length > 0) {
      fetchProducts();
    }
  }, [categories]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts(products.filter(product => product.id !== id));
      setMessage('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (

    <>
      <AdminNavbar />
    <div className="container mt-5">
      <h2>Manage Products</h2>
      {message && <div className="alert alert-success">{message}</div>}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.categoryName}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td><img src={product.image} alt={product.name} width="100" /></td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </>
  );
}

export default withAuthentication(ManageProducts);
