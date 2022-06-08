import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';
import { stringToBoolean } from 'containers/App/helpers';
import ExField from './ExField';

const Checkbox = ({ className = '', label, readOnly, ...props }) => (
  <ExField
    validate={value => {
      if (props.required && !stringToBoolean(value))
        return 'Este campo es requerido';
      return null;
    }}
    {...props}
    component={(field, form) => {
      const getInTouched = getIn(form.touched, field.name);
      const getInErrors = getIn(form.errors, field.name);
      return (
        <div className={`d-flex align-items-center ${className}`}>
          <div
            className={`${
              getInTouched && getInErrors ? 'is-invalid' : ''
            } checkbox-01 checkbox-medium`}
          >
            <span>
              <input
                type="checkbox"
                addon="true"
                {...field}
                {...props}
                defaultChecked={!!field.value}
                onClick={evt => {
                  if (readOnly) {
                    evt.preventDefault();
                    return false;
                  }
                  return true;
                }}
                onChange={evt => {
                  if (readOnly) return;
                  if (evt.currentTarget.checked)
                    form.setFieldValue(props.name, 1);
                  else form.setFieldValue(props.name, 0);
                }}
              />
              {/* eslint-disable-next-line */}
              <label />
            </span>
            <div className="font-14-rem">{label}</div>
            {getInTouched && getInErrors && (
              <div className="invalid-feedback d-block m-0">{getInErrors}</div>
            )}
          </div>
        </div>
      );
    }}
  />
);

Checkbox.propTypes = {
  readOnly: PropTypes.bool,
  name: PropTypes.string,
  defaultValue: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.string,
};

export default Checkbox;
