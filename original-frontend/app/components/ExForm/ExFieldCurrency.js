/**
 *
 * Input
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Field as FormikField, getIn } from 'formik';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import FormGroup from './FormGroup';
import Label from './Label';

// eslint-disable-next-line no-unused-vars
const defaultValidate = (value, props) => {
  /* eslint-disable-next-line */
  if (props.required && (value === undefined || value === '' || value === 0 || value === null)) return 'Este campo es requerido';
  /* eslint-disable */
  if (
      value != '' &&
      props.max !== undefined &&
      parseFloat(value) > parseFloat(props.max)
  )
    return `No debe ser mayor que ${props.max}`;
  if (
    value != '' &&
    props.min !== undefined &&
    parseFloat(value) < parseFloat(props.min)
  )
    return `No debe ser inferior a ${props.min}`;
  /* eslint-enable */
  // ....

  return null;
};

const defaultMaskOptions = {
  prefix: '$ ',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: '.',
  allowDecimal: true,
  decimalSymbol: ',',
  decimalLimit: 0, // how many digits allowed after the decimal
  integerLimit: 10, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
};

const ExFieldCurrency = ({
  name,
  children,
  validate,
  label,
  style,
  component,
  inputClass = '',
  maskOptions = {},
  ...props
}) => {
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
    ...maskOptions,
  });
  return (
    <FormikField
      name={name}
      validate={value => {
        let error = null;
        if (validate) error = validate(value);
        if (error) return error;
        return defaultValidate(value, { ...props, name });
      }}
      {...props}
    >
      {({ field, form }) => {
        let className = props.className || '';
        if (props.required && (field.value === undefined || field.value === '' || field.value === 0 || field.value === null)) className += ' caution';
        /* eslint-disable-next-line */
        const getInTouched = getIn(form.touched, field.name);
        const getInErrors = getIn(form.errors, field.name);
        const inputElement = component ? (
          component(field, form)
        ) : (
          <div
            className={` ${className}`}
            style={props.type === 'hidden' ? { display: 'none' } : style}
          >
            <MaskedInput
              {...field}
              value={field.value || ''}
              onChange={evt =>
                form.setFieldValue(
                  field.name,
                  Number(evt.currentTarget.value.replace(/[^0-9]+/g, '')),
                )
              }
              placeholder={maskOptions.prefix || defaultMaskOptions.prefix}
              mask={currencyMask}
              className={`form-control form-control-sm btype ${
                getInTouched && getInErrors ? 'is-invalid' : ''
              } ${inputClass} ${
                className.includes('caution') ? 'caution' : ''
              }`}
            />
            {(getInTouched || form.submitCount>0) && getInErrors && (
              <div className="invalid-feedback d-block m-0">{getInErrors}</div>
            )}
          </div>
        );

        if (label)
          return (
            <FormGroup className="p-0 my-1">
              {label && <Label style={{ width: '11.65em' }}>{label}</Label>}
              {inputElement}
            </FormGroup>
          );
        return inputElement;
      }}
    </FormikField>
  );
};

ExFieldCurrency.propTypes = {
  required: PropTypes.bool,
  type: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  inputClass: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node,
  maskOptions: PropTypes.object,
  name: PropTypes.string,
  validate: PropTypes.func,
  component: PropTypes.func,
};

export default ExFieldCurrency;
