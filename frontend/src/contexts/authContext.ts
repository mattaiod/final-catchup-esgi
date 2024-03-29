import { createContext } from 'react';
import AuthContextType from '@/types/AuthContextType';

export const AuthContext = createContext<AuthContextType>({ auth: null, setAuth: (val) => val });
