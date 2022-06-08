import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the cheque state domain
 */

const selectChequeDomain = state => state.cheque || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Cheque
 */

const makeSelectCheque = () =>
  createSelector(
    selectChequeDomain,
    substate => substate,
  );

export default makeSelectCheque;
export { selectChequeDomain };
