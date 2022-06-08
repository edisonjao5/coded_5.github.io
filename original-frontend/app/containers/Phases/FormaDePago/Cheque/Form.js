/**
 *
 * Cheque
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import writtenNumber from 'written-number';
import Button from 'components/Button';
import {
  Form as ExForm,
  FormGroup,
  Label,
  Field as ExField,
} from 'components/ExForm';
import { FieldArray } from 'formik';

import { Modal, ModalHeader, ModalFooter, ModalBody } from 'components/Modal';
import { convertUfToPeso } from 'containers/App/helpers';
import moment from 'components/moment';
import { FormattedNumber } from 'react-intl';
import WithLoading from 'components/WithLoading';

const SyncMessage = WithLoading();

export function ChequeForm({
  cuotas,
  selector,
  isOpen = false,
  onSubmit,
  onHide,
  onPrint,
}) {
  writtenNumber.defaults.lang = 'es';

  const initialValues = {
    ActiveIndex: 0,
    Cuotas: cuotas.map(cuota => ({
      Date: cuota.Date,
      AccountNumber: cuota.AccountNumber || '',
      Number: convertUfToPeso(cuota.Amount),
      Beneficiary: cuota.Beneficiary || '',
      City: cuota.City || 'Santiago',
      Serie: cuota.Serie || '',
    })),
  };
  let downSingleCheque = true;
  return (
    <ExForm
      initialValues={initialValues}
      onSubmit={values => {
        const ActiveCuota = values.Cuotas[values.ActiveIndex];
        if (downSingleCheque) onPrint([ActiveCuota]);
        else
          onSubmit(
            values.Cuotas.map(cuota => ({
              ...cuota,
              Beneficiary: cuota.Beneficiary || ActiveCuota.Beneficiary,
              City: cuota.City || ActiveCuota.City,
            })),
          );
      }}
    >
      {form => {
        const { ActiveIndex, Cuotas } = form.values;
        const ActiveCuota = Cuotas[ActiveIndex];
        return (
          <FieldArray
            name="cuotas"
            render={() => (
              <Modal isOpen={isOpen} size="xl" scrollable>
                <ModalHeader className="border-0 d-block">
                  <div className="d-flex align-items-center after-expands-2">
                    <span>Cheques</span>
                    <span className="font-14-rem order-3 mr-3">Cuota</span>
                    <div className="btype shadow-sm order-3 font-14-rem">
                      <input
                        readOnly
                        value={ActiveIndex + 1}
                        type="text"
                        className="form-control form-control-sm text-center"
                        style={{ width: '7em' }}
                      />
                    </div>
                    <span className="font-14-rem order-3 mr-3 ml-3">de</span>
                    <div className="btype shadow-sm order-3 mr-3  font-14-rem">
                      <input
                        readOnly
                        value={cuotas.length}
                        type="text"
                        className="form-control form-control-sm text-center"
                        style={{ width: '7em' }}
                      />
                    </div>
                    <Button
                      className="order-3"
                      onClick={() =>
                        form.setFieldValue(
                          'ActiveIndex',
                          ActiveIndex - 1 > 0 ? ActiveIndex - 1 : 0,
                        )
                      }
                    >
                      Anterior
                    </Button>
                    <Button
                      className="order-3"
                      onClick={() =>
                        form.setFieldValue(
                          'ActiveIndex',
                          ActiveIndex + 1 >= Cuotas.length
                            ? ActiveIndex
                            : ActiveIndex + 1,
                        )
                      }
                    >
                      Siguiente
                    </Button>
                  </div>
                </ModalHeader>
                <ModalBody className="p-0">
                  <div className="p-3">
                    <div className="row p-0 pb-3">
                      <FormGroup className="col-12 col-md-6  align-items-center mt-3">
                        <Label className="w-50">Fecha</Label>
                        <ExField
                          style={{ width: '50%' }}
                          readOnly
                          type="datepicker"
                          name={`Cuotas[${ActiveIndex}].Date`}
                          required
                        />
                      </FormGroup>
                      <FormGroup className="col-12 col-md-6  align-items-center mt-3">
                        <Label className="w-50">Serie</Label>
                        <ExField
                          style={{ width: '50%' }}
                          name={`Cuotas[${ActiveIndex}].Serie`}
                          onChange={evt => {
                            if (! evt.currentTarget.value) return;
                            let Cuotas = form.values.Cuotas;
                            Cuotas[ActiveIndex].Serie = parseInt(evt.currentTarget.value, 10);
                            form.setValues({
                              ActiveIndex: form.values.ActiveIndex,
                              Cuotas: Cuotas,
                            })
                            // form.setValues({
                            //   ActiveIndex: form.values.ActiveIndex,
                            //   Cuotas: form.values.Cuotas.map((item, index) => ({
                            //     ...item,
                            //     Serie: evt.currentTarget.value
                            //       ? parseInt(evt.currentTarget.value, 10) +
                            //         index -
                            //         ActiveIndex
                            //       : '',
                            //   })),
                            // })
                          }}
                          required
                        />
                      </FormGroup>
                      <FormGroup className="col-12 col-md-6  align-items-center mt-3">
                        <Label className="w-50">Número</Label>
                        <ExField
                          name={`Cuotas[${ActiveIndex}].AccountNumber`}
                          // onChange={evt =>
                          //   form.setValues({
                          //     ActiveIndex: form.values.ActiveIndex,
                          //     Cuotas: form.values.Cuotas.map(item => ({
                          //       ...item,
                          //       AccountNumber: evt.currentTarget.value,
                          //     })),
                          //   })
                          // }
                          required
                          style={{ width: '50%' }}
                        />
                      </FormGroup>
                      <FormGroup className="col-12 col-md-6  align-items-center mt-3">
                        <Label className="w-50">Monto</Label>
                        <ExField
                          type="number"
                          style={{ width: '50%' }}
                          required
                          name={`Cuotas[${ActiveIndex}].Number`}
                        />
                      </FormGroup>
                      <FormGroup className="col-12 col-md-6  align-items-center mt-3">
                        <Label className="w-50">Beneficiario</Label>
                        <ExField
                          style={{ width: '50%' }}
                          required
                          // onChange={evt =>
                          //   form.setValues({
                          //     ActiveIndex: form.values.ActiveIndex,
                          //     Cuotas: form.values.Cuotas.map(item => ({
                          //       ...item,
                          //       Beneficiary: evt.currentTarget.value,
                          //     })),
                          //   })
                          // }
                          name={`Cuotas[${ActiveIndex}].Beneficiary`}
                          inputClass="text-uppercase"
                        />
                      </FormGroup>
                      <FormGroup className="col-12 col-md-6  align-items-center mt-3">
                        <ExField
                          label="Nominativo"
                          type="checkbox"
                          name={`Cuotas[${ActiveIndex}].Nominativo`}
                        />
                        <ExField
                          label="Al Portador"
                          type="checkbox"
                          name={`Cuotas[${ActiveIndex}].ToTheCarrier`}
                        />
                        <ExField
                          label="Para Depósito"
                          type="checkbox"
                          name={`Cuotas[${ActiveIndex}].Crossed`}
                        />
                        <ExField
                          label="20 XX"
                          type="checkbox"
                          name={`Cuotas[${ActiveIndex}].HasYear`}
                        />
                      </FormGroup>
                    </div>
                  </div>
                  <div className="p-3 background-color-tab d-flex justify-content-between align-items-center border">
                    <span className="color-regular font-14-rem">
                      <b>IMPRESIÓN CHEQUES</b>
                    </span>
                    <Button
                      className="m-btn-white m-btn-printer"
                      onClick={() => {
                        downSingleCheque = true; //false;
                        form.submitForm();
                      }}
                    >
                      Imprimir Cheques
                    </Button>
                  </div>
                  <div className="p-3">
                    <div className="border">
                      <div className="background-color-tab p-1 border-bottom d-flex justify-content-end align-items-center">
                        <Label className="mr-2">MONTO $</Label>{' '}
                        <FormattedNumber value={ActiveCuota.Number} />
                      </div>
                      <div className="color-regular p-3">
                        <span className="d-flex align-items-center justify-content-end font-14-rem text-right my-2">
                          <ExField
                            style={{ width: '10em' }}
                            placeholder="Ciudad"
                            name={`Cuotas[${ActiveIndex}].City`}
                            required
                          />
                          {' , '}
                          <b>
                            {moment(ActiveCuota.Date).format('DD MMM YYYY')}
                          </b>
                        </span>
                        <FormGroup className="align-items-center my-1">
                          <Label className="mr-3" style={{ minWidth: '10em' }}>
                            Páguese a la orden de
                          </Label>
                          <div className="btype shadow-sm order-3 font-14-rem w-100">
                            <input
                              readOnly
                              value={ActiveCuota.Beneficiary.toUpperCase()}
                              type="text"
                              className="form-control form-control-sm"
                            />
                          </div>
                        </FormGroup>
                        <span className="d-block font-14-rem text-right my-1">
                          o al portador
                        </span>
                        <FormGroup className="align-items-center my-1">
                          <Label className="mr-3" style={{ minWidth: '10em' }}>
                            La suma de
                          </Label>
                          <div className="btype shadow-sm order-3 font-14-rem w-100">
                            <input
                              readOnly
                              value={writtenNumber(ActiveCuota.Number)}
                              type="text"
                              className="form-control form-control-sm text-uppercase"
                            />
                          </div>
                        </FormGroup>
                        <span className="d-block font-14-rem text-right my-1">
                          pesos
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="border">
                      <div className="background-color-tab p-1 border-bottom d-flex justify-content-end align-items-center">
                        <Label className="mr-2">IB MONTO $</Label>{' '}
                        <FormattedNumber value={0} />
                      </div>
                      <div className="color-regular p-3">
                        <span className="d-flex align-items-center justify-content-end font-14-rem text-right my-2">
                          <ExField
                            style={{ width: '10em' }}
                            placeholder="Ciudad"
                            name={`Cuotas[${ActiveIndex}].City`}
                            required
                          />
                          {' , '}
                          <b>
                            {moment(ActiveCuota.Date).format('DD MMM YYYY')}
                          </b>
                        </span>
                        <FormGroup className="align-items-center my-1">
                          <Label className="mr-3" style={{ minWidth: '10em' }}>
                            Páguese a la orden de
                          </Label>
                          <div className="btype shadow-sm order-3 font-14-rem w-100">
                            <input
                              readOnly
                              value={ActiveCuota.Beneficiary.toUpperCase()}
                              type="text"
                              className="form-control form-control-sm"
                            />
                          </div>
                        </FormGroup>
                        <span className="d-block font-14-rem text-right my-1">
                          o al portador
                        </span>
                        <FormGroup className="align-items-center my-1">
                          <Label className="mr-3" style={{ minWidth: '10em' }}>
                            La suma de
                          </Label>
                          <div className="btype shadow-sm order-3 font-14-rem w-100">
                            <input
                              readOnly
                              value=""
                              type="text"
                              className="form-control form-control-sm text-uppercase"
                            />
                          </div>
                        </FormGroup>
                        <span className="d-block font-14-rem text-right my-1">
                          pesos
                        </span>
                        <div className="my-1 d-flex d-flex justify-content-end">
                          <div className="background-color-tab p-3">
                            <ExField name="total" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <SyncMessage {...selector} />
                  <Button
                    disabled={selector.loading}
                    className="ml-2"
                    onClick={() => {
                      downSingleCheque = false; //true;
                      form.submitForm();
                    }}
                  >
                    {/* Descargar */}
                    Salvar
                  </Button>
                  <Button
                    disabled={selector.loading}
                    color="white"
                    onClick={onHide}
                  >
                    Cancelar
                  </Button>
                </ModalFooter>
              </Modal>
            )}
          />
        );
      }}
    </ExForm>
  );
}

ChequeForm.propTypes = {
  cuotas: PropTypes.array,
  selector: PropTypes.object,
  isOpen: PropTypes.bool,
  onSubmit: PropTypes.func,
  onHide: PropTypes.func,
};

export default ChequeForm;
