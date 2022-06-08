/**
 *
 * List
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
export const List = ({ children }) => (
  <ul className="p-0 mt-3 border font-14">{children}</ul>
);

List.propTypes = {
  children: PropTypes.node,
};

export const Item = ({ className, children }) => (
  <li
    className={`px-3 py-2 py-1 d-flex justify-content-between align-items-center after-expands-2 ${className}`}
  >
    {children}
  </li>
);
Item.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
