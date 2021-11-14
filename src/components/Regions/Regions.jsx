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
        return (
          <button
            key={region + i}
            type="button"
            className={activeRegion === region ? `${classes.active}` : ''}
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
