import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the histories state domain
 */

const selectHistorySellerDomain = state => state.historySeller || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Histories
 */

const makeSelectHistorySeller = () =>
  createSelector(
    selectHistorySellerDomain,
    substate => substate,
  );

export default makeSelectHistorySeller;
export { selectHistorySellerDomain };
