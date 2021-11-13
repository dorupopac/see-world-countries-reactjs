import React from 'react';
import { formatNumbers } from '../../services/format-numbers';
import classes from './CountryCard.module.scss';

const Card = ({
  name,
  currencies: currenciesData,
  capital: capitalData,
  region,
  languages: languagesData,
  population: populationData,
  flag,
}) => {
  const population = formatNumbers(populationData);
  const languages = (
    languagesData ? Object.values(languagesData) : ['No data 😔']
  ).join(', ');
  const currencies = (
    currenciesData ? Object.keys(currenciesData) : ['No data 😔']
  ).join(', ');
  const capitals = (capitalData ? capitalData : ['No data 😔']).join(', ');

  return (
    <article className={classes.country}>
      <img className={classes.img} src={flag} alt="flag" />
      <div className={classes.data}>
        <h3 className={classes.name}>{name}</h3>
        <h4 className={classes.region}>{region}</h4>
        <p className={classes.row}>
          <span>🏙️</span>
          {capitals}
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
    </article>
  );
};
export default Card;
