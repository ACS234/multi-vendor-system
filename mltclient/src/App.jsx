import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employee';
import Departments from './pages/Departments';
import Settings from './pages/Settings';
import ProductListing from './components/ProductList';
import VendorProfile from './components/VendorProfile';
import Analytics from './pages/Analytics';
import ProfileUpdate from './pages/Profileupdate';
import CreateProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import ProductAnalytics from './components/ProductRanking';
import NotFound from './pages/NotFound';
import ProductDetail from './components/ProductDetails';
import ProductCart from './components/ProductCart';
import PaymentPage from './components/Payment';
import ManageProductsPage from './components/ManageProducts';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProtectedRoute from './routes/ProtectedRoute';
import HomePage from './pages/HomePage';

const App = () => {

  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />
        <div
          className={`w-full p-1 transition-all duration-300 mx-auto overflow-y-auto ${isCollapsed ? 'ml-16' : 'ml-64'} bg-inherit`}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute allowedRoles={['super_admin', 'vendor', 'customer']} />}>
              <Route path="/" element={<HomePage />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['super_admin']} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/employees/new" element={<Employees />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/settings/updateprofile" element={<ProfileUpdate />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/analytic" element={<ProductAnalytics />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['super_admin', 'vendor']} />}>
              <Route path="/profile" element={<VendorProfile />} />
              <Route path='/vendor-profile' element={<VendorProfile />} />
              <Route path="/products/create" element={<CreateProduct />} />
              <Route path="/products/edit/:id" element={<UpdateProduct />} />
              <Route path="/products/manage-product" element={<ManageProductsPage />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['super_admin', 'vendor', 'customer']} />}>
              <Route path="/products" element={<ProductListing />} />
              <Route path="/product-detail/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<ProductCart />} />
              <Route path="/payment" element={<PaymentPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
