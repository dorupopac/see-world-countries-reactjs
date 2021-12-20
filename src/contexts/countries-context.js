import React, { useState, useContext, useCallback, useEffect } from 'react';
import { getData as getCountries } from '../services/api';

const CountriesContext = React.createContext({
  countries: [],
  loading: true,
  error: null,
  setError: () => {},
  fetchCountries: () => {},
});

const CountriesProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCountries = useCallback(async () => {
    setLoading(true);
    setError(null);

    const countries = await getCountries('all');
    if (countries.data) {
      const countriesData = countries.data.map(countryObj => {
        const {
          name: { common: name },
          currencies,
          capital,
          languages,
          borders,
          area,
          latlng,
          population,
          timezones,
          flags: { svg: flag },
          subregion,
          region,
        } = countryObj;
        const neighbours = [];
        if (borders) {
          borders.forEach(code => {
            neighbours.push(
              countries.data
                .filter(country => country.cca3 === code)
                .map(country => country.name.common)
                .join('')
            );
          });
        }
        return {
          name,
          currencies,
          capital,
          languages,
          neighbours,
          area,
          latlng,
          population,
          timezones,
          flag,
          subregion,
          region,
        };
      });
      setCountries(countriesData);
    } else if (countries.error) setError(countries.error);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const contextValues = {
    countries,
    loading,
    error,
    setError,
  };

  return (
    <CountriesContext.Provider value={contextValues}>
      {children}
    </CountriesContext.Provider>
  );
};

export { CountriesProvider };

export const useCountriesContext = () => useContext(CountriesContext);
