import React, { useState, useContext, useEffect } from 'react';

const DarkmodeContext = React.createContext({
  theme: '',
  setTheme: () => {},
});

const userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? 'dark'
  : 'light';
const savedTheme = localStorage.getItem('theme') ?? userTheme;

const DarkmodeProvider = ({ children }) => {
  const [theme, setTheme] = useState(savedTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleThemeChange = theme => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
  };

  const darkmodeContext = {
    theme,
    setTheme: handleThemeChange,
  };

  return (
    <DarkmodeContext.Provider value={darkmodeContext}>
      {children}
    </DarkmodeContext.Provider>
  );
};

export { DarkmodeProvider };

export const useDarkmodeContext = () => useContext(DarkmodeContext);
