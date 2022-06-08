import React, { useState } from 'react';
import { Label } from 'reactstrap';
import PropTypes from 'prop-types';
import { Field as FormikField } from 'formik';

const RadioGroup = ({
  options = [],
  map = { label: 'label', value: 'value' },
  itemClassName = 'col-auto',
  required,
  readOnly,
  ...props
}) => {
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <>
      {options.map(option => (
        <FormikField
          validate={value => {
            if (
              required &&
              !readOnly &&
              !checked
            )
              return 'Este campo es requerido';
            return null;
          }}
          key={option[map.value]}
          {...props}
        >
          {({ field: { name, value, ...field }, form }) => {
            if (form.touched[name] && form.errors[name])
              setError(form.errors[name]);
            if (!form.errors[name]) setError(false);
            return (
              <div className={`${itemClassName}`}>
                <div className="radio d-flex align-items-center font-14-rem">
                  <div className="m-radio">
                    <input
                      addon="true"
                      type="radio"
                      name={name}
                      {...field}
                      value={option[map.value]}
                      onChange={evt => {
                        if (readOnly) return;
                        if (props.onChange) props.onChange(evt);
                        else if (field.onChange) field.onChange(evt);
                        setChecked(true);
                      }}
                      />
                    <Label />
                  </div>
                  <span className="ml-1 font-14-rem">
                    <b>{option[map.label]}</b>
                  </span>
                </div>
              </div>
            );
          }}
        </FormikField>
      ))}
      {error && <div className="invalid-feedback d-block mx-3">{error}</div>}
    </>
  );
};

RadioGroup.propTypes = {
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  name: PropTypes.string,
  options: PropTypes.array,
  itemClassName: PropTypes.string,
  map: PropTypes.object,
  onChange: PropTypes.func,
};

export default RadioGroup;
