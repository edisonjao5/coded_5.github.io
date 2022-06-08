import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the project state domain
 */

const selectGeneralDomain = state => state.general || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Project
 */

const makeSelectGeneral = () =>
  createSelector(
    selectGeneralDomain,
    substate => substate,
  );

export default makeSelectGeneral;
export { selectGeneralDomain };
