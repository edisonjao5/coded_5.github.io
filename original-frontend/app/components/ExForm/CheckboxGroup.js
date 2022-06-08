import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'formik';

const CheckboxGroup = ({
  name,
  options,
  itemClassName = 'mr-3',
  map = { label: 'label', value: 'value' },
  required = false,
}) =>
  options ? (
    <FieldArray
      name={name}
      validate={values => {
        if (required && values.length < 1) return 'Este campo es requerido';
        return null;
      }}
      render={arrayHelpers => {
        const values = arrayHelpers.form.values[name] || [];
        return (
          <>
            {options.map((option, index) => (
              <Field
                key={option[map.value]}
                name={`${name}[${index}].${map.value}`}
              >
                {({ field }) => (
                  <div className={`d-flex ${itemClassName}`}>
                    <div className="checkbox-01">
                      <span>
                        <input
                          type="checkbox"
                          addon="true"
                          {...field}
                          value={option[map.value]}
                          checked={values.some(
                            value => value[map.value] === option[map.value],
                          )}
                          onChange={evt => {
                            if (evt.currentTarget.checked)
                              arrayHelpers.push(option);
                            else
                              arrayHelpers.remove(
                                values.findIndex(
                                  value =>
                                    value[map.value] === option[map.value],
                                ),
                              );
                          }}
                        />
                        {/* eslint-disable-next-line */}
                        <label />
                      </span>
                      <p className="font-14-rem m-0 color-regular">
                        {option[map.label]}
                      </p>
                    </div>
                  </div>
                )}
              </Field>
            ))}
            {arrayHelpers.form.touched[name] &&
              (arrayHelpers.form.errors[name] && (
                <div className="invalid-feedback d-block mr-3 ml-3">
                  {arrayHelpers.form.errors[name]}
                </div>
              ))}
          </>
        );
      }}
    />
  ) : null;
CheckboxGroup.propTypes = {
  name: PropTypes.string,
  map: PropTypes.object,
  required: PropTypes.bool,
  itemClassName: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default CheckboxGroup;
