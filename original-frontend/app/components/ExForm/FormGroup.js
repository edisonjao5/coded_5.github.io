/**
 *
 * Input
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

const FormGroup = ({ children, className = '' }) => (
  <div className={`d-flex ${className}`}>{children}</div>
);

FormGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default FormGroup;
