import React, { useContext, useCallback, useEffect, useReducer } from 'react';
import { getData as getCountries } from '../services/api';

const CountriesContext = React.createContext(null);

const initialState = {
  countries: [],
  loading: true,
  error: null,
};

const countriesReducer = (state, action) => {
  switch (action.type) {
    case 'SEND':
      return { countries: [], loading: true, error: null };
    case 'SUCCESS':
      return { countries: action.data, loading: false, error: null };
    case 'ERROR':
      return { countries: [], loading: false, error: action.error };
    default:
      return state;
  }
};

const CountriesProvider = ({ children }) => {
  const [countriesState, dispatch] = useReducer(countriesReducer, initialState);

  const fetchCountries = useCallback(async () => {
    dispatch({ type: 'SEND' });
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
      dispatch({ type: 'SUCCESS', data: countriesData });
    } else if (countries.error)
      dispatch({ type: 'ERROR', error: countries.error });
  }, []);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  return (
    <CountriesContext.Provider value={countriesState}>
      {children}
    </CountriesContext.Provider>
  );
};

export { CountriesProvider };

export const useCountriesContext = () => useContext(CountriesContext);
