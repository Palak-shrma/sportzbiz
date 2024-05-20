import React from 'react';
import { Link } from 'react-router-dom';

function AdminNavbar() {
  return (
    <nav className="mb-4">
      <ul className="nav nav-pills">
        <li className="nav-item">
          <Link className="nav-link" to="/admin/dashboard">Dashboard Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/add-product">Add Product</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/add-category">Add Category</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/manage-categories">Manage Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/manage-products">Manage Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/admin-users">Registered Users</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/admin-enquiry">User Enquires</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/logout">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}

export default AdminNavbar;
