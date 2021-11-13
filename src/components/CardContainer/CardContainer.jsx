import React from 'react';
import classes from './CardContainer.module.scss';

const CardContainer = ({ children }) => {
  return <div className={classes.countries}>{children}</div>;
};
export default CardContainer;
