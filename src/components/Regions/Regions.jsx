import React from 'react';
import { useDarkmodeContext } from '../../contexts/darkmode-context';
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
  const { theme } = useDarkmodeContext();

  return (
    <div className={classes['btn-container']}>
      {regionsArr.map((region, i) => {
        const regionName = region.split('/')[1] ? region.split('/')[1] : region;
        let btnClasses = classes['btn-container-btn'];
        if (activeRegion === region && theme !== 'dark')
          btnClasses = `${classes.active} ${classes['btn-container-btn']}`;
        else if (activeRegion === region && theme === 'dark')
          btnClasses = `${classes['active-dark']} ${classes['btn-container-btn']}`;

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
