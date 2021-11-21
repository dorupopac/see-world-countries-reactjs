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
    currencies: currenciesData,
    capital: capitalData,
    languages: languagesData,
    neighbours: neighboursCodes,
    area: areaData,
    population: populationData,
    timezones: timeZonesData,
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

  const area = formatNumbers(areaData);
  const population = formatNumbers(populationData);
  const languages = (
    languagesData ? Object.values(languagesData) : ['None']
  ).join(', ');
  const currencies = (
    currenciesData ? Object.keys(currenciesData) : ['None']
  ).join(', ');
  const capital = (capitalData ?? ['None']).join(', ');
  const timezones = timeZonesData.join(', ');

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
        <h5 className={classes['row-title']}>
          {capitalData.length > 1 ? 'Capitals:' : 'Capital:'}
        </h5>
        <p className={classes.row}>{capital}</p>
        <h5 className={classes['row-title']}>Population:</h5>
        <p className={classes.row}>{population}</p>
        <h5>
          {Object.values(languagesData).length > 1 ? 'Languages:' : 'Language:'}
        </h5>
        <p className={classes.row}>{languages}</p>
        <h5>
          {Object.keys(currenciesData).length > 1 ? 'Currencies:' : 'Currency:'}
        </h5>
        <p className={classes.row}>{currencies}</p>
        {neighboursCodes && !neighboursLoading && (
          <>
            <h5>{neighbours.length > 1 ? 'Neighbours:' : 'Neighbour:'}</h5>
            <p className={classes.row}>
              {neighbours.map((neighbour, i) =>
                neighbour !== neighbours[neighbours.length - 1] ? (
                  <Link key={neighbour + i} to={neighbour.split(' ').join('-')}>
                    {`${neighbour}, `}
                  </Link>
                ) : (
                  <Link key={neighbour + i} to={neighbour.split(' ').join('-')}>
                    {neighbour}
                  </Link>
                )
              )}
            </p>
          </>
        )}
        <h5>Total Area:</h5>
        <p className={classes.row}>{area} km²</p>
        <h5>{timeZonesData.length > 1 ? 'Timezones:' : 'Timezone:'}</h5>
        <p className={classes.row}>{timezones}</p>
      </div>
    </article>
  );
};
export default BigCountryCard;
