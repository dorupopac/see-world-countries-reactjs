import React, { useState, useContext } from 'react';

const CountriesContext = React.createContext({
  countries: [],
  setCountries: () => {},
});

const CountriesProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);

  return (
    <CountriesContext.Provider value={{ countries, setCountries }}>
      {children}
    </CountriesContext.Provider>
  );
};

export { CountriesProvider };

export const useCountriesContext = () => useContext(CountriesContext);
