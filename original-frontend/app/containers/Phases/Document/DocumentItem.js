/* eslint-disable jsx-a11y/label-has-associated-control */
/**
 *
 * Project
 *
 */
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { Field as FormikField, getIn } from 'formik';
import { Item } from 'components/List';
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import { getFileName } from 'containers/App/helpers';
import { requiredSaveDocuments, requiredSendToControl } from './documents';
import { RESERVA_STATE } from 'containers/App/constants';

function DocumentItem({
  canUpload,
  canReview,
  Documentos,
  documentoName,
  documentoType,
  required = false,
  accept = '*',
  firmado = false,
  autoGenerate = false,
  description,
  className = '',
  onReview,
  entity,
}) {
  const [fileName, setFileName] = useState('');
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
    default:
      fileAccept = '*';
  }
  
  if (autoGenerate && !Documentos[documentoType]) return null;

  return (
    <Item className={className}>
      <div className="color-regular order-1" style={{ width: '22em' }}>
        <b>{documentoName}</b>
      </div>
      {firmado && <span className="order-1 italic-gray">Firmado</span>}
      {description && (
        <span className="order-1 italic-gray">{description}</span>
      )}
      {!autoGenerate && (
        <FormikField
          name={documentoType}
          validate={value => {
            const state = entity ? (entity.ReservaState == RESERVA_STATE[0]) : false;
            const requiredTypes = state ? requiredSendToControl : requiredSaveDocuments;

            if (required && requiredTypes.includes(documentoType) && !Documentos[documentoType] && !value ) 
              return 'Este campo es requerido';
            return null;
          }}
        >
          {({ field, form: { touched, errors, setFieldValue } }) => {
            const getInTouched = getIn(touched, field.name);
            const getInErrors = getIn(errors, field.name);
            const { value } = field;

            if (value) setFileName(value.name);
            else setFileName('');

            return (
              <>
                <div
                  className={`custom-file custom-input-file order-3 ${
                    Documentos[documentoType] ? 'd-none' : ''
                  }`}
                  style={{ height: 'auto' }}
                  title="Examinar..."
                >
                  <input
                    name={documentoType}
                    accept={fileAccept}
                    className={
                      getInTouched && getInErrors
                        ? 'is-invalid custom-file-input'
                        : 'custom-file-input'
                    }
                    disabled={!canUpload}
                    onChange={event => {
                      setFieldValue(field.name, event.target.files[0]);
                    }}
                    type="file"
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
              </>
            );
          }}
        </FormikField>
      )}
      {Documentos[documentoType] && (
        <span className="font-14-rem order-3 mr-3">
          <em>{getFileName(fileName || Documentos[documentoType])}</em>
        </span>
      )}
      {Documentos[documentoType] && (
        <UncontrolledDropdown className="order-3">
          <DropdownToggle
            tag="a"
            className="icon icon-dots color-main font-21"
          />
          <DropdownMenu right positionFixed>
            <DropdownItem
              tag="a"
              target="_blank"
              href={Documentos[documentoType]}
            >
              Ver documento
            </DropdownItem>
            {!autoGenerate && canUpload && (
              <DropdownItem
                tag="a"
                onClick={() =>
                  document.getElementsByName(documentoType)[0].click()
                }
              >
                Editar documento
              </DropdownItem>
            )}
          </DropdownMenu>
        </UncontrolledDropdown>
      )}
      {canReview && Documentos[documentoType] && (
        <div className="d-flex align-items-center ml-3 order-3">
          <div className="checkbox-01 checkbox-medium">
            <span>
              <input
                type="checkbox"
                name={documentoType}
                onChange={evt =>
                  onReview(documentoType, evt.currentTarget.checked)
                }
              />
              <label />
            </span>
          </div>
          <span>
            <b>Revisado</b>
          </span>
        </div>
      )}
    </Item>
  );
}

DocumentItem.propTypes = {
  required: PropTypes.bool,
  canUpload: PropTypes.bool,
  canReview: PropTypes.bool,
  Documentos: PropTypes.object,
  documentoName: PropTypes.string,
  documentoType: PropTypes.string,
  accept: PropTypes.string,
  firmado: PropTypes.bool,
  autoGenerate: PropTypes.bool,
  description: PropTypes.string,
  className: PropTypes.string,
  onReview: PropTypes.func,
  entity: PropTypes.object,
};

export default DocumentItem;
