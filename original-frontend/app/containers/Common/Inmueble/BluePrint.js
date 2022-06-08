/* eslint-disable jsx-a11y/label-has-associated-control */
/**
 *
 * Project
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Field as FormikField, getIn } from 'formik';
import { getFileName } from 'containers/App/helpers';

function BluePrint({ canUpload, onSubmit, name, required = false }) {
  return (
    <FormikField
      name={name}
      validate={value => {
        if (!value && required) return 'Este campo es requerido';
        return null;
      }}
    >
      {({ field, form: { touched, errors, setFieldValue } }) => {
        const getInTouched = getIn(touched, field.name);
        const getInErrors = getIn(errors, field.name);
        const { value } = field;

        if (!value || value.name) {
          return (
            <div
              className="custom-file c-pointer custom-input-file order-3 caution font-14-rem"
              style={{ width: '7em' }}
              title="Examinar..."
            >
              <input
                name={field.name}
                className={
                  getInTouched && getInErrors
                    ? 'is-invalid custom-file-input'
                    : 'custom-file-input'
                }
                onChange={event => {
                  onSubmit(event.currentTarget.files);
                }}
                accept = 'image/*'
                multiple
                required
                type="file"
              />
              <label
                className="custom-file-label ml-2 shadow-sm text-nowrap overflow-hidden"
                style={{ textOverflow: 'ellipsis' }}
              >
                <b>
                  Examinar...
                </b>
              </label>
              {getInTouched && getInErrors && (
                <div className="invalid-feedback d-block m-0">
                  {getInErrors}
                </div>
              )}
            </div>
          );
        }
        return (
          <>
            <span className="font-14-rem mx-2">{getFileName(value)}</span>
            <a
              href={value}
              target="_blank"
              download
              className="font-14-rem mx-2 btn-arrow"
            >
              <b>Ver Detalle</b>
            </a>
            {canUpload && (
              <button
                type="button"
                className="close mb-1"
                onClick={() => setFieldValue(field.name, null)}
              >
                <span aria-hidden="true">×</span>
              </button>
            )}
          </>
        );
      }}
    </FormikField>
  );
}

BluePrint.propTypes = {
  canUpload: PropTypes.bool,
  name: PropTypes.string,
  required: PropTypes.bool,
};

export default BluePrint;
