import AuthLayout from '@/layouts/AuthLayout';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InstanceAxios from '@/axios';
import store from '@/stores';
import { ProductPayload } from '../../../backend/src/api/product';
import { signin } from '@/controllers/auth';
import useAuth from '@/hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { SetStateAction } from 'react';
import { AuthReply } from '../../../backend/src/api/auth';

export default function Login() {
  const { setAuth } = useAuth();
  let navigate = useNavigate();
  const location = useLocation();
  const handleAuth = (auth: SetStateAction<AuthReply | null>) => {
    return setAuth(auth);
  };
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;
    try {
      const userReply = await signin({ email, password });
      if (userReply) {
        setAuth({ access_token: userReply.access_token, sub: userReply.sub, user: userReply.user });
        navigate('/products');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Optionally set an error state here to display a message to the user
    }
  }

  return (
    <AuthLayout>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block dark:text-white text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <TextField
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                fullWidth
                variant="outlined"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="dark:text-white block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                {/* <Button href="#" variant="text">
                  Forgot password?
                </Button> */}
              </div>
            </div>
            <div className="mt-2">
              <TextField
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
              />
            </div>
          </div>

          <div>
            <Button type="submit" variant="contained" className="flex w-full justify-center">
              Sign in
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <Button href="/signup" variant="text">
            Sign up now
          </Button>
        </p>
      </div>
    </AuthLayout>
  );
}
