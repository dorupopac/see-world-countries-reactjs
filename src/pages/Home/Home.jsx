import React, { useState } from 'react';
import Regions from '../../components/Regions/Regions';
import Countries from '../../components/Countries/Countries';

const Home = () => {
  const [activeRegion, setActiveRegion] = useState(
    sessionStorage.getItem('active-region') ?? 'all'
  );

  const activeRegionHandler = region => {
    setActiveRegion(region);
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
