import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the project state domain
 */

const selectOfferFormDomain = state => state.offerform || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Offer
 */

const makeSelectOfferForm = () =>
  createSelector(
    selectOfferFormDomain,
    substate => substate,
  );

export default makeSelectOfferForm;
export { selectOfferFormDomain };
