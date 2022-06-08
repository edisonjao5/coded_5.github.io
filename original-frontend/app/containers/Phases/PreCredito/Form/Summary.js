/* eslint-disable no-unused-vars */
import React from 'react';
import { FormattedNumber } from 'react-intl';
import PropTypes from 'prop-types';
import { calculates } from 'containers/Phases/FormaDePago/helper';
import { calculateRenta } from '../helper';

const Summary = ({ form }) => {
  const { values } = form;
  const { SumRenta } = calculateRenta(values);
  const { total, discount } = calculates(values);
  const moneyErr = Math.floor(total - discount) >= SumRenta;

  if (!moneyErr)
    return (
      <div className="background-color-success px-3 py-2 font-18 rounded-lg">
        <table className="table table-responsive-md table-borderless m-0">
          <tbody>
            <tr className="align-middle-group">
              <td>
                <span className="font-18 no-whitespace color-success">
                  Suma Rentas
                </span>
              </td>
              <td>
                <span className="font-21 no-whitespace color-success">
                  <b>
                    $<FormattedNumber value={SumRenta} />
                  </b>
                </span>
              </td>
              <td>
                <i className="icon icon-check color-success-icon" />
              </td>
              <td className="w-100">
                <span className="font-14-rem">
                  <b>La Suma de las Rentas Cumple con los Requisitos</b>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  return (
    <div className="background-color-warning px-3 py-2 font-18 rounded-lg">
      <table className="table table-responsive-md table-borderless m-0">
        <tbody>
          <tr className="align-middle-group">
            <td>
              <span className="font-18 no-whitespace color-warning">
                Suma Rentas
              </span>
            </td>
            <td>
              <span className="font-21 no-whitespace color-warning">
                <b>
                  $<FormattedNumber value={SumRenta} />
                </b>
              </span>
            </td>
            <td>
              <i className="icon icon-alert color-warning-icon" />
            </td>
            <td className="w-100">
              <span className="font-14-rem">
                <b>La Suma de las Rentas Cumple no es Suficiente</b>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Summary.propTypes = {
  form: PropTypes.object,
};
export default Summary;
