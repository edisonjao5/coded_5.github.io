import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the restriction state domain
 */

const selectRestrictionInitDomain = state =>
  state.restrictionInit || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Restriction
 */

const makeSelectRestrictionInit = () =>
  createSelector(
    selectRestrictionInitDomain,
    substate => substate,
  );

export default makeSelectRestrictionInit;
export { selectRestrictionInitDomain };
