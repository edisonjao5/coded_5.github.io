import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the project state domain
 */

const selectInitProjectDomain = state => state.initProject || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Project
 */

const makeSelectInitProject = () =>
  createSelector(
    selectInitProjectDomain,
    substate => substate,
  );

export default makeSelectInitProject;
export { selectInitProjectDomain };
