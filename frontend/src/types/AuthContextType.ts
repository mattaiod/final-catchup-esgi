import { Dispatch, SetStateAction } from 'react';
// import Auth from './Auth';
import { AuthReply } from '../../../backend/src/api/auth';

type AuthContextType = {
  auth: AuthReply | null;
  setAuth: Dispatch<SetStateAction<AuthReply | null>>;
};

export default AuthContextType;
