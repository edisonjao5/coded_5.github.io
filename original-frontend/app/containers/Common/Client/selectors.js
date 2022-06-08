import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the clients state domain
 */

const selectClientDomain = state => state.client || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Clients
 */

const makeSelectClient = () =>
  createSelector(
    selectClientDomain,
    substate => substate,
  );

export default makeSelectClient;
export { selectClientDomain };
