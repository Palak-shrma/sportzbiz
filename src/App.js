import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/User/HomePage';
import Dashboard from './components/Admin/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddProduct from './components/Admin/AddProduct';
import AddCategory from './components/Admin/AddCategory';
import AdminLogin from './components/Admin/AdminLogin';
import Logout from './components/Admin/Logout';
import ManageCategories from './components/Admin/ManageCategories';
import ManageProducts from './components/Admin/ManageProducts';
import RegisterUser from './components/User/RegisterUser';
import LoginUser from './components/User/LoginUser';
import UserDashboard from './components/User/UserDashboard';
import CategoriesPage from './components/User/CategoriesPage';
import ProductsPage from './components/User/ProductsPage';
import ProductDetailPage from './components/User/ProductDetailPage';
import ProductsByCategoryPage from './components/User/ProductsByCategoryPage';
import AdminEnquiriesPage from './components/Admin/AdminEnquiriesPage';
import AdminUsersPage from './components/Admin/AdminUsersPage';
import AboutUsPage from './components/User/AboutUsPage';
import UserLogout from './components/User/UserLogout';
import MyEnquiries from './components/User/MyEnquires';
function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Switch to</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">User Zone</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/dashboard">Admin Zone</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/add-category" element={<AddCategory />} />
          <Route path="/admin/admin-login" element={<AdminLogin />} />
          <Route path="/admin/logout" element={<Logout />} />
          <Route path="/admin/manage-categories" element={<ManageCategories />} />
          <Route path="/admin/manage-products" element={<ManageProducts />} />

          <Route path="/register" element={<RegisterUser />} />
          <Route path="/loginuser" element={<LoginUser />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/category/:id/products" element={<ProductsByCategoryPage/>}/>
          <Route path="/admin/admin-enquiry" element={<AdminEnquiriesPage/>} />
          <Route path="/admin/admin-users" element={<AdminUsersPage/>} />
          <Route path="/aboutus" element={<AboutUsPage/>} />
          <Route path="/userlogout" element={<UserLogout/>} />
          <Route path="/myenquires" element={<MyEnquiries/>} />
          
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
