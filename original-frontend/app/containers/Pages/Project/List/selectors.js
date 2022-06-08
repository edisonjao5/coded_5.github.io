import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the projectList state domain
 */

const selectProjectListDomain = state => state.projectList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProjectList
 */

const makeSelectProjectList = () =>
  createSelector(
    selectProjectListDomain,
    substate => substate,
  );

export default makeSelectProjectList;
export { selectProjectListDomain };
