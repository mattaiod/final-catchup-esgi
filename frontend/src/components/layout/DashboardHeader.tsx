import Button from '../core/Button';
import Dropdown from '../core/Dropdown';
import i18n from '@/i18n';
//import useDarkMode from '@/hooks/useDarkMode';
import { useTranslation } from 'react-i18next';

const DashboardHeader = ({
  sidebarCollapsed,
  setSidebarCollapsed,
}: {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}) => {
  const { t } = useTranslation();

  //const { toggleDark } = useDarkMode();

  function changeLang(lang: string) {
    i18n.changeLanguage(lang);
    document.body.dir = i18n.dir();
  }

  return (
    <header
      className={`${
        sidebarCollapsed ? 'md:pl-20 md:rtl:pr-20' : 'pl-0 rtl:pl-2 md:rtl:pr-40 md:rtl:pr-72 md:pl-72'
      }  pl-2 transition-padding duration-700 w-full md:fixed right-0 z-20 flex flex-col items-center justify-center md:justify-between  px-4 py-2 space-y-2 shadow-md  md:py-0 md:space-y-none md:h-16 md:flex-row bg-slate-100 dark:bg-slate-900`}
    >
      <div className="hidden md:block">
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="text-3xl cursor-pointer fill-current i-solar-hamburger-menu-linear  text-slate-600 dark:text-white hover:bg-slate-500"
        >
          <span className="sr-only">toggle sidebar</span>
        </button>
      </div>

      <div className="flex items-center space-x-4 rtl:space-x-reverse text-slate-600 dark:text-white">
        <div className="flex">
          <Dropdown
            renderTrigger={(onClick) => <div></div>}
            renderContent={() => <div className="flex flex-col "></div>}
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
