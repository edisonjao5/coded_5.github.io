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

export function EditReservationPage({ match, location }) {
  if (!Auth.hasOneOfPermissions(['Es vendedor', 'Es asistente comercial']))
    return <Ban />;
  return <ReservationForm match={match} location={location} />;
}

EditReservationPage.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
};

export default EditReservationPage;
