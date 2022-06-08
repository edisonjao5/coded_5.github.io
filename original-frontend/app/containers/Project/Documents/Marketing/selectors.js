import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the project state domain
 */

const selectMarketingDomain = state => state.marketing || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Project
 */

const makeSelectMarketing = () =>
  createSelector(
    selectMarketingDomain,
    substate => substate,
  );

export default makeSelectMarketing;
export { selectMarketingDomain };
