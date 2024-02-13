import User from './User';

type Auth = {
  user: User;
  roles: Array<string>;
  accessToken: string;
};

export default Auth;
