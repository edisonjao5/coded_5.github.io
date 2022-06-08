/**
 *
 * Progress bar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ title, percent, label }) => (
  <figure className="progress-card green">
    <progress className="" value={percent} max={100} />
    {title && <span className="key">{title}</span>}
    {label && <span className="value">{label}</span>}
  </figure>
);

ProgressBar.propTypes = {
  title: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.node,
  ]),
  percent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default ProgressBar;
