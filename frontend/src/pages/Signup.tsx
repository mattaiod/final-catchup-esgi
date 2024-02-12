import Input from '@/components/core/Input';
import AuthLayout from '@/layouts/AuthLayout';

export default function Login() {
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;
    const confirm_password = form.confirmPassword.value;

    console.log(password, confirm_password);

    if (password !== confirm_password) {
      const confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement;
      if (confirmPasswordInput) {
        // Set an error message
      }
      return;
    }
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
              <Input id="email" name="email" type="email" autoComplete="email" required />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="dark:text-white block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <Input id="password" name="password" type="password" autoComplete="current-password" required />
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
              <Input id="confirmPassword" name="confirmPassword" type="password" required />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Member ?{' '}
          <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign in now
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
