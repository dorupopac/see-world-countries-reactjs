import React from 'react';
import { BsSun } from 'react-icons/bs';
import { BsMoon } from 'react-icons/bs';
import { useDarkmodeContext } from '../../contexts/darkmode-context';

import './ThemeToggler.scss';

const ThemeToggler = () => {
  const { theme, setTheme } = useDarkmodeContext();

  const themeChangeHandler = theme => {
    setTheme(theme);
  };

  return (
    <>
      {theme === 'dark' ? (
        <BsSun
          className="theme-toggler"
          onClick={() => themeChangeHandler('light')}
        />
      ) : (
        <BsMoon
          className="theme-toggler"
          onClick={() => themeChangeHandler('dark')}
        />
      )}
    </>
  );
};
export default ThemeToggler;
