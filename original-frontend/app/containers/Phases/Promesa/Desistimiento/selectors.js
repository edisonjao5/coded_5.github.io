import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the offer state domain
 */

const selectDesistimentoDomain = state => state.desistimiento || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Offer
 */

const makeSelectDesistimento = () =>
  createSelector(
    selectDesistimentoDomain,
    substate => substate,
  );

export default makeSelectDesistimento;
export { selectDesistimentoDomain };
