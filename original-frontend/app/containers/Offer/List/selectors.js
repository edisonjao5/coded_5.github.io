import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the offer state domain
 */

const selectOffersDomain = state => state.offers || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Offer
 */

const makeSelectOffer = () =>
  createSelector(
    selectOffersDomain,
    substate => substate,
  );

export default makeSelectOffer;
export { selectOffersDomain };
