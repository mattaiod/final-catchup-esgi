import { AuthContext } from '@/contexts/authContext';

import { ReactNode, useState } from 'react';
import { AuthReply } from '../../../backend/src/api/auth';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthReply | null>(null);
  /*
  const { data, error }: { data: Auth | null; error: any } = {
    data: { user: { name: 'test', email: 'test@test.test' }, roles: ['Admin'], accessToken: '' },
    error: undefined,
  }; //useAxios({ endpoint: 'login' });

  useEffect(() => {
    if (data) {
      setAuth(data);
    }
    if (error) {
      console.error(error);
    }
    return () => {
      setUser(null);
    };
  }, [data, error]);
*/
  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}
