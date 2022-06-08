import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sendToLegal state domain
 */

const selectSendToLegalDomain = state => state.sendToLegal || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SendToLegal
 */

const makeSelectSendToLegal = () =>
  createSelector(
    selectSendToLegalDomain,
    substate => substate,
  );

export default makeSelectSendToLegal;
export { selectSendToLegalDomain };
