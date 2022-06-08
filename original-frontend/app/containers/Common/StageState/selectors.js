import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the stageStates state domain
 */

const selectStageStateDomain = state => state.stageState || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by StageStates
 */

const makeSelectStageState = () =>
  createSelector(
    selectStageStateDomain,
    substate => substate,
  );

export default makeSelectStageState;
export { selectStageStateDomain };
