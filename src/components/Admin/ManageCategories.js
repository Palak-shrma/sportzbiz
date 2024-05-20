import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config'; 
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'; 
import withAuthentication from './withAuthentication';
import AdminNavbar from './AdminNavbar';
function ManageCategories() {
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

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'categories', id));
      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      console.error("Error deleting category: ", error);
    }
  };

  return (
    <>
      <AdminNavbar />
    <div className="container mt-5">
      <h2>Manage Categories</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Category Name</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.id}>
              <th scope="row">{index + 1}</th>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(category.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default withAuthentication(ManageCategories);
