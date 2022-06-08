import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the offer state domain
 */

const selectOfferGarantiaDomain = state => state.offergarantia || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Offer
 */

const makeSelectOfferGarantia = () =>
  createSelector(
    selectOfferGarantiaDomain,
    substate => substate,
  );

export default makeSelectOfferGarantia;
export { selectOfferGarantiaDomain };
