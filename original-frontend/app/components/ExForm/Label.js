/**
 *
 * Label
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ children, className = 'pt-2', ...props }) => (
  <span className={`font-14-rem ${className}`} {...props}>
    <b>{children}</b>
  </span>
);

Label.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Label;
