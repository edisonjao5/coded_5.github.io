import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the project state domain
 */

const selectReservationFormDomain = state =>
  state.reservationform || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Reservation
 */

const makeSelectReservationForm = () =>
  createSelector(
    selectReservationFormDomain,
    substate => substate,
  );

export default makeSelectReservationForm;
export { selectReservationFormDomain };
