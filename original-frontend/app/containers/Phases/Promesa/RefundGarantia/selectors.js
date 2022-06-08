import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the offer state domain
 */

const selectPromesaRefundGarantiaDomain = state =>
  state.promesarefundgarantia || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Offer
 */

const makeSelectPromesaRefundGarantia = () =>
  createSelector(
    selectPromesaRefundGarantiaDomain,
    substate => substate,
  );

export default makeSelectPromesaRefundGarantia;
export { selectPromesaRefundGarantiaDomain };
