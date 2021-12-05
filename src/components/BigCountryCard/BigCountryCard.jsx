import React from 'react';
import { formatNumbers } from '../../services/helpers';
import { GrMap } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { getDataString } from '../../services/helpers';
import classes from './BigCountryCard.module.scss';

const BigCountryCard = ({ countryData, handleToggleMap }) => {
  const {
    name,
    currencies,
    capital,
    languages,
    neighbours,
    area,
    population,
    timezones,
    flag,
    subregion,
  } = countryData;

  const getWordPlural = word => {
    switch (word.toLowerCase()) {
      case 'capital':
        if (getDataString(capital).includes(',')) return 'Capitals:';
        return 'Capital:';
      case 'currency':
        if (getDataString(currencies, 'keys').includes(','))
          return 'Currencies:';
        return 'Currency:';
      case 'language':
        if (getDataString(languages, 'values').includes(','))
          return 'Languages:';
        return 'Language:';
      case 'timezone':
        if (getDataString(timezones).includes(',')) return 'Timezones:';
        return 'Timezone:';
      case 'neighbour':
        if (getDataString(neighbours).includes(',') || neighbours.length === 0)
          return 'Neighbours:';
        return 'Neighbour:';
      default:
        return;
    }
  };

  const urlPath = name.split(' ').join('-');

  return (
    <article className={classes.country}>
      <img className={classes.img} src={flag} alt="flag" />
      <div className={classes.data}>
        <div className={classes['header-container']}>
          <div>
            <h3 className={classes.name}>{name}</h3>
            <h4 className={classes.region}>{subregion}</h4>
          </div>
          <GrMap onClick={handleToggleMap} />
        </div>
        <h5 className={classes['row-title']}>{getWordPlural('capital')}</h5>
        <p className={classes.row}>{getDataString(capital)}</p>
        <h5 className={classes['row-title']}>Population:</h5>
        <p className={classes.row}>{formatNumbers(population)}</p>
        <h5>{getWordPlural('language')}</h5>
        <p className={classes.row}>{getDataString(languages, 'values')}</p>
        <h5>{getWordPlural('currency')}</h5>
        <p className={classes.row}>{getDataString(currencies, 'keys')}</p>
        <h5>{getWordPlural('neighbour')}</h5>
        {neighbours.length > 0 ? (
          <p className={classes.row}>
            {neighbours.map((neighbour, i) => (
              <Link key={neighbour + i} to={urlPath}>
                {neighbour !== neighbours[neighbours.length - 1]
                  ? `${neighbour}, `
                  : neighbour}
              </Link>
            ))}
          </p>
        ) : (
          <p className={classes.row}>None</p>
        )}
        <h5>Total Area:</h5>
        <p className={classes.row}>{formatNumbers(area)} km²</p>
        <h5>{getWordPlural('timezone')}</h5>
        <p className={classes.row}>{getDataString(timezones)}</p>
      </div>
    </article>
  );
};
export default BigCountryCard;
