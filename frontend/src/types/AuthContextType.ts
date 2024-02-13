import { Dispatch, SetStateAction } from 'react';
import Auth from './Auth';

type AuthContextType = {
  auth: Auth | null;
  setAuth: Dispatch<SetStateAction<Auth | null>>;
};

export default AuthContextType;
