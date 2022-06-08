import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the project state domain
 */

const selectQuotationFormDomain = state => state.quotationform || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Quotation
 */

const makeSelectQuotationForm = () =>
  createSelector(
    selectQuotationFormDomain,
    substate => substate,
  );

export default makeSelectQuotationForm;
export { selectQuotationFormDomain };
