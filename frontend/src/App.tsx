import Loader from './components/layout/Loader';
import { Suspense } from 'react';
import routes from '~react-pages';
import useDirection from './hooks/useDirection';
import { useRoutes } from 'react-router-dom';
import AuthRequired from './components/app/AuthRequired';
import { Route, Routes } from 'react-router-dom';
import Index from '@/pages/index';
import About from './pages/About';
import Dashboard from '@/pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
function App() {
  useDirection();

  return (
    <div className="w-full m-0 bg-gradient-to-b bg-primary-50 dark:to-slate-800 dark:from-primary-950 root">
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* public routes */}
          {/* <Route path="login" element={<Index />} /> */}
          {/* <Route path="signing" element={<Signing />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          {/* protected routes */}
          <Route path="/" element={<Index />} />
          <Route element={<AuthRequired />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
