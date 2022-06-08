import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the project state domain
 */

const selectPromesaFormDomain = state => state.promesaform || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Promesa
 */

const makeSelectPromesaForm = () =>
  createSelector(
    selectPromesaFormDomain,
    substate => substate,
  );

export default makeSelectPromesaForm;
export { selectPromesaFormDomain };
