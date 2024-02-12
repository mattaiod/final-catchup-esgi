type InputProps = {
  id?: string;
  name: string;
  type: string;
  autoComplete?: string;
  required?: boolean;
  classAdd?: string | undefined | null;
};

const Input = ({ id = '', name, type, autoComplete = '', required = false, classAdd = '' }: InputProps) => {
  let allClasses =
    'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm dark:bg-grey bg:white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6';

  if (classAdd) {
    allClasses = allClasses + ' ' + classAdd;
  }

  return (
    <input
      id={id || ''}
      name={name}
      type={type}
      autoComplete={autoComplete ?? ''}
      required={required}
      className={allClasses}
    />
  );
};

export default Input;
