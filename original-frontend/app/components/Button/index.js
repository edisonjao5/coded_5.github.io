/**
 *
 * Button
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button as ReactButton } from 'reactstrap';

const Button = ({
  loading = false,
  color = '',
  className = '',
  children,
  onClick,
  ...props
}) => (
  <ReactButton
    color=""
    to="/"
    className={`font-14-rem shadow-sm m-btn ml-2 m-btn m-btn-${color} ${className} ${
      loading ? 'disabled' : ''
    }`}
    onClick={loading ? evt => evt.preventDefault() : onClick}
    {...props}
  >
    {children}{' '}
    {loading && <i className="icon spinner-border spinner-border-sm" />}
  </ReactButton>
);

Button.propTypes = {
  loading: PropTypes.bool,
  color: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Button;
