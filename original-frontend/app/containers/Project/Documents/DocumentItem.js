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
import { Auth } from '../../App/helpers';
function DocumentItem({
  canUpload,
  canConfirm,
  Documentos,
  documentoName,
  documentoType,
  accept = 'excel',
  firmado = false,
  noExisteable = false,
  className = '',
  onConfirm,
  required = false,
}) {
  const [fileName, setFileName] = useState('');
  const [noExist, setNoExist] = useState(
    Documentos[documentoType] ? Documentos[documentoType].no_existed : false,
  );
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
    <Item className={className}>
      <div
        className={`color-regular order-1 ${noExist ? 'color-warning' : ''}`}
        style={{ width: '17em' }}
      >
        <b>{documentoName}</b>
      </div>
      {firmado && <span className="order-1 italic-gray">Firmado</span>}
      {!firmado && !(noExisteable && !canUpload && noExist) && (
        <span className="order-1 italic-gray opacity-0">Firmado</span>
      )}
      <FormikField
        name={documentoType}
        validate={value => {
          if (required && !Documentos[documentoType] && !noExist && !value)
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
              {noExisteable && canUpload && (
                <div className="d-flex justify-content-end order-3 mr-3 ">
                  <span className="font-14-rem color-regular italic-gray mr-2">
                    No existe
                  </span>
                  <div className="checkbox-01">
                    <span>
                      <input
                        type="checkbox"
                        checked={noExist}
                        onChange={evt => {
                          setFieldValue(
                            field.name,
                            evt.currentTarget.checked ? 'no_existed' : '',
                          );
                          setNoExist(evt.currentTarget.checked);
                        }}
                      />
                      <label />
                    </span>
                  </div>
                </div>
              )}

              {noExisteable && !canUpload && noExist && (
                <span className="order-1 italic-gray">No existe</span>
              )}
              <div
                className={`custom-file custom-input-file order-3 ${
                  Documentos[documentoType] && Documentos[documentoType].url
                    ? 'd-none'
                    : ''
                }`}
                style={{ height: 'auto' }}
                title="Examinar..."
              >
                <input
                  name={documentoType}
                  accept={fileAccept}
                  required={
                    Documentos[documentoType] &&
                    Documentos[documentoType].no_existed &&
                    !noExist
                  }
                  className={
                    getInTouched && getInErrors
                      ? 'is-invalid custom-file-input'
                      : 'custom-file-input'
                  }
                  disabled={!canUpload || noExist}
                  onChange={event => {
                    if (!noExist) {
                      setFieldValue(field.name, event.target.files[0]);
                      onConfirm();
                    }
                  }}
                  type="file"
                />
                <label
                  className="custom-file-label font-14-rem shadow-sm text-nowrap overflow-hidden"
                  style={{ textOverflow: 'ellipsis' }}
                >
                  <b>
                    {(!value || value === 'no_existed') && 'Examinar...'}
                    {value && value !== 'no_existed' && !value.name && value}
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
      {Documentos[documentoType] && (
        <FormikField name={documentoType}>
          {({ field, form: { setFieldValue } }) => {
            const { value } = field;

            return (
              <div className="align-items-center mr-3 order-3">
                <div className="d-flex ">
                  <span
                    title={
                      value !== 'confirmed' ? 'Este archivo es rechazado' : ''
                    }
                    className={`font-14-rem d-flex align-items-center order-3 mr-3 ${
                      (typeof value === 'string' && value.startsWith('rejected')) ? 'color-warning' : 'color-em'
                    }`}
                  >
                    <em>
                      {getFileName(fileName || Documentos[documentoType].url)}
                    </em>
                  </span>
                  {(canConfirm ||
                    Documentos[documentoType].state !== 'to_confirm') && (
                    <div className="d-flex align-items-center mr-3 order-3">
                      <div className="radio d-flex align-items-center font-14-rem mr-2">
                        <div className="m-radio">
                          <input
                            type="radio"
                            name={documentoType}
                            disabled={!canConfirm}
                            checked={value === "confirmed"}
                            onChange={() => {
                              setFieldValue(documentoType, 'confirmed');
                              onConfirm();
                            }}
                          />
                          <label />
                        </div>
                        <span className="ml-1 color-regular">
                          <b>Visto</b>
                        </span>
                      </div>
                      <div className="radio d-flex align-items-center font-14-rem">
                        <div className="m-radio">
                          <input
                            type="radio"
                            name={documentoType}
                            disabled={!canConfirm}
                            checked={(typeof value === 'string') ? value.startsWith('rejected') : false}
                            onChange={() => {
                              setFieldValue(documentoType, 'rejected');
                              onConfirm();
                            }}
                          />
                          <label />
                        </div>
                        <span className="ml-1 color-regular">
                          <b>Rechazar</b>
                        </span>
                      </div>
                    </div>
                  )}
                  <UncontrolledDropdown className="order-3">
                    <DropdownToggle
                      tag="a"
                      className="icon icon-dots color-main font-21"
                    />
                    <DropdownMenu right positionFixed>
                      <DropdownItem
                        tag="a"
                        target="_blank"
                        href={Documentos[documentoType].url}
                      >
                        Ver documento
                      </DropdownItem>
                      {canUpload && !noExist && (
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
                </div>

                {(typeof value === 'string' && !(value.startsWith('confirmed')) && !value.startsWith('to_confirm')) && ( // added comments why deny if rejected
                  <div className="w-100 order-3">
                    <textarea
                      disabled = {!Auth.isPM()}
                      className="w-100 rounded-lg shadow-sm"
                      onChange={evt => {
                        setFieldValue(
                          documentoType,
                          `rejected${evt.target.value}`,
                        );
                        onConfirm();
                      }}
                      value={( () =>{
                        switch (value.slice(0,8)) {
                          case "rejected":   return value.slice(8);
                          case "confirme": return "";
                          case "to_confir":  return "";
                          default:      return value.slice(8);
                        }
                      })}
                    />
                  </div>
                )}
              </div>
            );
          }}
        </FormikField>
      )}
    </Item>
  );
}

DocumentItem.propTypes = {
  required: PropTypes.bool,
  canUpload: PropTypes.bool,
  canConfirm: PropTypes.bool,
  Documentos: PropTypes.object,
  documentoName: PropTypes.string,
  documentoType: PropTypes.string,
  accept: PropTypes.string,
  firmado: PropTypes.bool,
  noExisteable: PropTypes.bool,
  className: PropTypes.string,
  onConfirm: PropTypes.func,
};

export default DocumentItem;
