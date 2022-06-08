import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLoginPage = state => state.loginPage || initialState;

const makeSelectLoginPage = () =>
  createSelector(
    selectLoginPage,
    loginPageState => loginPageState,
  );

export { selectLoginPage, makeSelectLoginPage };
