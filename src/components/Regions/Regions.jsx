import React, { useState, useRef, useEffect } from 'react';
import ThemeToggler from '../ThemeToggler/ThemeToggler';
import { RiArrowDropDownFill, RiArrowDropUpFill } from 'react-icons/ri';
import RandomCountryBtn from '../RandomCountryBtn/RandomCountryBtn';

import './Regions.scss';

const regionsArr = [
  'all',
  'region/africa',
  'region/americas',
  'region/asia',
  'region/europe',
  'region/oceania',
];

const Regions = ({ onRegionClick, activeRegion }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const checkIfClickedOutisde = e => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', checkIfClickedOutisde);
    return () => document.removeEventListener('click', checkIfClickedOutisde);
  });

  const toggleDropdown = () => {
    if (window.innerWidth > 700) return;
    setIsOpen(prev => !prev);
  };

  const currentRegion = activeRegion.split('/')[1] ?? activeRegion;
  const dropdownClasses = isOpen
    ? 'btn-container btn-container-open'
    : 'btn-container';

  return (
    <div className="header-wrapper">
      <div className="dropdown" ref={dropdownRef} onClick={toggleDropdown}>
        <div className="dropdown-title">
          <button type="button" className="btn-container-btn active-region-btn">
            {currentRegion}
          </button>
          {!isOpen ? <RiArrowDropDownFill /> : <RiArrowDropUpFill />}
        </div>
        <div className={dropdownClasses}>
          {regionsArr.map((region, i) => {
            const regionName = region.split('/')[1] ?? region;
            let btnClasses = 'btn-container-btn';
            if (activeRegion === region)
              btnClasses = 'active-region-btn btn-container-btn';
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
      </div>
      <RandomCountryBtn />
      <ThemeToggler />
    </div>
  );
};
export default Regions;
