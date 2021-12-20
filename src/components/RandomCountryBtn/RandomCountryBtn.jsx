import React from 'react';
import { useCountriesContext } from '../../contexts/countries-context';
import { useNavigate } from 'react-router';

import './RandomCountryBtn.scss';

const RandomCountryBtn = ({ activeRegion }) => {
  const { countries } = useCountriesContext();
  const navigate = useNavigate();

  const takeToRandomCountryHandler = () => {
    let filteredCountriesByRegion = countries.filter(
      countryObj =>
        countryObj.region.toLowerCase() === activeRegion.toLowerCase()
    );
    if (activeRegion === 'all') {
      filteredCountriesByRegion = [...countries];
    }
    const randomNumber = Math.floor(
      Math.random() * filteredCountriesByRegion.length
    );
    const urlPath = filteredCountriesByRegion[randomNumber].name
      .split(' ')
      .join('-');
    navigate(`/country/${urlPath}`);
  };

  return (
    <button id="random-country-btn" onClick={takeToRandomCountryHandler}>
      random
    </button>
  );
};
export default RandomCountryBtn;
