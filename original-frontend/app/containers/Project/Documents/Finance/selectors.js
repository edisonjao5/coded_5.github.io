import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the project state domain
 */

const selectFinanceDomain = state => state.finance || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Project
 */

const makeSelectFinance = () =>
  createSelector(
    selectFinanceDomain,
    substate => substate,
  );

export default makeSelectFinance;
export { selectFinanceDomain };
