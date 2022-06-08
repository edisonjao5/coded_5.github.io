/* eslint-disable no-unused-vars */
import React from 'react';
import { FormattedNumber } from 'react-intl';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { calculates } from 'containers/Phases/FormaDePago/helper';
import { calculateRenta } from '../helper';

const RentaSummary = ({ values, group = 'Cliente' }) => {
  const { Renta, CoRenta, moneyErr } = calculateRenta(values);
  let renta = Renta;
  if (group === 'Codeudor') {
    renta = CoRenta;
  }

  return (
    <>
      {!moneyErr && (
        <div className="background-color-success mt-2 px-2 font-18 rounded-lg">
          <table className="table table-responsive-md table-borderless">
            <tbody>
              <tr className="align-middle-group">
                <td>
                  <span className="font-18 no-whitespace">Renta Líquida</span>
                </td>
                <td>
                  <span className="font-21 no-whitespace">
                    <b>
                      $<FormattedNumber value={renta} />
                    </b>
                  </span>
                </td>
                <td>
                  <i className="icon icon-check color-success-icon" />
                </td>
                <td className="w-100">
                  <span className="font-14-rem">
                    <b>La Renta Cumple con los Requisitos</b>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {moneyErr && (
        <div className="background-color-warning mt-2 px-2 font-18 rounded-lg">
          <table className="table table-responsive-md table-borderless">
            <tbody>
              <tr className="align-middle-group">
                <td>
                  <span className="font-18 no-whitespace">Renta Líquida</span>
                </td>
                <td>
                  <span className="font-21 no-whitespace">
                    <b>
                      $<FormattedNumber value={renta} />
                    </b>
                  </span>
                </td>
                <td>
                  <i className="icon icon-alert color-warning-icon" />
                </td>
                <td className="w-100">
                  <span className="font-14-rem">
                    <b>La Renta no es Suficiente</b>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

RentaSummary.propTypes = {
  group: PropTypes.string,
  values: PropTypes.object,
};
export default RentaSummary;
