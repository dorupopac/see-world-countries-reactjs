import React, { useState } from 'react';
import Regions from '../components/Regions/Regions';
import Countries from '../components/Countries/Countries';

const initRegion = sessionStorage.getItem('active-region')
  ? sessionStorage.getItem('active-region')
  : 'all';

const Home = () => {
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
    <>
      <Regions
        onRegionClick={activeRegionHandler}
        activeRegion={activeRegion}
      />
      <Countries activeRegion={activeRegion} />
    </>
  );
};
export default Home;
