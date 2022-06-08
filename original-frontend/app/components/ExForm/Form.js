/*
 * Form
 *
 */

import React from 'react';
import isFunction from 'lodash/isFunction';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { Form as FormikForm, Formik } from 'formik';

const DefaulSchema = {
  // email: Yup.string().email('Invalid email'),
};

const Form = ({
  children,
  initialValues = {},
  validationSchema = {},
  onSubmit,
  enableReinitialize = true,
  ...props
}) => {
  if (isFunction(children))
    return (
      <Formik
        enableReinitialize={enableReinitialize}
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          ...DefaulSchema,
          ...validationSchema,
        })}
        onSubmit={onSubmit}
        {...props}
      >
        {formProps => <FormikForm>{children(formProps)}</FormikForm>}
      </Formik>
    );
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        ...DefaulSchema,
        ...validationSchema,
      })}
      onSubmit={onSubmit}
      {...props}
    >
      <FormikForm>{children}</FormikForm>
    </Formik>
  );
};

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
    PropTypes.func,
  ]),
  enableReinitialize: PropTypes.bool,
  initialValues: PropTypes.object,
  validationSchema: PropTypes.object,
  onSubmit: PropTypes.func,
};
export default Form;
