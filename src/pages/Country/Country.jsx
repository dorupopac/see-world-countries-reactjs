import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import MapComponent from '../../components/MapComponent/MapComponent';
import Spinner from '../../components/Spinner/Spinner';
import BigCountryCard from '../../components/BigCountryCard/BigCountryCard';
import HomeBtn from '../../components/HomeBtn/HomeBtn';
import { useCountriesContext } from '../../contexts/countries-context';
import { useNavigate } from 'react-router-dom';

import classes from './Country.module.scss';

const Country = () => {
  const [countryData, setCountryData] = useState(null);
  const [mapIsOpen, setMapIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const { countries, loading } = useCountriesContext();
  const { name } = useParams();
  const navigate = useNavigate();

  const getCountryData = useCallback(() => {
    setError(null);
    const countryName = name.replaceAll('-', ' ');

    let countryObj = countries.find(
      countryObj => countryObj.name.toLowerCase() === countryName.toLowerCase()
    );
    if (!countryObj) {
      countryObj = countries.find(
        countryObj => countryObj.name.toLowerCase() === name.toLowerCase()
      );
    }
    if (!countryObj) {
      setError("That country doesn't exist!");
    }

    setCountryData(countryObj);
  }, [name, countries]);

  useEffect(() => {
    getCountryData();
  }, [getCountryData]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        navigate('/home');
      }, 4000);
    }
    return () => clearTimeout(timeout);
  }, [error, navigate]);

  const toggleMap = () => {
    setMapIsOpen(prev => !prev);
  };

  if (loading) return <Spinner className="spinner" />;
  if (error) return <h1>{error}</h1>;
  if (!countryData) return <Spinner className="spinner" />;

  return (
    <>
      <div className={classes['small-screens']}>
        <div
          className={
            !mapIsOpen
              ? `${classes['small-screens-country-card-container']} `
              : `${classes['small-screens-country-card-container']} ${classes['small-screens-country-card-container-hide']}`
          }
        >
          <HomeBtn />
          <BigCountryCard
            countryData={countryData}
            handleToggleMap={toggleMap}
          />
        </div>
        <div
          className={
            mapIsOpen
              ? `${classes['slide-in-map']} ${classes['slide-in-map-show']}`
              : `${classes['slide-in-map']}`
          }
        >
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
        <div
          className={
            !mapIsOpen
              ? `${classes['big-screens-country-card-container']} `
              : `${classes['big-screens-country-card-container']} ${classes['big-screens-country-card-container-hide']}`
          }
        >
          <HomeBtn />
          <BigCountryCard
            countryData={countryData}
            handleToggleMap={toggleMap}
          />
        </div>
        <div
          className={
            mapIsOpen
              ? `${classes['slide-in-map']} ${classes['slide-in-map-show']}`
              : `${classes['slide-in-map']}`
          }
        >
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
    </>
  );
};
export default Country;
