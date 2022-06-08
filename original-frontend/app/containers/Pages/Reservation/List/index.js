/**
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Reservations from 'containers/Reservation/List/Loadable';

export function ReservationsPage({ match }) {
  return <Reservations match={match} />;
}

ReservationsPage.propTypes = {
  match: PropTypes.object,
};

export default ReservationsPage;
