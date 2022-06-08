/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isObject } from 'lodash';
import { stringToBoolean } from 'containers/App/helpers';
import { FormGroup, Label, Field as ExField } from 'components/ExForm';
import PureRadioGroup from 'components/ExForm/PureRadioGroup';
import RadioGroup from 'components/ExForm/RadioGroup';
import IntlFormatCurrency from 'components/IntlFormat/Currency';

const CoPatrimony = ({ form, readOnly=false }) => {
  const { values, setFieldValue } = form;
  
  const [hasCredits, setHasCredits] = useState({
    RealState: !!values.CoPatrimony.RealState,
    CreditoHipotecario: !!values.CoPatrimony.CreditoHipotecario.PagosMensuales,
    Vehicle: !!values.CoPatrimony.Vehicle,
    DownPayment: !!values.CoPatrimony.DownPayment,
    Other: !!values.CoPatrimony.Other,
    CreditCard: !!values.CoPatrimony.CreditCard.PagosMensuales,
    CreditoConsumo: !!values.CoPatrimony.CreditoConsumo.PagosMensuales,
    PrestamoEmpleador: !!values.CoPatrimony.PrestamoEmpleador.PagosMensuales,
    DeudaIndirecta: !!values.CoPatrimony.DeudaIndirecta.PagosMensuales,
    AnotherCredit: !!values.CoPatrimony.AnotherCredit.PagosMensuales,
    CreditoComercio: !!values.CoPatrimony.CreditoComercio.PagosMensuales,
  });
  const totalActivos =
    (parseInt(values.CoPatrimony.RealState) || 0) +
    // values.CoPatrimony.CreditoHipotecario.PagosMensuales -
    (parseInt(values.CoPatrimony.Vehicle) || 0) +
    (parseInt(values.CoPatrimony.DownPayment) || 0) +
    (parseInt(values.CoPatrimony.Other) || 0);
  const totalPasivos =
    (parseInt(values.CoPatrimony.CreditoHipotecario.Pasivos) || 0) +
    (parseInt(values.CoPatrimony.CreditCard.Pasivos)  || 0) +
    (parseInt(values.CoPatrimony.CreditoConsumo.Pasivos)  || 0) +
    (parseInt(values.CoPatrimony.PrestamoEmpleador.Pasivos)  || 0) +
    (parseInt(values.CoPatrimony.DeudaIndirecta.Pasivos)  || 0) +
    (parseInt(values.CoPatrimony.AnotherCredit.Pasivos)  || 0)+
    (parseInt(values.CoPatrimony.CreditoComercio.Pasivos) || 0);

  const handleChangeHasCredits = evt => {
    const hasValue = stringToBoolean(evt.currentTarget.value);
    const { name } = evt.currentTarget;
    const new_name = name.slice(0, -2);

    if (!hasValue) {
      if (isObject(values.CoPatrimony[new_name])) {
        setFieldValue(`CoPatrimony.${new_name}`, {
          Pasivos: '',
          PagosMensuales: '',
        });
      } else {
        setFieldValue(`CoPatrimony.${new_name}`, '');
      }
    }

    setHasCredits({
      ...hasCredits,
      [new_name]: hasValue,
    });
  };

  return (
    <>
      <div className="row pb-3">
        <div className="col-12">
          <span className="w-50 border-bottom py-3 d-block">
            <b>Vivienda Actual</b>
          </span>
        </div>
        <div className="col-12 col-md-6 mt-3">
          <div className="row">
            <RadioGroup
              name="CoIsOwner"
              options={[
                { label: 'Propietario', value: '1' },
                { label: 'Arriendo', value: '0' },
              ]}              
              readOnly={readOnly}
            />
          </div>
        </div>
      </div>
      <div className="pb-3 mt-4 border-top">
        <span className="w-50 border-bottom py-3 d-block">
          <b>Patrimonio Activos</b>
        </span>
        <div className="mt-4 row">
          {stringToBoolean(values.CoIsOwner) && (
            <>
              <span className="font-14-rem color-main d-block col-12">
                <b>¿TIENE BIENES RAÍCES?</b>
              </span>
              <div className="mt-2 col-12">
                <PureRadioGroup
                  options={[
                    { label: 'Si', value: 1 },
                    { label: 'No', value: 0 },
                  ]}
                  name="RealState-1"
                  value={hasCredits.RealState}
                  onChange={handleChangeHasCredits}
                  disabled={readOnly}
                />
              </div>
              {hasCredits.RealState && (
                <>
                  <span className="mt-3 font-14-rem color-main d-block col-12">
                    <b>¿CUÁL ES EL VALOR DE LA PROPIEDAD?</b>
                  </span>
                  <FormGroup className="col-12 col-md-6 mt-2 ">
                    <Label style={{ minWidth: '12em' }}>Bienes Raíces</Label>
                    <ExField
                      className="ml-3 caution"
                      name="CoPatrimony.RealState"
                      type="currency"
                      required
                      readOnly={readOnly}
                    />
                  </FormGroup>
                </>
              )}
            </>
          )}
          {!stringToBoolean(values.CoIsOwner) && (
            <>
              <span className="mt-3 font-14-rem color-main d-block col-12">
                <b className="text-uppercase">¿Cuánto paga de arriendo?</b>
              </span>
              <FormGroup className="col-12 col-md-6 mt-2">
                <Label style={{ minWidth: '12em' }}>Monto Arriendo</Label>
                <ExField
                  className="ml-3 caution"
                  name="CoPatrimony.Rent"
                  type="currency"
                  required
                  readOnly={readOnly}
                />
              </FormGroup>
            </>
          )}
        </div>
        
        <div className="mt-4">
          <span className="font-14-rem color-main d-block">
            <b>¿TIENE VEHÍCULO?</b>
          </span>
          <div className="mt-2">
            <PureRadioGroup
              options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
              name="Vehicle-1"
              value={hasCredits.Vehicle}
              onChange={handleChangeHasCredits}
              disabled={readOnly}
            />
          </div>
          {hasCredits.Vehicle && (
            <>
              <span className="mt-3 font-14-rem color-main d-block">
                <b>¿CUÁL ES EL VALOR DEL AUTO?</b>
              </span>
              <FormGroup className="mt-2 d-flex ">
                <Label style={{ minWidth: '12em' }}>Vehículos</Label>
                <ExField
                  className="ml-3"
                  name="CoPatrimony.Vehicle"
                  type="currency"
                  required
                  readOnly={readOnly}
                />
              </FormGroup>
            </>
          )}
        </div>

        <div className="mt-4">
          <span className="font-14-rem color-main d-block">
            <b>¿TIENE DEPÓSITOS / ACCIONES?</b>
          </span>
          <div className="mt-2">
            <PureRadioGroup
              options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
              name="DownPayment-1"
              value={hasCredits.DownPayment}
              onChange={handleChangeHasCredits}
              disabled={readOnly}
            />
          </div>
          {hasCredits.DownPayment && (
            <>
              <span className="mt-3 font-14-rem color-main d-block">
                <b>¿CUÁL ES EL VALOR?</b>
              </span>
              <FormGroup className="mt-2 d-flex ">
                <Label style={{ minWidth: '12em' }}>Depósitos / Acciones</Label>
                <ExField
                  className="ml-3"
                  name="CoPatrimony.DownPayment"
                  type="currency"
                  required
                  readOnly={readOnly}
                />
              </FormGroup>
            </>
          )}
        </div>
        <div className="mt-4 row">
          <span className="font-14-rem color-main d-block col-12">
            <b>¿TIENE OTROS PATRIMONIOS?</b>
          </span>
          <div className="mt-2 col-12">
            <PureRadioGroup
              options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
              name="Other-1"
              value={hasCredits.Other}
              onChange={handleChangeHasCredits}
              disabled={readOnly}
            />
          </div>
          {hasCredits.Other && (
            <>
              <span className="mt-3 font-14-rem color-main d-block col-12">
                <b>¿CUÁL ES EL VALOR DE ESOS PATRIMONIOS?</b>
              </span>

              <FormGroup className="mt-2 col-12 col-md-6 ">
                <Label style={{ minWidth: '12em' }}>Otros</Label>
                <ExField
                  className="ml-3"
                  name="CoPatrimony.Other"
                  type="currency"
                  required
                  readOnly={readOnly}
                />
              </FormGroup>
            </>
          )}
        </div>
      </div>
      <div className="background-color-tab mt-2 px-2 font-18 rounded-lg">
        <table className="table table-responsive-md table-borderless">
          <tbody>
            <tr className="align-middle-group">
              <td>
                <span className="font-18 no-whitespace">Total Activos</span>
              </td>
              <td className="w-100">
                <span className="font-21 no-whitespace">
                  <b>
                    <IntlFormatCurrency value={totalActivos} />
                  </b>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="pb-3 mt-3 border-top">
        <span className="w-50 border-bottom py-3 d-block">
          <b>Patrimonio Pasivos</b>
        </span>
        {stringToBoolean(values.CoIsOwner) && (
          <div className="mt-4 row">
            <span className="font-14-rem color-main d-block col-12">
              <b>¿TIENE CRÉDITO HIPOTECARIO?</b>
            </span>
            <div className="mt-2 col-12">
              <PureRadioGroup
                options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
                name="CreditoHipotecario-1"
                value={hasCredits.CreditoHipotecario}
                onChange={handleChangeHasCredits}
                disabled={readOnly}
              />
            </div>
            {hasCredits.CreditoHipotecario && (
              <>
                <span className="mt-3 font-14-rem color-main d-block col-12">
                  <b>¿CUANTO PAGA DE CUOTA DE CRÉDITO?</b>
                </span>
                <FormGroup className="col-12 col-md-6 mt-2 ">
                  <Label style={{ minWidth: '12em' }}>
                    Crédito Hipotecario
                  </Label>
                  <ExField
                    className="ml-3"
                    name="CoPatrimony.CreditoHipotecario.PagosMensuales"
                    type="currency"
                    required
                    readOnly={readOnly}
                  />
                </FormGroup>
                <FormGroup className="col-12 col-md-6 mt-2">
                  <Label style={{ minWidth: '12em' }}>Deuda Total</Label>
                  <ExField
                    className="ml-3"
                    name="CoPatrimony.CreditoHipotecario.Pasivos"
                    type="currency"
                    required
                    readOnly={readOnly}
                  />
                </FormGroup>
              </>
            )}
          </div>
        )}
        <div className="mt-4 row">
          <span className="font-14-rem color-main d-block col-12">
            <b>¿TIENE TARJETA DE CRÉDITO?</b>
          </span>
          <div className="mt-2 col-12">
            <PureRadioGroup
              options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
              name="CreditCard-1"
              value={hasCredits.CreditCard}
              onChange={handleChangeHasCredits}
              disabled={readOnly}
            />
          </div>
          { hasCredits.CreditCard && (
            <>
              <span className="mt-3 font-14-rem color-main d-block col-12">
                <b>¿CUÁNTO PAGA MENSUAL?</b>
              </span>
              <FormGroup className="mt-2 col-12 col-md-6 ">
                <Label style={{ minWidth: '12em' }}>
                  Cuota Tarjeta de Crédito
                </Label>
                <ExField
                  className="ml-3"
                  name="CoPatrimony.CreditCard.PagosMensuales"
                  type="currency"
                  required
                  readOnly={readOnly}
                />
              </FormGroup>
              <FormGroup className="mt-2 col-12 col-md-6 ">
                <Label style={{ minWidth: '12em' }}>Deuda Total</Label>
                <ExField
                  className="ml-3"
                  name="CoPatrimony.CreditCard.Pasivos"
                  type="currency"
                  required
                  readOnly={readOnly}
                />
              </FormGroup>
            </>
          )}
        </div>

        <div className="mt-4 row">
          <span className="font-14-rem color-main d-block col-12">
            <b>¿TIENE CRÉDITOS DE CONSUMO?</b>
          </span>
          <div className="mt-2 col-12">
            <PureRadioGroup
              options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
              name="CreditoConsumo-1"
              value={hasCredits.CreditoConsumo}
              onChange={handleChangeHasCredits}
              disabled={readOnly}
            />
          </div>
          { hasCredits.CreditoConsumo && (
            <>
              <span className="mt-3 font-14-rem color-main d-block col-12">
                <b>¿CUÁNTO PAGA MENSUAL?</b>
              </span>

              <FormGroup className="mt-2 col-12 col-md-6 ">
                <Label style={{ minWidth: '12em' }}>
                  Cuota Créditos Consumo
                </Label>
                <ExField
                  className="ml-3"
                  name="CoPatrimony.CreditoConsumo.PagosMensuales"
                  type="currency"
                  required
                  readOnly={readOnly}
                />
              </FormGroup>

              <FormGroup className="mt-2 col-12 col-md-6 ">
                <Label style={{ minWidth: '12em' }}>Deuda Total</Label>
                <ExField
                  className="ml-3"
                  name="CoPatrimony.CreditoConsumo.Pasivos"
                  type="currency"
                  required
                  readOnly={readOnly}
                />
              </FormGroup>
            </>
          )}
        </div>

        <div className="mt-4 row">
          <span className="font-14-rem color-main d-block col-12">
            <b>¿TIENE PRÉSTAMOS CON SU EMPLEADOR?</b>
          </span>
          <div className="mt-2 col-12">
            <PureRadioGroup
              options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
              name="PrestamoEmpleador-1"
              value={hasCredits.PrestamoEmpleador}
              onChange={handleChangeHasCredits}
              disabled={readOnly}
            />
          </div>
          { hasCredits.PrestamoEmpleador && (
            <>
              <span className="mt-3 font-14-rem color-main d-block col-12">
                <b>¿CUÁNTO PAGA MENSUAL?</b>
              </span>

              <FormGroup className="mt-2 col-12 col-md-6 ">
                <Label style={{ minWidth: '12em' }}>
                  Cuota Préstamo Empleador
                </Label>
                <ExField
                  className="ml-3"
                  name="CoPatrimony.PrestamoEmpleador.PagosMensuales"
                  type="currency"
                  required
                  readOnly={readOnly}
                />
              </FormGroup>
              <FormGroup className="mt-2 col-12 col-md-6 ">
                <Label style={{ minWidth: '12em' }}>Deuda Total</Label>
                <ExField
                  className="ml-3"
                  name="CoPatrimony.PrestamoEmpleador.Pasivos"
                  type="currency"
                  required
                  readOnly={readOnly}
                />
              </FormGroup>
            </>
          )}
        </div>

        <div className="mt-4 row">
          <span className="font-14-rem color-main d-block col-12">
            <b>¿ES AVAL DE ALGUNA DEUDA?</b>
          </span>
          <div className="mt-2 col-12">
            <PureRadioGroup
              options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
              name="DeudaIndirecta-1"
              value={hasCredits.DeudaIndirecta}
              onChange={handleChangeHasCredits}
              disabled={readOnly}
            />
          </div>
          { hasCredits.DeudaIndirecta && (
            <>
              <span className="mt-3 font-14-rem color-main d-block col-12">
                <b>¿CUÁNTO PAGA MENSUAL?</b>
              </span>
              <FormGroup className="mt-2 col-12 col-md-6 ">
                <Label style={{ minWidth: '12em' }}>
                  Cuota Deuda como Aval
                </Label>
                <ExField
                  className="ml-3"
                  name="CoPatrimony.DeudaIndirecta.PagosMensuales"
                  type="currency"
                  required
                  readOnly={readOnly}
                />
              </FormGroup>
              <FormGroup className="mt-2 col-12 col-md-6 ">
                <Label style={{ minWidth: '12em' }}>Deuda Total</Label>
                <ExField
                  className="ml-3"
                  name="CoPatrimony.DeudaIndirecta.Pasivos"
                  type="currency"
                  required
                  readOnly={readOnly}
                />
              </FormGroup>
            </>
          )}
        </div>

        <div className="mt-4 row">
          <span className="font-14-rem color-main d-block col-12">
            <b className="text-uppercase">¿Otro crédito?</b>
          </span>
          <div className="mt-2 col-12">
            <PureRadioGroup
              options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
              name="AnotherCredit-1"
              value={hasCredits.AnotherCredit}
              onChange={handleChangeHasCredits}
              disabled={readOnly}
            />
          </div>
          { hasCredits.AnotherCredit && (
            <>
              <span className="mt-3 font-14-rem color-main d-block col-12">
                <b className="text-uppercase">¿Otro crédito?</b>
              </span>
              <FormGroup className="mt-2 col-12 col-md-6 ">
                <Label style={{ minWidth: '12em' }}>Valor</Label>
                <ExField
                  className="ml-3"
                  name="CoPatrimony.AnotherCredit.PagosMensuales"
                  type="currency"
                  required
                  readOnly={readOnly}
                />
              </FormGroup>
              <FormGroup className="mt-2 col-12 col-md-6 ">
                <Label style={{ minWidth: '12em' }}>Deuda Total</Label>
                <ExField
                  className="ml-3"
                  name="CoPatrimony.AnotherCredit.Pasivos"
                  type="currency"
                  required
                  readOnly={readOnly}
                />
              </FormGroup>
            </>
          )}
        </div>

        <div className="mt-4 row">
          <span className="font-14-rem color-main d-block col-12">
            <b>¿CREDITO COMERCIO?</b>
          </span>
          <div className="mt-2 col-12">
            <PureRadioGroup
              options={[{ label: 'Si', value: 1 }, { label: 'No', value: 0 }]}
              name="CreditoComercio-1"
              value={hasCredits.CreditoComercio}
              onChange={handleChangeHasCredits}
              disabled={readOnly}
            />
          </div>
          { hasCredits.CreditoComercio && (
            <>
              <span className="mt-3 font-14-rem color-main d-block col-12">
                <b>¿CREDITO COMERCIO?</b>
              </span>
              <FormGroup className="mt-2 col-12 col-md-6 ">
                <Label style={{ minWidth: '12em' }}>
                  Valor Crédito Comercio
                </Label>
                <ExField
                  className="ml-3"
                  name="CoPatrimony.CreditoComercio.PagosMensuales"
                  type="currency"
                  required
                  readOnly={readOnly}
                />
              </FormGroup>
              <FormGroup className="mt-2 col-12 col-md-6 ">
                <Label style={{ minWidth: '12em' }}>Deuda Total</Label>
                <ExField
                  className="ml-3"
                  name="CoPatrimony.CreditoComercio.Pasivos"
                  type="currency"
                  required
                  readOnly={readOnly}
                />
              </FormGroup>
            </>
          )}
        </div>
      </div>
      <div className="background-color-tab mt-2 px-2 font-18 rounded-lg">
        <table className="table table-responsive-md table-borderless">
          <tbody>
            <tr className="align-middle-group">
              <td>
                <span className="font-18 no-whitespace">Total Pasivos</span>
              </td>
              <td className="w-100">
                <span className="font-21 no-whitespace">
                  <b>
                    <IntlFormatCurrency value={totalPasivos} />
                  </b>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

CoPatrimony.propTypes = {
  form: PropTypes.object,
  readOnly: PropTypes.bool,
};
export default CoPatrimony;
