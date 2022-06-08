import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the offer state domain
 */

const selectFacturaDomain = state => state.factura || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Offer
 */

const makeSelectFactura = () =>
  createSelector(
    selectFacturaDomain,
    substate => substate,
  );

export default makeSelectFactura;
export { selectFacturaDomain };
