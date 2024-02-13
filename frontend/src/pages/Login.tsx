import AuthLayout from '@/layouts/AuthLayout';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InstanceAxios from '@/axios';
import store from '@/stores';
import { ProductPayload } from '../../../backend/src/api/product';
import { signin } from '@/controllers/auth';
import useAuth from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    const userReply = await signin({ email, password });
    if (userReply) {
      // store.dispatch({ type: 'SET_SESSION', payload: JSON.stringify(userReply) });
      setAuth(userReply);
      // redirect to dashboard
      navigate('/products');
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
