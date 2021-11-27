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
      const countryData = {
        name: res.data[0].name?.official,
        currencies: res.data[0].currencies,
        capital: res.data[0].capital,
        languages: res.data[0].languages,
        neighbours: res.data[0].borders,
        area: res.data[0].area,
        latlng: res.data[0].latlng,
        population: res.data[0].population,
        timezones: res.data[0].timezones,
        flag: res.data[0].flags?.svg,
        subregion: res.data[0].subregion,
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
            style={{ width: '100vw', height: '100vh' }}
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
              style={{ width: '550px', height: '97vh', maxHeight: '1000px' }}
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
