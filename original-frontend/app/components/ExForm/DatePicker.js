import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import 'air-datepicker';
import 'air-datepicker/dist/js/i18n/datepicker.es';
import { Field as FormikField } from 'formik';
import moment from 'components/moment';
export const DatePickerInput = ({
  onSelect,
  value,
  values,
  name,
  style,
  className = '',
  isInvalid = false,
  range = false,
  ...props
}) => {
  useEffect(() => {
    const $el = $(`[name="${name}_date"]`);
    
    const datepicker = $el
      .datepicker({
        language: 'es',
        dateFormat: 'dd M. yyyy',
        autoClose: true,
        range,
        multipleDates: range,
        multipleDatesSeparator: ' - ',
        onSelect,
      })
      .data('datepicker');
    if (datepicker) {
      if (values && range) {
        datepicker.selectDate([new Date(values[0]), new Date(values[1])]);
      } else if (value) {
        datepicker.selectDate(new Date(value));
      }
    }
  }, [value]);
  /* eslint-disable */
  if (props.required && (value == undefined || value == '' || value === null))
    className += ' caution';
  /* eslint-enable */
  return (
    <div className={`btype shadow-sm ${className}`} style={style}>
      <input
        readOnly
        className={`form-control form-control-sm  ${
          isInvalid ? 'is-invalid' : ''
        }`}
        name={`${name}_date`}
        type="text"
        placeholder={props.placeholder || 'Fecha...'}
        {...props}
      />
    </div>
  );
};

DatePickerInput.propTypes = {
  isInvalid: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  className: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  values: PropTypes.array,
  name: PropTypes.string,
  range: PropTypes.bool,
  placeholder: PropTypes.string,
};

const DatePicker = ({ name, style={}, valueFormat = null, ...props }) => (
  <FormikField
    name={name}
    {...props}
    validate={value => {
      if (props.required && (value === undefined || value === '' || value === null)) return 'Este campo es requerido';
      return null;
    }}
  >
    {({ field, form, meta }) => {
      const isInvalid = meta.touched && meta.error;
      
      return (
        <div style={style} className={props.className}>
          <DatePickerInput
            name={name}
            {...props}
            isInvalid={isInvalid}
            onSelect={(fd, date) => {
              form.setFieldValue(name, moment(date).format(valueFormat));
            }}
            value={field.value}
            style={style}
          />
          {(isInvalid || (form.submitCount>0 && meta.error)) && (
            <div className="invalid-feedback d-block m-0">{meta.error}</div>
          )}
        </div>
      );
    }}
  </FormikField>
);

DatePicker.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  valueFormat: PropTypes.string,
};

export default DatePicker;
