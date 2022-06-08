/**
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Promesas from 'containers/Promesa/List/Loadable';

export function PromesasPage({ match }) {
  return <Promesas match={match} />;
}

PromesasPage.propTypes = {
  match: PropTypes.object,
};

export default PromesasPage;
