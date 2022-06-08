/**
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Escrituras from 'containers/Escritura/List/Loadable';

export function EscriturasPage({ match }) {
  return <Escrituras match={match} />;
}

EscriturasPage.propTypes = {
  match: PropTypes.object,
};

export default EscriturasPage;
