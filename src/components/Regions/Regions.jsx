import React from 'react';
import classes from './Regions.module.scss';

const regionsArr = [
  'all',
  'region/africa',
  'region/americas',
  'region/asia',
  'region/europe',
  'region/oceania',
];

const Regions = ({ onRegionClick, activeRegion }) => {
  return (
    <div className={classes['btn-container']}>
      {regionsArr.map((region, i) => {
        const regionName = region.split('/')[1] ? region.split('/')[1] : region;
        let btnClasses = classes['btn-container-btn'];
        if (activeRegion === region)
          btnClasses = `${classes.active} ${classes['btn-container-btn']}`;
        return (
          <button
            key={region + i}
            type="button"
            className={btnClasses}
            onClick={() => {
              onRegionClick(region);
            }}
          >
            {regionName}
          </button>
        );
      })}
    </div>
  );
};
export default Regions;
