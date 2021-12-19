import React from 'react';
import { useCountriesContext } from '../../contexts/countries-context';
import { useNavigate } from 'react-router';

import './RandomCountryBtn.scss';

const RandomCountryBtn = () => {
  const { countries } = useCountriesContext();
  const navigate = useNavigate();

  const takeToRandomCountryHandler = () => {
    if (countries.length === 0) return;
    const randomNumber = Math.floor(Math.random() * countries.length);
    const urlPath = countries[randomNumber].name.split(' ').join('-');
    navigate(`/country/${urlPath}`);
  };

  return (
    <button
      id="random-country-btn"
      disabled={countries.length === 0}
      onClick={takeToRandomCountryHandler}
    >
      random
    </button>
  );
};
export default RandomCountryBtn;
