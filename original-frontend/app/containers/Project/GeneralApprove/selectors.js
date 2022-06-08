import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the generalApprove state domain
 */

const selectGeneralApproveDomain = state =>
  state.generalApprove || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GeneralApprove
 */

const makeSelectGeneralApprove = () =>
  createSelector(
    selectGeneralApproveDomain,
    substate => substate,
  );

export default makeSelectGeneralApprove;
export { selectGeneralApproveDomain };
