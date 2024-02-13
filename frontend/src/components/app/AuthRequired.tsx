import { useLocation, Navigate, Outlet } from 'react-router';
import useAuth from '@/hooks/useAuth';

const AuthRequired = () => {
  const auth = useAuth();
  const location = useLocation();
  return auth?.auth?.user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default AuthRequired;
