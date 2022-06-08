/**
 *
 * Input
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Field as FormikField, getIn } from 'formik';

const defaultValidate = (value, props) => {
  // required validate
  if (props.required && !value) return 'Este campo es requerido';
  return null;
};

const File = ({
  name,
  children,
  validate,
  label,
  style={height:'auto'},
  className = '',
  onChange,
  ...props
}) => (
  <FormikField
    name={name}
    validate={value => {
      let error = null;
      if (validate) error = validate(value);
      if (error) return error;
      return defaultValidate(value, props);
    }}
    {...props}
  >
    {({ field, form: { touched, errors, setFieldValue } }) => {
      const getInTouched = getIn(touched, field.name);
      const getInErrors = getIn(errors, field.name);
      const { value } = field;
      if (onChange) onChange(value);
      return (
        <div
          className={`custom-file custom-input-file text-left order-3 ${className}`}
          style={style}
          title={props.placeholder}
        >
          <input
            name={name}
            {...props}
            className={
              getInTouched && getInErrors
                ? 'is-invalid custom-file-input'
                : 'custom-file-input'
            }
            onChange={event => {
              setFieldValue(field.name, event.target.files[0]);
            }}
            type="file"
          />
          <label
            className="custom-file-label font-14-rem shadow-sm text-nowrap overflow-hidden m-0"
            style={{ textOverflow: 'ellipsis' }}
          >
            <b>
              {!value && props.placeholder}
              {value && typeof value === 'string' && value}
              {value && typeof value !== 'string' && value.name}
            </b>
          </label>
          {getInTouched && getInErrors && (
            <div className="invalid-feedback d-block m-0">{getInErrors}</div>
          )}
        </div>
      );
    }}
  </FormikField>
);

File.propTypes = {
  placeholder: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node,
  name: PropTypes.string,
  validate: PropTypes.func,
  onChange: PropTypes.func,
};

export default File;
