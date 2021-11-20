import React, { useState, useEffect, useCallback } from 'react';
import { getData as getCountryData } from '../../services/api';
import { useLocation } from 'react-router';
import MapComponent from '../../components/MapComponent/MapComponent';
import Spinner from '../../components/Spinner/Spinner';

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

    const country = pathname.substr(9).replaceAll('-', ' ');
    try {
      const res = await getCountryData(`name/${country}?fullText=true`);
      if (res.data) {
        const countryData = {
          name: res.data[0].name?.official ?? 'No data',
          currencies: res.data[0].currencies ?? 'No data',
          capital: res.data[0].capital ?? 'No data',
          languages: res.data[0].languages ?? 'No data',
          neighbours: res.data[0].borders ?? 'No data',
          area: res.data[0].area ?? 'No data',
          latlng: res.data[0].latlng ?? 'No data',
          population: res.data[0].population ?? 'No data',
          continents: res.data[0].continents ?? 'No data',
          timezones: res.data[0].timezones ?? 'No data',
          flag: res.data[0].flags?.svg ?? 'No data',
          subregion: res.data[0].subregion ?? 'No data',
        };
        console.log(countryData);
        setCountryData(countryData);
      } else if (res.error) throw new Error("That country doesn't exist");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, [pathname]);

  useEffect(() => {
    fetchCountryDetails();
  }, [fetchCountryDetails]);

  const handleOpenMapBtn = () => {
    setMapIsOpen(prev => !prev);
  };

  if (loading) return <Spinner className="spinner" />;
  if (error) return <h1>{error}</h1>;

  return (
    <div className={classes['small-screens']}>
      <div className={mapIsOpen ? classes.hidden : ''}>
        <div className={classes['country-details-container']}>
          <img src={countryData.flag} alt="" />
          <h1>{countryData.name}</h1>
        </div>
        <div>
          <button onClick={handleOpenMapBtn}>Toggle Map</button>
        </div>
      </div>
      <div className={!mapIsOpen ? classes.hidden : ''}>
        <MapComponent
          style={{ width: '100vw', height: '100vh' }}
          latlng={countryData.latlng}
        />
        <button onClick={handleOpenMapBtn} className={classes['close-map-btn']}>
          Close Map
        </button>
      </div>
    </div>
  );
};
export default Country;
