/**
 *
 * LoginPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Logo from 'images/logo.svg';
import { Auth } from 'containers/App/helpers';

import { makeSelectLoginPage } from './selectors';
import reducer from './reducer';
import saga from './saga';
import LoginForm from './LoginForm';
import { doLogin } from './actions';

export function LoginPage({ selector, onSubmitForm, history }) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  useEffect(() => {
    if (Auth.isLoggedIn()) {
      history.push('/');
    }
  });

  return (
    <React.Fragment>
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <div className="row m-0">
        <div
          className="col-md-6 p-0"
          style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
        >
          <div className="p-5">
            <figure>
              <img src={Logo} width="100" height="" alt="" />
            </figure>
            <h2 className="color-main mt-3">
              Te damos la Bienvenida al Gestor de Proyectos
            </h2>
            <span className="color-gray -rem mt-3">
              INICIA SESIÓN PARA COMENZAR
            </span>
            <LoginForm
              onSubmitForm={onSubmitForm}
              loading={selector.loading}
              error={selector.error}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

LoginPage.propTypes = {
  history: PropTypes.object,
  selector: PropTypes.object,
  onSubmitForm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: credentials => {
      dispatch(doLogin(credentials));
    },
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoginPage);
