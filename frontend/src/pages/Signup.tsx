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
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input input-bordered w-full"
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
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="input input-bordered w-full"
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
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div>
            <button className="btn btn-block btn-success text-white">Sign up</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Member ?{' '}
          <a href="/login" className="font-semibold leading-6 text-success hover:text-accent">
            Sign in now
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
