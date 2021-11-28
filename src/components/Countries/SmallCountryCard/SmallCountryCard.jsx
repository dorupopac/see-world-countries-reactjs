import React from 'react';
import { formatNumbers } from '../../../services/format-numbers';
import { Link } from 'react-router-dom';
import { useDarkmodeContext } from '../../../contexts/darkmode-context';
import classes from './SmallCountryCard.module.scss';

const Card = ({
  name,
  currencies: currenciesData,
  capital: capitalData,
  region,
  languages: languagesData,
  population: populationData,
  flag,
}) => {
  const { theme } = useDarkmodeContext();

  const population = formatNumbers(populationData);
  const languages = (
    languagesData ? Object.values(languagesData) : ['None']
  ).join(', ');
  const currencies = (
    currenciesData ? Object.keys(currenciesData) : ['None']
  ).join(', ');
  const capital = (capitalData ? capitalData : ['None']).join(', ');
  const urlPath = name.split(' ').join('-');

  return (
    <Link
      to={`/country/${urlPath}`}
      className={
        theme === 'light'
          ? classes.country
          : `${classes.country} ${classes['country-dark']}`
      }
    >
      <img className={classes.img} src={flag} alt="flag" />
      <div className={classes.data}>
        <h3 className={classes.name}>{name}</h3>
        <h4 className={
        theme === 'light'
          ? classes.region
          : `${classes.region} ${classes['region-dark']}`
      }>{region}</h4>
        <p className={classes.row}>
          <span>🏙️</span>
          {capital}
        </p>
        <p className={classes.row}>
          <span>👫</span>
          {population} people
        </p>
        <p className={classes.row}>
          <span>🗣️</span>
          {languages}
        </p>
        <p className={classes.row}>
          <span>💰 </span>
          {currencies}
        </p>
      </div>
    </Link>
  );
};
export default Card;
