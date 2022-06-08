import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the users state domain
 */

const selectUserInmobiliariaDomain = state =>
  state.userInmobiliaria || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Users
 */

const makeSelectUserInmobiliaria = () =>
  createSelector(
    selectUserInmobiliariaDomain,
    substate => substate,
  );

export default makeSelectUserInmobiliaria;
export { selectUserInmobiliariaDomain };
