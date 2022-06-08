import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the project state domain
 */

const selectLegalDomain = state => state.legal || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Project
 */

const makeSelectLegal = () =>
  createSelector(
    selectLegalDomain,
    substate => substate,
  );

export default makeSelectLegal;
export { selectLegalDomain };
