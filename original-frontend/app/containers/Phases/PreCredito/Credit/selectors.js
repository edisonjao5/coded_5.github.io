import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the credit state domain
 */

const selectCreditDomain = state => state.credit || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Credit
 */

const makeSelectCredit = () =>
  createSelector(
    selectCreditDomain,
    substate => substate,
  );

export default makeSelectCredit;
export { selectCreditDomain };
