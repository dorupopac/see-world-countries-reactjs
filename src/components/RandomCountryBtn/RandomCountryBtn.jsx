import React from 'react';
import { useCountriesContext } from '../../contexts/countries-context';
import { useHistory } from 'react-router';

import './RandomCountryBtn.scss';

const RandomCountryBtn = () => {
  const { countries } = useCountriesContext();
  const history = useHistory();

  const takeToRandomCountryHandler = () => {
    if (countries.length === 0) return;
    const randomNumber = Math.floor(Math.random() * countries.length);
    const urlPath = countries[randomNumber].name.split(' ').join('-');
    history.push(`/country/${urlPath}`);
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
