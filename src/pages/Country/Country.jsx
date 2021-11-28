import React, { useState, useEffect, useCallback } from 'react';
import { getData as getCountryData } from '../../services/api';
import { useLocation } from 'react-router';
import MapComponent from '../../components/MapComponent/MapComponent';
import Spinner from '../../components/Spinner/Spinner';
import BigCountryCard from '../../components/BigCountryCard/BigCountryCard';
import HomeBtn from '../../components/HomeBtn/HomeBtn';

import classes from './Country.module.scss';

const Country = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countryData, setCountryData] = useState({});
  const [mapIsOpen, setMapIsOpen] = useState(false);
  const { pathname } = useLocation();

  const fetchCountryDetails = useCallback(async () => {
    setLoading(true);
    setError(null);

    let country = pathname.substr(9).replaceAll('-', ' ');
    let res = await getCountryData(`name/${country}?fullText=true`);
    if (res.error) {
      country = pathname.substr(9);
      res = await getCountryData(`name/${country}?fullText=true`);
    }
    if (res.data) {
      const [country] = res.data;
      const neighbours = [];
      if (country.borders) {
        const allCountries = await getCountryData('all');
        if (allCountries.data) {
          country.borders.forEach(code => {
            neighbours.push(
              allCountries.data
                .filter(country => country.cca3 === code)
                .map(country => country.name.common)
                .join('')
            );
          });
        }
      }
      const countryData = {
        name: country.name?.official,
        currencies: country.currencies,
        capital: country.capital,
        languages: country.languages,
        neighbours: neighbours,
        area: country.area,
        latlng: country.latlng,
        population: country.population,
        timezones: country.timezones,
        flag: country.flags?.svg,
        subregion: country.subregion,
      };
      setCountryData(countryData);
    } else setError("That country doesn't exist");
    setLoading(false);
  }, [pathname]);

  useEffect(() => {
    fetchCountryDetails();
  }, [fetchCountryDetails]);

  const toggleMap = () => {
    setMapIsOpen(prev => !prev);
  };

  if (loading) return <Spinner className="spinner" />;
  if (error) return <h1>{error}</h1>;

  return (
    <>
      <div className={classes['small-screens']}>
        <div className={mapIsOpen ? classes.hidden : ''}>
          <div className={classes['small-screens-country-card-container']}>
            <HomeBtn />
            <BigCountryCard
              countryData={countryData}
              handleToggleMap={toggleMap}
            />
          </div>
        </div>
        <div className={mapIsOpen ? '' : classes.hidden}>
          <MapComponent
            style={{
              width: '100vw',
              height: '100vh',
            }}
            latlng={countryData.latlng}
            area={countryData.area}
          />
          <button onClick={toggleMap} className={classes['close-map-btn']}>
            Close Map
          </button>
        </div>
      </div>
      <div className={classes['big-screens']}>
        <div className={mapIsOpen ? classes.hidden : ''}>
          <div className={classes['big-screens-country-card-container']}>
            <HomeBtn />
            <BigCountryCard
              countryData={countryData}
              handleToggleMap={toggleMap}
            />
          </div>
        </div>
        <div className={mapIsOpen ? '' : classes.hidden}>
          <div id={classes['big-screen']}>
            <MapComponent
              style={{ width: '100vw', height: '100vh' }}
              latlng={countryData.latlng}
              area={countryData.area}
            />
            <button onClick={toggleMap} className={classes['close-map-btn']}>
              Close Map
            </button>
          </div>
          <div id={classes['bigger-screen']}>
            <MapComponent
              style={{
                width: '550px',
                height: '97vh',
                maxHeight: '1000px',
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                borderTopRightRadius: '0.7rem',
                borderBottomRightRadius: '0.7rem',
              }}
              latlng={countryData.latlng}
              area={countryData.area}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Country;
