import React, { useState, useRef, useEffect } from 'react';
import ThemeToggler from '../ThemeToggler/ThemeToggler';
import { RiArrowDropDownFill, RiArrowDropUpFill } from 'react-icons/ri';
import RandomCountryBtn from '../RandomCountryBtn/RandomCountryBtn';

import './Regions.scss';

const regionsArr = ['all', 'africa', 'americas', 'asia', 'europe', 'oceania'];

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

  const dropdownClasses = isOpen
    ? 'btn-container btn-container-open'
    : 'btn-container';

  return (
    <div className="header-wrapper">
      <div className="dropdown" ref={dropdownRef} onClick={toggleDropdown}>
        <div className="dropdown-title">
          <button type="button" className="btn-container-btn active-region-btn">
            {activeRegion}
          </button>
          {!isOpen ? <RiArrowDropDownFill /> : <RiArrowDropUpFill />}
        </div>
        <div className={dropdownClasses}>
          {regionsArr.map((region, i) => {
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
                {region}
              </button>
            );
          })}
        </div>
      </div>
      <RandomCountryBtn activeRegion={activeRegion} />
      <ThemeToggler />
    </div>
  );
};
export default Regions;
