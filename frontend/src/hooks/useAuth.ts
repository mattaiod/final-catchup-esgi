import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';

const useAuth = () => {
  debugger;
  return useContext(AuthContext);
};

export default useAuth;
