import Button from '../core/Button';
import useDarkMode from '@/hooks/useDarkMode';
import useDirection from '@/hooks/useDirection';

export default function Footer() {
  const { toggleDark } = useDarkMode();
  const { toggleDirection } = useDirection();

  return (
    <footer className="flex justify-center w-full pb-4 text-white footer">
      <nav className="flex mt-6 text-xl" dir="ltr">
        <Button onClick={toggleDark} color="secondary" variant="text" size="lg" iconOnly className="!text-lg">
          <span className="i-solar-moon-bold-duotone dark:i-solar-sun-bold-duotone " />
          <span className="sr-only">dark mode</span>
        </Button>
      </nav>
    </footer>
  );
}
