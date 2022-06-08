import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the project state domain
 */

const selectEscrituraFormDomain = state => state.escrituraform || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Escritura
 */

const makeSelectEscrituraForm = () =>
  createSelector(
    selectEscrituraFormDomain,
    substate => substate,
  );

export default makeSelectEscrituraForm;
export { selectEscrituraFormDomain };
