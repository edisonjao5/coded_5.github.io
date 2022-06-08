/**
 *
 * Create Project
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import CarpetaReservation from './CarpetaReservation';
import CarpetaOferta from './CarpetaOferta';

export function CarpetaPage({ match, location, dispatch }) {
  const query = queryString.parse(location.search);
  const { OfertaID, ReservaID } = query;
  if (ReservaID) {
    return (<CarpetaReservation
              projectID={match.params.id}
              ReservaID={ReservaID}
              dispatch={dispatch}
            />);
  }
  else if (OfertaID) {
    return (<CarpetaOferta
              projectID={match.params.id}
              OfertaID={OfertaID}
              dispatch={dispatch}
            />);
  }
}

CarpetaPage.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

export default CarpetaPage;
