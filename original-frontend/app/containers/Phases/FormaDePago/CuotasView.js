/**
 *
 * Cuotas View
 *
 */

import React from 'react';

import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';
import moment from 'moment';
import Button from 'components/Button';
import { ModalFooter, ModalHeader, ModalBody } from 'components/Modal';
import { calculates } from './helper';
import Cheque from './Cheque';

// eslint-disable-next-line no-unused-vars
function CuotasView({ values, onSetCuotas, onHide, onEdit }) {
  const { cuota, balance, moneyErr } = calculates(values);
  const cutoas = values.printCuotas ? values.printCuotas : values.Cuotas;

  return (
    <>
      <ModalHeader>Ver Cuotas</ModalHeader>
      <ModalBody>
        <div className="background-color-tab p-3 d-flex justify-content-between align-items-center after-expands-1">
          <Button color="white" className="order-3" onClick={onEdit}>
            Editar Cuotas
          </Button>
          {/* <div className="order-3">
            <Cheque cuotas={cutoas} onSetCuotas={onSetCuotas} />
          </div> */}
        </div>

        <div className="p-3">
          <table className="table table-borderless">
            <tbody>
              {values.Cuotas &&
                values.Cuotas.map((cuotas, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <tr className="align-middle-group font-14" key={index}>
                    <th className="font-14">
                      <span className="number-circle">{index + 1}</span>
                    </th>
                    <td className="w-auto">
                      <div className="d-flex align-items-center">
                        <span className="mr-2 no-whitespace">
                          <b>Valor</b>
                        </span>
                        {/* <div className="w-100">{cuotas.Amount}</div> */}
                        <FormattedNumber value={cuotas.Amount} minimumFractionDigits={2} maximumFractionDigits={2}/>
                      </div>
                    </td>
                    <td className="w-auto">
                      <div className="d-flex align-items-center">
                        <span className="mr-2 no-whitespace">
                          <b>Día de Pago</b>
                        </span>
                        <div className="w-100">
                          {moment(cuotas.Date).format('MM-DD-YYYY')}
                        </div>
                      </div>
                    </td>
                    <td className="w-auto">
                      <div className="d-flex align-items-center">
                        <span className="mr-2 no-whitespace">
                          <b>Observaciones</b>
                        </span>
                        <div className="w-100">{cuotas.Observacion}</div>
                      </div>
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
                          <FormattedNumber value={cuota} />
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
                          <FormattedNumber value={balance + cuota} />
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
      </ModalBody>
      <ModalFooter>
        <Button color="white" onClick={onHide}>
          Volver
        </Button>
      </ModalFooter>
    </>
  );
}

CuotasView.propTypes = {
  onHide: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  onSetCuotas: PropTypes.func,
  values: PropTypes.object,
};

export default CuotasView;
