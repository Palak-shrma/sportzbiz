import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import withAuthentication from './withAuthentication';
import { db, storage } from '../../firebase/config'; // Import your Firestore and Storage from your config file
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import AdminNavbar from './AdminNavbar';
function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: null
  });
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState(''); // New state variable for the message


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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduct({
      ...product,
      image: file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload image to Firebase Storage
    if (product.image) {
      const storageRef = ref(storage, 'products/' + product.image.name);
      const uploadTask = uploadBytesResumable(storageRef, product.image);

      uploadTask.on('state_changed',
        (snapshot) => {
          // Progress function ...
        },
        (error) => {
          // Error function ...
          console.log(error);
        },
        () => {
          // Complete function ...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            product.image = downloadURL; // Update product image to the URL

            try {
              // Add product data to Firestore
              const docRef = await addDoc(collection(db, "products"), product);
              //console.log("Product added with ID: ", docRef.id);
              setMessage('Product added'); // Set the message
              setProduct({ // Reset the product state
                name: '',
                category: '',
                price: '',
                description: '',
                image: null
              });
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          });
        }
      );
    }
  };
  return (
    <>
      <AdminNavbar />
      <div className="container mt-5">
        <h2>Add Product</h2>
        {message && <div className="alert alert-success">{message}</div>} {/* Display the message */}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Product Name</label>
            <input type="text" className="form-control" id="name" name="name" value={product.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              className="form-control"
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input type="number" className="form-control" id="price" name="price" value={product.price} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea className="form-control" id="description" name="description" rows="3" value={product.description} onChange={handleChange} required></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Image Upload</label>
            <input type="file" className="form-control" id="image" name="image" onChange={handleFileChange} required />
          </div>
          <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
        <div className="mt-3">
          <Link to="/admin/manage-products">Manage Products</Link> {/* Link to manage products page */}
        </div>
      </div>
    </>
  );
}

export default withAuthentication(AddProduct);

