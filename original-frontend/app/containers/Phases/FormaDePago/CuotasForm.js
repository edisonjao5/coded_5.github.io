/**
 *
 * Cuotas Form
 *
 */

import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';
import moment from 'components/moment';
import Button from 'components/Button';
import { FormGroup, Label, Field as ExField } from 'components/ExForm';
import { FieldArray } from 'formik';
import { ModalFooter, ModalHeader, ModalBody } from 'components/Modal';
import { formatNumber } from 'containers/App/helpers';
import { calculates, updatePaymentValues } from './helper';

// eslint-disable-next-line no-unused-vars
function CuotasForm({ form, onHide, onView }) {
  const { values, setValues, setFieldValue } = form;
  const { pay, balance, moneyErr, cuota } = calculates(values);
  const [numberCuotas, setNumberCuotas] = useState(values.Cuotas.length);

  useEffect(() => {
    setNumberCuotas(values.Cuotas.length);
  }, [form.values.Cuotas.length]);

  useEffect(() => {
    setFieldValue(
      'Cuotas',
      values.Cuotas.map((cuota, index) => ({
        ...cuota,
        Date: moment(values.Cuotas[0].Date)
          .add(index, 'M')
          .format(),
      })),
    );
  }, [form.values.Cuotas[0].Date]);

  const changeNumberCuotas = evt => {
    let { Cuotas = [] } = values;

    const number = parseInt(evt.currentTarget.value, 10);
    const firstCuotas = Cuotas[0];
    let totalFee = 0;
    Cuotas.forEach(cuota => {
      totalFee = Number(totalFee) + Number(cuota.Amount);
    });
    const fee = Number(totalFee / number).toFixed(2);
    Cuotas = [];
    const existedNumber = Cuotas.length;
    if (number > 0) {
      [...Array(number).keys()].forEach(i => {
        Cuotas.push({
          Amount: fee || 0,
          Date: moment(firstCuotas.Date || new Date())
            .add(existedNumber + i, 'M')
            .format(),
          Observacion: '',
        });
      });
    }
    updatePaymentValues({
      values: { ...values, Cuotas },
      setValues,
    });
  };

  const updateChangePaymentValues = (value, index) => {
    const valueCouta = parseFloat(value);

    if (index < 1) {
      updatePaymentValues({
        values: {
          ...values,
          Cuotas: values.Cuotas.map(cuota => ({
            ...cuota,
            Amount: valueCouta,
          })),
        },
        setValues,
      });
    } else {
      updatePaymentValues({
        payFor: `Cuotas.${index}.Amount`,
        value: valueCouta,
        values,
        setValues,
      });
    }
  };
  return (
    <>
      <ModalHeader>Ingresar Cuotas</ModalHeader>
      <ModalBody>
        <FieldArray
          name="Cuotas"
          // eslint-disable-next-line no-unused-vars
          render={() => (
            <>
              <div className="background-color-tab p-3 d-flex justify-content-between align-items-center after-expands-1">
                <div className="mr-4 d-flex">
                  <span className="font-14 p-1 pl-0 mr-4">
                    <b>Cantidad de Cuotas</b>
                  </span>
                  <div className="select-filter icon icon-select-arrows right-icon">
                    <select
                      className="form-control form-control-sm"
                      value={numberCuotas}
                      onChange={changeNumberCuotas}
                    >
                      <option value="1">Selecciona una Cantidad</option>
                      {[...Array(values.MaxCuotas).keys()].map(item => (
                        <option key={item} value={item + 1}>
                          {item + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <Button color="white" className="order-3" onClick={onView}>
                  Ver Cuotas
                </Button>
              </div>

              <div className="p-3">
                <table className="table table-borderless">
                  <tbody>
                    {(values.Cuotas || []).map((cuotas, index) => (
                      <tr
                        className="font-14 "
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                      >
                        <td>
                          <span className="number-circle mt-1">
                            {index + 1}
                          </span>
                        </td>
                        <td className="w-auto">
                          <FormGroup>
                            <Label className="mr-2 mt-1">Valor</Label>
                            <div className="btype shadow-sm w-100 ">
                              <input
                                name={`Cuotas.${index}.Amount`}
                                min="0"
                                type="number"
                                className="form-control form-control-sm"
                                value={formatNumber(
                                  values.Cuotas[index].Amount,
                                )}
                                onChange={evt =>
                                  updateChangePaymentValues(
                                    evt.currentTarget.value,
                                    index,
                                  )
                                }
                              />
                            </div>
                          </FormGroup>
                        </td>
                        <td className="w-auto">
                          <FormGroup>
                            <Label className="mr-2 mt-1 no-whitespace">
                              Día de Pago
                            </Label>
                            <ExField
                              type="datepicker"
                              name={`Cuotas.${index}.Date`}
                              className="w-100"
                              value={values.Cuotas[index].Date}
                            />
                          </FormGroup>
                        </td>
                        <td className="w-auto">
                          <FormGroup>
                            <Label className="mr-2 mt-1">Observaciones</Label>
                            <ExField
                              className="w-100"
                              name={`Cuotas.${index}.Observacion`}
                            />
                          </FormGroup>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {moneyErr && (
                  <div className="background-color-warning mt-3 px-2 font-18 rounded-lg">
                    <table className="table table-responsive-md table-borderless m-0">
                      <tbody>
                        <tr className="align-middle-group">
                          <td>
                            <span className="font-14-rem">Total</span>
                          </td>
                          <td>
                            <span>
                              <b>
                                {cuota ? <FormattedNumber value={cuota} /> : null}
                              </b>
                            </span>
                          </td>
                          <td>
                            <i className="icon icon-alert color-warning-icon" />
                          </td>
                          <td className="w-100">
                            <span className="font-14-rem color-regular">
                              <b>El Total debe ser igual al Valor Final</b>
                            </span>
                          </td>
                          <td className="no-whitespace">
                            <span className="font-14-rem mr-2">
                              La diferencia es de:{' '}
                            </span>
                            <span className="font-14-rem">
                              <b>
                                <FormattedNumber value={balance} />
                              </b>
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
                {!moneyErr && (
                  <div className="background-color-success mt-3 px-2 font-18 rounded-lg">
                    <table className="table table-responsive-md table-borderless m-0">
                      <tbody>
                        <tr className="align-middle-group">
                          <td>
                            <span className="font-14-rem">Total</span>
                          </td>
                          <td>
                            <span>
                              <b>
                                <FormattedNumber value={cuota} />
                              </b>
                            </span>
                          </td>
                          <td>
                            <i className="icon icon-check color-success-icon" />
                          </td>
                          <td className="w-100">
                            <span className="font-14-rem color-regular">
                              <b>El Total es igual al Valor Final</b>
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="white" onClick={onHide}>
          OK
        </Button>
      </ModalFooter>
    </>
  );
}

CuotasForm.propTypes = {
  onHide: PropTypes.func.isRequired,
  onView: PropTypes.func,
  form: PropTypes.object,
};

export default CuotasForm;
