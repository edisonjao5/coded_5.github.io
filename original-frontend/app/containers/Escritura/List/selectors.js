import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the escritura state domain
 */

const selectEscriturasDomain = state => state.escrituras || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Escritura
 */

const makeSelectEscrituras = () =>
  createSelector(
    selectEscriturasDomain,
    substate => substate,
  );

export default makeSelectEscrituras;
export { selectEscriturasDomain };
