/**
 *
 * AppRoute
 *
 *
 */

import React, { useEffect } from 'react';
import isString from 'lodash/isString';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import withLayout from 'components/Layout';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import FullLoading from 'components/WithLoading/FullLoading';
import { makeSelectGlobal, makeSelectPreload } from './selectors';
import { fetchPreloadData } from './actions';
import { Auth } from './helpers';

const AppRoute = ({
  component,
  layout = 'default',
  redirect,
  preload,
  dispatch,
  global,
  ...props
}) => {
  useEffect(() => {
    if (Auth.isLoggedIn() && Object.keys(preload).length < 1 && !global.error) {
      dispatch(fetchPreloadData());
    }
  });
  window.preload = preload || false;
  if (redirect) {
    const redirectProps = redirect();
    if (redirectProps) {
      if (isString(redirectProps)) return <Redirect to={redirectProps} />;
      return <Redirect {...redirectProps} />;
    }
  }
  if (global.loading) return <FullLoading />;
  const Layout = withLayout(component, layout);
  return <Route {...props} render={matchProps => <Layout {...matchProps} />} />;
};

AppRoute.propTypes = {
  global: PropTypes.object,
  preloadActions: PropTypes.array,
  preload: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  layout: PropTypes.string,
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.object,
  ]),
  redirect: PropTypes.oneOfType([PropTypes.func]),
  dispatch: PropTypes.func,
};

const withConnect = connect(
  createStructuredSelector({
    global: makeSelectGlobal(),
    preload: makeSelectPreload(),
  }),
  dispatch => ({ dispatch }),
);

export default compose(withConnect)(AppRoute);
