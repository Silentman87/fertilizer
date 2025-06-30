// components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRole, children }) => {
  const role = localStorage.getItem('role');
  if (role !== allowedRole) {
    return <Navigate to="/unauthorized" />;
  }
  return children;
};

export default ProtectedRoute;