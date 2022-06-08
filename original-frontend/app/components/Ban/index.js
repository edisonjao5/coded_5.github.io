/**
 *
 * Ban
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Alert from '../Alert';

const Ban = ({ children, className = '' }) => (
  <Alert type="warning" className={className}>
    {children || 'No tienes permiso para acceder a esta área'}
  </Alert>
);

Ban.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Ban;
