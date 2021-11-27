import React, { useState, useEffect, useCallback } from 'react';
import { getData } from '../../services/api';
import { formatNumbers } from '../../services/format-numbers';
import { GrMap } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import classes from './BigCountryCard.module.scss';

const BigCountryCard = ({ countryData, handleToggleMap }) => {
  const [neighbours, setNeighbours] = useState([]);
  const [neighboursLoading, setNeighboursLoading] = useState(true);
  const {
    name,
    currencies,
    capital,
    languages,
    neighbours: neighboursCodes,
    area,
    population,
    timezones,
    flag,
    subregion,
  } = countryData;

  const getNeighboursNames = useCallback(async () => {
    setNeighboursLoading(true);
    const res = await getData(`all`);
    if (res.data) {
      const filteredNeighbours = [];
      neighboursCodes.forEach(code => {
        filteredNeighbours.push(
          res.data
            .filter(country => country.cca3 === code)
            .map(country => country.name.common)
            .join('')
        );
      });
      setNeighbours(filteredNeighbours);
    }
    setNeighboursLoading(false);
  }, [neighboursCodes]);

  useEffect(() => {
    if (neighboursCodes) getNeighboursNames();
  }, [getNeighboursNames, neighboursCodes]);

  const getDataString = (data, extract) => {
    if (data && Array.isArray(data)) return data.join(', ');
    else if (data) return Object[extract](data).join(', ');
    else return 'None';
  };

  const getWordPlural = word => {
    switch (word.toLowerCase()) {
      case 'capital': {
        if (getDataString(capital).includes(',')) return 'Capitals:';
        return 'Capital:';
      }
      case 'currency': {
        if (getDataString(currencies, 'keys').includes(','))
          return 'Currencies:';
        return 'Currency:';
      }
      case 'language': {
        if (getDataString(languages, 'values').includes(','))
          return 'Languages:';
        return 'Language:';
      }
      case 'timezone': {
        if (getDataString(timezones).includes(',')) return 'Timezones:';
        return 'Timezone:';
      }
      case 'neighbour': {
        if (getDataString(neighbours).includes(',') || !neighboursCodes)
          return 'Neighbours:';
        return 'Neighbour:';
      }
      default: {
        return;
      }
    }
  };

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

        <>
          {neighboursCodes ? (
            <p className={classes.row}>
              {!neighboursLoading
                ? neighbours.map((neighbour, i) =>
                    neighbour !== neighbours[neighbours.length - 1] ? (
                      <Link
                        key={neighbour + i}
                        to={neighbour.split(' ').join('-')}
                      >
                        {`${neighbour}, `}
                      </Link>
                    ) : (
                      <Link
                        key={neighbour + i}
                        to={neighbour.split(' ').join('-')}
                      >
                        {neighbour}
                      </Link>
                    )
                  )
                : '...'}
            </p>
          ) : (
            <p className={classes.row}>None</p>
          )}
        </>

        <h5>Total Area:</h5>
        <p className={classes.row}>{formatNumbers(area)} km²</p>
        <h5>{getWordPlural('timezone')}</h5>
        <p className={classes.row}>{getDataString(timezones)}</p>
      </div>
    </article>
  );
};
export default BigCountryCard;
