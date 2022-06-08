/**
 *
 * Empty
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

const Empty = ({
  tag,
  className = 'text-center pb-5 pt-5',
  children,
  ...props
}) => {
  const Tag = tag || 'div';
  return (
    <Tag {...props} className={className}>
      {children && children}
      {!children && 'No hay datos'}
    </Tag>
  );
};

Empty.propTypes = {
  tag: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

export default Empty;
