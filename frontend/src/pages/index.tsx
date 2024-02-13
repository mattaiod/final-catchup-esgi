import { Link, useNavigate } from 'react-router-dom';

import Button from '../components/core/Button';
import HomeLayout from '../layouts/HomeLayout';
import { RootState } from '../stores/reducers';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const username = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();

  return (
    <HomeLayout>
      <div className="flex justify-center w-full h-full text-slate-600 dark:text-slate-50">
        <div className="flex flex-col items-center py-16">
          <div className="text-9xl text-secondary-600 dark:text-secondary-500">
            <div className="i-solar-airbuds-case-charge-bold-duotone inline-block" />
          </div>

          <h1 className="max-w-xl text-5xl landing-title font-extrabold leading-normal text-center text-transparent 2xl:max-w-none bg-clip-text bg-gradient-to-r from-secondary-500 to-secondary-800 dark:from-secondary-300 dark:to-secondary-600">
            {'Logiciel de Gestion'}
          </h1>

          <div className="flex justify-center w-full p-4 space-x-2 rtl:space-x-reverse ">
            <Button
              as={Link}
              to="/products"
              color="secondary"
              size="lg"
              prependIcon="i-solar-window-frame-bold-duotone"
            >
              <span>{'Products'}</span>
            </Button>
          </div>

          <div className="flex justify-center w-full p-4 space-x-2 rtl:space-x-reverse ">
            <Button as={Link} to="/stocks" color="secondary" size="lg" prependIcon="i-solar-window-frame-bold-duotone">
              <span>{'Stocks'}</span>
            </Button>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
