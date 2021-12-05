import React from 'react';
import { formatNumbers, getDataString } from '../../../services/helpers';
import { Link } from 'react-router-dom';
import classes from './SmallCountryCard.module.scss';

const Card = ({
  name,
  currencies,
  capital,
  region,
  languages,
  population,
  flag,
}) => {
  const urlPath = name.split(' ').join('-');

  return (
    <Link to={`/country/${urlPath}`} className={classes.country}>
      <img className={classes.img} src={flag} alt="flag" />
      <div className={classes.data}>
        <h3 className={classes.name}>{name}</h3>
        <h4 className={classes.region}>{region}</h4>
        <p className={classes.row}>
          <span>🏙️</span>
          {getDataString(capital)}
        </p>
        <p className={classes.row}>
          <span>👫</span>
          {formatNumbers(population)} people
        </p>
        <p className={classes.row}>
          <span>🗣️</span>
          {getDataString(languages, 'values')}
        </p>
        <p className={classes.row}>
          <span>💰 </span>
          {getDataString(currencies, 'keys')}
        </p>
      </div>
    </Link>
  );
};
export default Card;
