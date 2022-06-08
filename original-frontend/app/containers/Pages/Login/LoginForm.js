/**
 *
 * Login Form
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import Button from 'components/Button';
// import Alert from 'components/Alert';
import WithLoading from 'components/WithLoading';

const SyncMessage = WithLoading();

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    // .matches(/[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9]{1}/, 'Rut Inválido')
    .required('Required'),
  password: Yup.string().required('Required'),
});

const LoginForm = ({ onSubmitForm, loading, error }) => (
  <Formik
    initialValues={{
      username: '',
      password: '',
      remember: false,
    }}
    validationSchema={LoginSchema}
    onSubmit={values => {
      if (loading) return;
      onSubmitForm(values);
    }}
    render={({ handleChange, handleBlur, values, errors }) => (
      <Form className="mt-3">
        {error && <SyncMessage error={error} />}
        <div className="background-color-white font-14-rem border rounded-lg shadow-sm mt-2 px-4 py-1 d-flex flex-column">
          <label className="m-0" htmlFor="username">
            RUT
          </label>
          <input
            id="username"
            type="text"
            placeholder="Ingresa tu Rut"
            className="border-0 color-main"
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
          />
          {errors.username && (
            <span className="text-danger">{errors.username}</span>
          )}
        </div>
        <div className="background-color-white font-14-rem border rounded-lg shadow-sm mt-2 px-4 py-1 d-flex flex-column">
          <label className="m-0" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Ingresa tu password"
            className="border-0 color-main"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password && (
            <span className="text-danger">{errors.password}</span>
          )}
        </div>
        <div className="d-flex align-content-center justify-content-between mt-3">
          <div className="checkbox-01 checkbox-medium d-flex align-items-center">
            <span>
              <input
                id="remember"
                type="checkbox"
                name="remember"
                value="remember"
                checked={values.remember}
                onChange={handleChange}
              />
              {/* eslint-disable-next-line */}
              <label htmlFor="remember" />
            </span>
            <p className="m-0 font-14-rem color-gray">Recordarme</p>
          </div>
        </div>
        <div className="border-top py-4 mt-4">
          <Button type="submit" className="m-btn">
            {loading && (
              <span>
                Iniciar sesión ...{' '}
                <i className="spinner-border-sm spinner-border" />
              </span>
            )}
            {!loading && 'Ingresar'}
          </Button>
        </div>
      </Form>
    )}
  />
);

LoginForm.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onSubmitForm: PropTypes.func,
};
export default LoginForm;
