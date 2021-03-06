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

function DocumentItem({ canUpload, name, required = false, accept,className='' }) {
  let fileAccept;
  switch (accept) {
    case 'word':
      fileAccept = '.doc,.docx';
      break;
    case 'excel':
      fileAccept =
        'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      break;
    case 'pdf':
      fileAccept = '.pdf,application/pdf';
      break;
    case 'image':
      fileAccept = 'image/*';
      break;
    default:
      fileAccept = '*';
  }
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
              className={`custom-file custom-input-file order-3 caution ${className}`}
              style={{ height: 'auto' }}
              title="Examinar..."
            >
              <input
                name={field.name}
                className={
                  getInTouched && getInErrors
                    ? 'is-invalid custom-file-input'
                    : 'custom-file-input'
                }
                disabled={!canUpload}
                onChange={event => {
                  setFieldValue(field.name, event.target.files[0]);
                }}
                required
                type="file"
                accept={fileAccept}
              />
              <label
                className="custom-file-label font-14-rem shadow-sm text-nowrap overflow-hidden"
                style={{ textOverflow: 'ellipsis' }}
              >
                <b>
                  {!value && 'Examinar...'}
                  {value && !value.name && value}
                  {value && value.name}
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
                <span aria-hidden="true">??</span>
              </button>
            )}
          </>
        );
      }}
    </FormikField>
  );
}

DocumentItem.propTypes = {
  canUpload: PropTypes.bool,
  name: PropTypes.string,
  required: PropTypes.bool,
  accept: PropTypes.string,
};

export default DocumentItem;
