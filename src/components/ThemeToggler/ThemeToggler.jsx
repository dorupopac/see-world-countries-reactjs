import React from 'react';
import { BsSun } from 'react-icons/bs';
import { BsMoon } from 'react-icons/bs';
import { useDarkmodeContext } from '../../contexts/darkmode-context';

import './ThemeToggler.scss';

const ThemeToggler = () => {
  const { theme, setTheme } = useDarkmodeContext();
  return (
    <>
      {theme === 'dark' ? (
        <BsSun
          className="theme-toggler"
          onClick={setTheme.bind(null, 'light')}
        />
      ) : (
        <BsMoon
          className="theme-toggler"
          onClick={setTheme.bind(null, 'dark')}
        />
      )}
    </>
  );
};
export default ThemeToggler;
