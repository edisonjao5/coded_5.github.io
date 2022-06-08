import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the entities state domain
 */

const selectAseguradoraDomain = state => state.aseguradora || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Entities
 */

const makeSelectAseguradora = () =>
  createSelector(
    selectAseguradoraDomain,
    substate => substate,
  );

export default makeSelectAseguradora;
export { selectAseguradoraDomain };
