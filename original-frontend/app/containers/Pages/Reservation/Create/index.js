/**
 *
 * Create Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Ban from 'components/Ban';
import { Auth } from 'containers/App/helpers';
import ReservationForm from 'containers/Reservation/Form';

export function CreateReservationPage({ match, location }) {
  if (!Auth.hasOneOfPermissions(['Es vendedor', 'Es asistente comercial']))
    return <Ban />;
  return <ReservationForm match={match} location={location} />;
}

CreateReservationPage.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
};

export default CreateReservationPage;
