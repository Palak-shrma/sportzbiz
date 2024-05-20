import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db, storage } from '../../firebase/config'; 
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import AdminNavbar from './AdminNavbar';
import withAuthentication from './withAuthentication';
function AddCategory() {
  const [category, setCategory] = useState({
    name: '',
    description: '',
    image: null
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({
      ...category,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategory({
        ...category,
        image: file
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Upload image to Firebase Storage
    if (category.image) {
      const storageRef = ref(storage, 'categories/' + category.image.name);
      const uploadTask = uploadBytesResumable(storageRef, category.image);

      uploadTask.on('state_changed',
        (snapshot) => {
          // Progress function ...
        },
        (error) => {
          // Error function ...
          console.log(error);
        },
        async () => {
          // Complete function ...
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            category.image = downloadURL; // Update category image to the URL

            // Add category data to Firestore
            const docRef = await addDoc(collection(db, "categories"), category);
            console.log("Category added with ID: ", docRef.id);

            setMessage('Category added successfully');
            setCategory({
              name: '',
              description: '',
              image: null
            });
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }
      );
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mt-5">
        <h2>Add Category</h2>
        {message && <div className="alert alert-success">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Category Name</label>
            <input type="text" className="form-control" id="name" name="name" value={category.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" name="description" rows="3" value={category.description} onChange={handleChange} required></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Category Image</label>
            <input type="file" className="form-control" id="image" name="image" onChange={handleFileChange} required />
          </div>
          <button type="submit" className="btn btn-primary">Add Category</button>
        </form>
        <div className="mt-3">
          <Link to="/admin/manage-categories">Manage Categories</Link>
        </div>
      </div>
    </>


  );
}
export default withAuthentication(AddCategory);

