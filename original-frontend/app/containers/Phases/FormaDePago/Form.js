/**
 *
 * Quota Form
 *
 */
import React, { useState } from 'react';
import _ from 'lodash';
import { FormattedNumber } from 'react-intl';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { Input } from 'components/ExForm';
import { formatNumber } from 'containers/App/helpers';
import IntlFormatCurrency from 'components/IntlFormat/Currency';
import Cuotas from './Cuotas';
import {
  calculates,
  isContadoType,
  isCreditType,
  isPayTypeName,
  simulateCalculation,
  updatePaymentValues,
} from './helper';
import { Auth } from 'containers/App/helpers';
import InitData from 'containers/Common/InitData';

// eslint-disable-next-line no-unused-vars
function PhaseFormaDePagoForm({ defaultPercent = {}, form }) {
  const [openCuotas, setOpenCuotas] = useState(0);
  const { values, setValues } = form;

  const { paymentUtils, institucionFinanciera } = window.preload;
  const { cost, cuota, pay, balance, apartmentTotalCost,
          moneyErr, percent, convert
        } = calculates( values );

  const { dividend$, dividendUf } = simulateCalculation(values, values.tmpDate);
  const handleChangeUF = (payFor, val) => {
    const value = parseFloat(val || 0);
    updatePaymentValues({ payFor, value, values, setValues });
  };

  const handleChangePercent = (payFor, val) => {
    const value = (payFor==="AhorroPlus")
                ? (parseFloat(val || 0) / 100) * apartmentTotalCost
                : (parseFloat(val || 0) / 100) * cost;

    updatePaymentValues({ payFor, value, values, setValues });
  };

  //This function is used to manage the quote values when the preload button is click
  const addClassBtn = document.getElementById('change-preload');
  const handlePreload = () => {
    addClassBtn.classList.add('btype')
    addClassBtn.classList.add('caution')
    addClassBtn.setAttribute('required', 'true');
  }
  const removeClassBtn = document.getElementById('change-preload');
  const handleRemovePreload = () => {
    removeClassBtn.classList.remove('btype')
    removeClassBtn.classList.remove('caution')
  }

  return (
    <>
      <InitData InstitucionFinanciera />
      <div className="d-flex align-items-center mb-3">
        <div className="w-50 border-bottom pb-3">
          <div className="row">
            <div className="d-flex">
              {paymentUtils.map(({ PayTypeID, Name }) => {
                const subValue = isPayTypeName(values.PayType)
                  ? Name
                  : PayTypeID;
                return (
                  <div
                    key={PayTypeID}
                    className="radio col-auto d-flex align-items-center font-14-rem"
                  >
                    <div className="m-radio">
                      <input
                        name="PayType"
                        type="radio"
                        value={subValue}
                        checked={subValue === values.PayType}
                        onChange={() => {
                          updatePaymentValues({
                            payFor: 'PayType',
                            value: subValue,
                            values,
                            setValues,
                          });
                        }}
                      />
                      <label />
                    </div>
                    <span className="ml-1 font-14-rem">
                      <b>{Name}</b>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-50 d-flex justify-content-end">
          <Button
            onClick={() => {
              let percentPromesa = 20,
                  percentAmount = 20,
                  percentEscrituraContado = 30,
                  percentInstitucionFinanciera = 25,
                  percentAhorro = 5;

              if(isContadoType(values.PayType)) {
                percentPromesa = defaultPercent.ContadoMontoPromesa || percentPromesa;
                percentAmount = defaultPercent.ContadoMontoCuotas || percentAmount;
                percentEscrituraContado = defaultPercent.ContadoMontoEscrituraContado || percentEscrituraContado;
                percentAhorro = defaultPercent.ContadoAhorroPlus || percentAhorro;
              }
              else if(isCreditType(values.PayType)) {
                percentPromesa = defaultPercent.CreditoMontoPromesa || percentPromesa;
                percentAmount = defaultPercent.CreditoMontoCuotas || percentAmount;
                percentEscrituraContado = defaultPercent.CreditoMontoEscrituraContado || percentEscrituraContado;
                percentInstitucionFinanciera = defaultPercent.CreditoMontoInstitucionFinanciera || percentInstitucionFinanciera;
                percentAhorro = defaultPercent.CreditoAhorroPlus || percentAhorro;
              }

              handleChangePercent('PaymentFirmaPromesa', percentPromesa);
              handleChangePercent('Cuotas.0.Amount', percentAmount);
              handleChangePercent('PaymentFirmaEscritura', percentEscrituraContado);
              handleChangePercent('PaymentInstitucionFinanciera', percentInstitucionFinanciera);
              handleChangePercent('AhorroPlus', percentAhorro);
              // percent.PaymentFirmaEscritura / percent.PaymentInstitucionFinanciera
              handlePreload();
            }}
            className="m-btn m-btn-white shadow-sm"
          >
            Cargar Datos Predeterminados
          </Button>
        </div>
      </div>

      <div className="payment-block">
        <table className="table">
          <thead>
            <tr>
              <td>Crédito</td>
              <td>UF</td>
              <td>%</td>
              <td>$</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PIE / Monto Firma Promesa</td>
              <td>
                {Auth.isPM() ? (
                  <input
                    className="form-control form-control-sm"
                    type="number"
                    value={
                      values.PaymentFirmaPromesa
                        ? formatNumber(values.PaymentFirmaPromesa)
                        : ''
                    }
                    onChange={evt =>{
                      let value = evt.currentTarget.value
                      if ( value < 0) return;
                      handleChangeUF('PaymentFirmaPromesa',value);
                    }}
                  />) : (
                    <div className="search-filter">
                      <span className="form-control form-control-sm" style={{ width: 120, height: 28 }}>
                        {values.PaymentFirmaPromesa
                          ? formatNumber(values.PaymentFirmaPromesa)
                          : ''
                        }
                      </span>
                    </div>)
                }
              </td>
              <td>
                {Auth.isPM() ? (
                  <Input
                    className="form-control form-control-sm"
                    type="number"
                    prefix="%"
                    value={
                      percent.PaymentFirmaPromesa
                        ? formatNumber(percent.PaymentFirmaPromesa)
                        : ''
                    }
                    onChange={evt => {
                      let value = evt.currentTarget.value;
                      if (value > 100 || value < 0) return;
                      handleChangePercent('PaymentFirmaPromesa', value);
                    }}
                  />) : (
                    <div className="search-filter">
                      <span className="form-control form-control-sm" style={{ width: 120, height: 28 }}>
                        {percent.PaymentFirmaPromesa
                          ? `%${formatNumber(percent.PaymentFirmaPromesa)}`
                          : ''
                        }
                      </span>
                    </div>)
                }
              </td>
              <td>
                <div className="search-filter">
                  <IntlFormatCurrency
                    className="form-control form-control-sm"
                    style={{ width: 120, height: 28 }}
                    value={convert.PaymentFirmaPromesa}
                  />
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td />
              <td />
              <td className="border-top">Sub Total</td>
              <td className="border-top text-right">
                <strong>
                  {formatNumber(values.PaymentFirmaPromesa) ?
                  <FormattedNumber
                    value={formatNumber(values.PaymentFirmaPromesa) || 0}
                  /> : null}
                </strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="payment-block">
        <table className="table">
          <tbody>
            <tr>
              <td>PIE / Monto a Financiar en Cuotas</td>
              <td>
                <Input
                  className="form-control form-control-sm"
                  type="number"
                  value={
                    values.Cuotas[0] ?
                      values.Cuotas[0].Amount
                        ? formatNumber(values.Cuotas[0].Amount)
                        : ''
                      : ''
                  }
                  onChange={evt => {
                    let value = evt.currentTarget.value;
                    if ( value < 0) return;
                    handleChangeUF('Cuotas.0.Amount', value);
                  }}
                />
              </td>
              <td>
                <Input
                  className="form-control form-control-sm"
                  type="number"
                  prefix="%"
                  value={
                    percent.Cuotas
                      ? formatNumber(percent.Cuotas)
                      : ''
                  }
                  onChange={evt => {
                    let value = evt.currentTarget.value;
                    if (value > 100 || value < 0) return;

                    handleChangePercent('Cuotas.0.Amount', value);
                  }}
                />
              </td>
              <td>
                <div className="search-filter">
                  <IntlFormatCurrency
                    className="form-control form-control-sm"
                    style={{ width: 120 }}
                    value={convert.Cuotas}
                  />
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td />
              <td />
              <td className="text-right">
                {values.Cuotas && values.Cuotas.length > 0 && (
                  <Link
                    to="/"
                    onClick={evt => {
                      evt.preventDefault();
                      setOpenCuotas(2);
                    }}
                    className="btn-arrow d-inline-block"
                  >
                    Ver Cuotas
                  </Link>
                )}
              </td>
              <td className="text-right">
                <div className="d-flex justify-content-end">
                  <Input
                    type="button"
                    color="white"
                    id="change-preload"
                    className="m-btn-plus"
                    value="+ Ingresar Cuotas"
                    required
                    onClick={evt => {
                      evt.preventDefault();
                      setOpenCuotas(1);
                      handleRemovePreload()
                    }}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td />
              <td />
              <td className="border-top">Sub Total</td>
              <td className="border-top text-right">
                <strong>
                  {cuota ? <FormattedNumber value={cuota} /> : null}
                </strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="payment-block">
        <table className="table">
          <tbody>
            <tr>
              <td>Monto Firma Escritura {isContadoType(values.PayType) && ('/ Contado') || isCreditType(values.PayType) && ('/ Crédito')}</td>
              <td>
                <Input
                  className="form-control form-control-sm"
                  type="number"
                  value={
                    (values.PaymentFirmaEscritura)
                      ? formatNumber(values.PaymentFirmaEscritura)
                      : ''
                  }
                  onChange={evt => {
                    let value = evt.currentTarget.value
                    if (value < 0) return;
                    handleChangeUF('PaymentFirmaEscritura', value);
                  }}
                />
              </td>
              <td>
                <Input
                  className="form-control form-control-sm"
                  type="number"
                  prefix="%"
                  value={
                    (percent.PaymentFirmaEscritura)
                      ? formatNumber(percent.PaymentFirmaEscritura)
                      : ''
                  }
                  onChange={evt => {
                    let value = evt.currentTarget.value;
                    if (value > 100 || value < 0) return;
                    handleChangePercent('PaymentFirmaEscritura', value);
                  }}
                />
              </td>
              <td>
                <div className="search-filter">
                  <IntlFormatCurrency
                    className="form-control form-control-sm"
                    style={{ width: 120 }}
                    value={(convert.PaymentFirmaEscritura)}
                  />
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td />
              <td />
              <td className="border-top">Sub Total</td>
              <td className="border-top text-right">
                <strong>
                  {values.PaymentFirmaEscritura ? <FormattedNumber value={(values.PaymentFirmaEscritura)} /> : null}
                </strong>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {isCreditType(values.PayType) && (
        <div className="payment-block">
          <table className="table">
            <tbody>
              <tr>
                <td>Monto Institución Financiera</td>
                <td>
                  <Input
                    className="form-control form-control-sm"
                    type="number"
                    value={
                      values.PaymentInstitucionFinanciera
                        ? formatNumber(values.PaymentInstitucionFinanciera)
                        : ''
                    }
                    onChange={evt => {
                      let value = evt.currentTarget.value
                      if (value < 0) return;
                      handleChangeUF('PaymentInstitucionFinanciera', value);
                    }}
                    min={0}
                  />
                </td>
                <td>
                  <Input
                    className="form-control form-control-sm"
                    type="number"
                    prefix="%"
                    // readOnly={percent.PaymentInstitucionFinanciera > 1}
                    value={
                      percent.PaymentInstitucionFinanciera
                        ? formatNumber(percent.PaymentInstitucionFinanciera)
                        : ''
                    }
                    onChange={evt => {
                      let value = evt.currentTarget.value;
                      if (value > 100 || value < 0) return;
                      handleChangePercent('PaymentInstitucionFinanciera', value);
                    }}
                  />
                </td>
                <td>
                  <div className="search-filter">
                    <IntlFormatCurrency
                      className="form-control form-control-sm"
                      value={convert.PaymentInstitucionFinanciera}
                      style={{ width: 120 }}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <div className="d-flex align-items-center">
                    <b className="w-50">Años Plazo</b>
                    <div className="w-50">
                      <Input
                        type="select"
                        value={values.tmpDate}
                        onChange={evt => {
                          const val = evt.currentTarget.value;
                          setValues({
                            ...values,
                            [`Date${val}`]: true,
                            tmpDate: val,
                          });
                        }}
                      >
                        <option value="" />
                        {[8, 10, 15, 20, 25, 30].map(item => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </Input>
                    </div>
                  </div>
                </td>
                <td
                  colSpan={2}
                  valign="center"
                  className="align-middle text-center"
                >
                  <b className="ml-1">Dividendo</b> {'UF '}
                  {`${dividendUf} / $ `}
                  {_.isString(dividend$) ? (
                    '-'
                  ) : (
                      <FormattedNumber value={dividend$} />
                    )}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td />
                <td />
                <td className="border-top">Sub Total</td>
                <td className="border-top text-right">
                  <strong>
                    {values.PaymentInstitucionFinanciera ? <FormattedNumber value={(values.PaymentInstitucionFinanciera)} /> : null}
                  </strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
      {values.IsSubsidy && (<>
        <div className="payment-block">
          <table className="table">
            <tbody>
              <tr>
                <td style={{whiteSpace: 'nowrap'}}>Pago con subsidio</td>
                <td>
                  <Input
                    className="form-control form-control-sm"
                    type="number"
                    value={
                      values.Subsidio ? formatNumber(values.Subsidio) : ''
                    }
                    onChange={evt => {
                      let value = evt.currentTarget.value;
                      if ( value < 0) return;
                      handleChangeUF('Subsidio', value);
                    }}
                  />
                </td>
                <td>
                  <Input
                    className="form-control form-control-sm"
                    type="number"
                    prefix="%"
                    value={
                      percent.Subsidio
                        ? formatNumber(percent.Subsidio)
                        : ''
                    }
                    onChange={evt => {
                      let value = evt.currentTarget.value;
                      if (value > 100 || value < 0) return;
                      handleChangePercent('Subsidio', value);
                    }}
                  />
                </td>
                <td>
                  <div className="search-filter">
                    <IntlFormatCurrency
                      className="form-control form-control-sm"
                      style={{ width: 120 }}
                      value={convert.Subsidio}
                    />
                  </div>
                </td>
                <td>
                    <Input
                      className="form-control form-control-sm"
                      value={values.SubsidioType}
                      onChange={evt => {
                        let value = evt.currentTarget.value;
                        setValues({
                          ...values,
                          SubsidioType: value,
                        });
                      }}
                      placeholder="Tipo de Subsidio"
                    />
                  </td>
                <td>
                  <Input
                    className="form-control form-control-sm"
                    value={values.SubsidioCertificado}
                    onChange={evt => {
                      let value = evt.currentTarget.value;
                      setValues({
                        ...values,
                        SubsidioCertificado: value,
                      });
                    }}
                    placeholder="Nro. de Certificado"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="payment-block">
          <table className="table">
            <tbody>
              <tr>
                <td style={{whiteSpace:'nowrap'}}>Libreta de Ahorro o Ahorro Previo</td>
                <td>
                  <Input
                    className="form-control form-control-sm"
                    type="number"
                    value={
                      values.Libreta ? formatNumber(values.Libreta) : ''
                    }
                    onChange={evt => {
                      let value = evt.currentTarget.value;
                      if ( value < 0) return;
                      handleChangeUF('Libreta', value);
                    }}
                  />
                </td>
                <td>
                  <Input
                    className="form-control form-control-sm"
                    type="number"
                    prefix="%"
                    value={
                      percent.Libreta ? formatNumber(percent.Libreta) : ''
                    }
                    onChange={evt => {
                      let value = evt.currentTarget.value;
                      if (value > 100 || value < 0) return;
                      handleChangePercent('Libreta', value);
                    }}
                  />
                </td>
                <td>
                  <div className="search-filter">
                    <IntlFormatCurrency
                      className="form-control form-control-sm"
                      style={{ width: 120 }}
                      value={convert.Libreta}
                    />
                  </div>
                </td>
                <td>
                  <Input
                    type="select"
                    className="form-control form-control-sm"
                    value={values.InstitucionFinancieraID}
                    onChange={evt => {
                      const value = evt.currentTarget.value;
                      setValues({
                        ...values,
                        InstitucionFinancieraID: value,
                      });
                    }}
                  >
                    <option value="" disabled>Selecciona...</option>
                    {institucionFinanciera.map(({InstitucionFinancieraID, Name})=>(
                      <option value={InstitucionFinancieraID}>{Name}</option>
                    ))}
                  </Input>
                </td>
                <td >
                  <Input
                    className="form-control form-control-sm"
                    value={values.LibretaNumber}
                    onChange={evt => {
                      let value = evt.currentTarget.value;
                      setValues({
                        ...values,
                        LibretaNumber: value,
                      });
                    }}
                    placeholder="Nro. Libreta"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>)}
      <div className="payment-block">
        <table className="table">
          <tbody>
            <tr>
              <td>Ahorro Plus</td>
              <td>
                {/* <Input
                  className="form-control form-control-sm"
                  type="number"
                  value={
                    values.AhorroPlus ? formatNumber(values.AhorroPlus) : ''
                  }
                  onChange={evt => {
                    let value = evt.currentTarget.value;
                    if ( value < 0) return;
                    handleChangeUF('AhorroPlus', value);
                  }}
                />*/}
                <div className="search-filter">
                  <span className="form-control form-control-sm" style={{ width: 120, height: 28 }}>
                    {values.AhorroPlus
                      ? formatNumber(values.AhorroPlus)
                      : ''
                    }
                  </span>
                </div>
              </td>
              <td>
                <Input
                  type="select"
                  className="form-control form-control-sm"
                  value={
                    percent.AhorroPlus ? percent.AhorroPlus : ''
                  }
                  onChange={evt => {
                    const value = evt.currentTarget.value;
                    handleChangePercent('AhorroPlus', value);
                  }}
                  disabled={apartmentTotalCost == 0}
                >
                  <option value="" />
                  <option value="5">5 %</option>
                  <option value="10">10 %</option>
                </Input>
              </td>
              <td style={{ width: '150px' }}>
                <Input
                  className="form-control form-control-sm"
                  type="number"
                  prefix="%"
                  value={values.AhorroPlus ? formatNumber(values.AhorroPlus*100/cost): ''}
                  readOnly
                />
              </td>
              <td>
                <div className="search-filter">
                  <IntlFormatCurrency
                    className="form-control form-control-sm"
                    style={{ width: 120 }}
                    value={convert.AhorroPlus}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

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
                      {pay ? <FormattedNumber value={pay} /> : null}
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
                      <FormattedNumber value={formatNumber(balance)} />
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
                      <FormattedNumber value={pay} />
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
      <Cuotas
        form={form}
        isOpen={openCuotas}
        onHide={() => setOpenCuotas(0)}
        onView={() => setOpenCuotas(2)}
        onEdit={() => setOpenCuotas(1)}
      />
    </>
  );
}

PhaseFormaDePagoForm.propTypes = {
  form: PropTypes.object,
};
export default PhaseFormaDePagoForm;
