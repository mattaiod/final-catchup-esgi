import AuthLayout from '@/layouts/AuthLayout';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InstanceAxios from '@/axios';
import { signup } from '@/controllers/auth';
import store from '@/stores';
export default function Signup() {
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;
    const confirm_password = form.confirmPassword.value;
    const userReply = await signup({ email, password });
    // InstanceAxios.post('/signup', {
    //   email,
    //   password,
    // })
    //   .then((response) => {
    //     window.location.href = '/login';
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }
  return (
    <AuthLayout>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
          Sign up for an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onSubmit} action="#" method="POST">
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
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirmPassword"
                className="dark:text-white block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                fullWidth
                variant="outlined"
              />
            </div>
          </div>

          <div>
            <Button type="submit" variant="contained" className="flex w-full justify-center">
              Sign up
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Member ?{' '}
          <Button href="/login" variant="text">
            Sign in now
          </Button>
        </p>
      </div>
    </AuthLayout>
  );
}
