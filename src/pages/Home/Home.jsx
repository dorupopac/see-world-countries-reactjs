import React, { useState } from 'react';
import Regions from '../../components/Regions/Regions';
import Countries from '../../components/Countries/Countries';
import { CountriesProvider } from '../../contexts/countries-context';

const Home = () => {
  const initRegion = sessionStorage.getItem('active-region') ?? 'all';
  const [activeRegion, setActiveRegion] = useState(initRegion);

  const activeRegionHandler = region => {
    if (region === 'all') {
      setActiveRegion(region);
    } else {
      setActiveRegion(region);
    }
    sessionStorage.setItem('active-region', region);
  };

  return (
    <CountriesProvider>
      <Regions
        onRegionClick={activeRegionHandler}
        activeRegion={activeRegion}
      />
      <Countries activeRegion={activeRegion} />
    </CountriesProvider>
  );
};
export default Home;
