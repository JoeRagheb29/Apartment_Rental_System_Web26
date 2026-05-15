import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, requiredRole = null }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // إذا كان في role مطلوب، نتحقق منه
  if (requiredRole) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== requiredRole) {
      return <Navigate to="/" />;
    }
  }

  return <Outlet />;
};

export default PrivateRoute;
