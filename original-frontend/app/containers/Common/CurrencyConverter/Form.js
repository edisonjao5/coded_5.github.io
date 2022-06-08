/**
 *
 * Cheque
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { Form as ExForm, Field as ExField } from 'components/ExForm';

import { Modal, ModalHeader, ModalBody } from 'components/Modal';
import moment from 'components/moment';
import WithLoading from 'components/WithLoading';

import { FormattedNumber } from 'react-intl';
import FieldMasked from 'components/ExForm/FieldMasked';
import { convertStringToNumber, formatNumber } from '../../App/helpers';
import IntlFormatCurrency from '../../../components/IntlFormat/Currency';

const SyncMessage = WithLoading();

export function Form({
  selector,
  isOpen = false,
  onSubmit,
  onChangeConvert,
  onHide,
}) {
  const { entity, converts } = selector;
  const initialValues = entity;
  return (
    <Modal isOpen={isOpen} size="xl" scrollable toggle={onHide}>
      <ModalHeader>Calculadora de UF</ModalHeader>
      <ModalBody className="p-3">
        <ExForm initialValues={initialValues} onSubmit={onSubmit}>
          {({ values }) => {
            const success =
              values.fecha && values.valor ? (
                <span>
                  Valor UF: $ <FormattedNumber value={values.valor} /> / Fecha:{' '}
                  {moment(values.fecha).format('DD/MM/YYYY')}
                </span>
              ) : (
                false
              );
            return (
              <>
                <SyncMessage timeout={-1} {...selector} success={success} />
                <span className="font-14-rem color-main mt-3">
                  <b>FECHA VALOR UF:</b>
                </span>
                <div className="background-color-tab mt-4 p-3">
                  <div className="row">
                    <div className="col-md-4">
                      <span className="font-14-rem">
                        <b>FECHA</b>
                      </span>
                      <div className="d-flex align-items-center mt-2">
                        <ExField
                          type="text"
                          name="fecha"
                          readOnly={true}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <span className="font-14-rem">
                        <b>Monto</b>
                      </span>
                      <div className="d-flex align-items-center mt-2">
                        <ExField
                            type="number"
                            name="monto"
                        />
                        <Button type="submit">Calculadora </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          }}
        </ExForm>
      </ModalBody>
    </Modal>
  );
}

Form.propTypes = {
  selector: PropTypes.object,
  isOpen: PropTypes.bool,
  onSubmit: PropTypes.func,
  onChangeConvert: PropTypes.func,
  onHide: PropTypes.func,
};

export default Form;
