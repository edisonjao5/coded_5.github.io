/**
 *
 * Breadcrumb
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ breadcrumbs }) => (
  <nav className="breadcrumb">
    <ul>
      {breadcrumbs.map(item => (
        <li key={item.url}>
          <Link to={item.url}>{item.label}</Link>
        </li>
      ))}
    </ul>
  </nav>
);

Breadcrumb.propTypes = {
  breadcrumbs: PropTypes.array,
};

export default Breadcrumb;
