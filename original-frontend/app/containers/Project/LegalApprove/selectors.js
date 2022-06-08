import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the legalApprove state domain
 */

const selectLegalApproveDomain = state => state.legalApprove || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LegalApprove
 */

const makeSelectLegalApprove = () =>
  createSelector(
    selectLegalApproveDomain,
    substate => substate,
  );

export default makeSelectLegalApprove;
export { selectLegalApproveDomain };
