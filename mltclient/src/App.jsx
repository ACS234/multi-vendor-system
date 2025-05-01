import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import VendorDashboard from './pages/VendorDashboard';
import UserDashboard from './pages/CustomerDashboard';
import Login from './pages/AuthPages/Login'
import Register from './pages/AuthPages/Register';
import Sidebar from './layout/Sidebar';
// import ProtectedRoute from './pages/AuthPages/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
    <Sidebar/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={
          // <ProtectedRoute role="admin">
            <AdminDashboard />
          // {/* </ProtectedRoute> */}
        }/>

        <Route path="/vendor" element={
          // <ProtectedRoute role="vendor">
            <VendorDashboard />
          // </ProtectedRoute>
        }/>

        <Route path="/user" element={
          // <ProtectedRoute role="user">
            <UserDashboard />
          // </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
