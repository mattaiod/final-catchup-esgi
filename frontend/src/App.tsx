import Loader from './components/layout/Loader';
import { Suspense } from 'react';
import routes from '~react-pages';
import useDirection from './hooks/useDirection';
import { useRoutes } from 'react-router-dom';
import AuthRequired from './components/app/AuthRequired';
import { Route, Routes } from 'react-router-dom';
import Index from '@/pages/index';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/Products';
import Stock from './pages/Stock';
import User from './pages/User';
import AuthProvider from './providers/authProvider';
function App() {
  useDirection();

  return (
    <div className="w-full m-0 bg-gradient-to-b bg-primary-50 dark:to-slate-800 dark:from-primary-950 root">
      <Suspense fallback={<Loader />}>
        <AuthProvider>
          <Routes>
            {/* public routes */}
            {/* <Route path="login" element={<Index />} /> */}
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            {/* <Route path="products" element={<Products />} /> */}
            {/* protected routes */}
            <Route element={<AuthRequired />}>
              <Route path="products" element={<Products />} />
              <Route path="dashboard" element={<Index />} />
              <Route path="stocks" element={<Stock />} />
              <Route path="users" element={<User />} />
            </Route>
            <Route path="/" element={<Index />} />
          </Routes>
        </AuthProvider>
      </Suspense>
    </div>
  );
}

export default App;
