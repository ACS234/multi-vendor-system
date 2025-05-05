import { Navigate,Outlet } from 'react-router-dom';
import { ACCESS_TOKEN } from '../constants';
import { useCurrentUser } from '../hooks/useUser';

const RoleProtectedRoute = ({ allowedRoles }) => {
  const {role}=useCurrentUser()
  const isAuthenticated = sessionStorage.getItem(ACCESS_TOKEN);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" />; 
  }

  return <Outlet/>;
};

export default RoleProtectedRoute;
