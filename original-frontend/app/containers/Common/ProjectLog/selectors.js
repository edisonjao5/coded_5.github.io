import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the logs state domain
 */

const selectProjectLogDomain = state => state.projectLog || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Logs
 */

const makeSelectProjectLog = () =>
  createSelector(
    selectProjectLogDomain,
    substate => substate,
  );

export default makeSelectProjectLog;
export { selectProjectLogDomain };
