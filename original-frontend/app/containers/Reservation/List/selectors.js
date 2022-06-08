import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the reservation state domain
 */

const selectReservationsDomain = state => state.reservations || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Reservation
 */

const makeSelectReservation = () =>
  createSelector(
    selectReservationsDomain,
    substate => substate,
  );

export default makeSelectReservation;
export { selectReservationsDomain };
