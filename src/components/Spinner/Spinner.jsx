import React from 'react';
import './Spinner.scss';

const style = {
  margin: 'auto',
  background: 'none',
  display: 'block',
  shapeRendering: 'auto',
};

const Spinner = ({ classes = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    style={style}
    className={classes}
    width="125px"
    height="125px"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <circle
      cx="50"
      cy="50"
      r="32"
      strokeWidth="5"
      stroke="#555"
      strokeDasharray="50.26548245743669 50.26548245743669"
      fill="none"
      strokeLinecap="round"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        dur="1s"
        repeatCount="indefinite"
        keyTimes="0;1"
        values="0 50 50;360 50 50"
      ></animateTransform>
    </circle>
    <circle
      cx="50"
      cy="50"
      r="27"
      strokeWidth="4"
      stroke="#949494"
      strokeDasharray="42.411500823462205 42.411500823462205"
      strokeDashoffset="42.411500823462205"
      fill="none"
      strokeLinecap="round"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        dur="1s"
        repeatCount="indefinite"
        keyTimes="0;1"
        values="0 50 50;-360 50 50"
      ></animateTransform>
    </circle>
  </svg>
);

export default Spinner;
