/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Field as ExField } from 'components/ExForm';
import RadioGroup from 'components/ExForm/RadioGroup';
import { stringToBoolean } from 'containers/App/helpers';
import { RESERVA_STATE } from 'containers/App/constants';

const Labor = ({ group = 'Cliente', values, readOnly = false }) => {
  const { Extra, IsCompany } = values[group];

  let Empleador = group === 'Codeudor' ? 'CoEmpleador' : 'Empleador';
  // if (IsCompany) Empleador = 'EmpresaCompradora';
  if (IsCompany) return null;

  return (
    <div className="row pb-3">
      <div className="col-12">
        <div className="w-50 border-bottom pb-3 d-flex justify-content-between align-items-center">
          <span>
            <b>Antecedentes Laborales</b>
          </span>
          <span className="font-14 square-required square-required-caution">
            Campos Obligatorios
          </span>
        </div>
      </div>

      {!IsCompany && (
        <>
          <span className="font-14-rem color-main px-3 mt-3 col-12">
            <b>¿QUÉ TIPO DE EMPLEO TIENE?</b>
          </span>
          <div className="col-12 col-md-6 mb-3 mt-3">
            <div className="row">
              <RadioGroup
                name={`${group}.Extra.Independent`}
                options={[
                  { label: 'Contrato', value: 0 },
                  { label: 'Independiente', value: 1 },
                  { label: 'Otro', value: 2 },
                ]}
                readOnly={readOnly}
              />
            </div>
          </div>
          <FormGroup className="col-12 col-md-6 d-flex">
            <Label className="w-50 m-0">Cargo Actual Cliente</Label>
            <ExField
              className="w-50"
              name={`${Empleador}.Extra.CurrentPosition`}
              readOnly={readOnly}
            />
          </FormGroup>
          {!stringToBoolean(Extra.Independent) && (
            <>
              <span className="font-14-rem color-main px-3 mt-3 col-12">
                <b>¿DURANTE CUANTO TIEMPO?</b>
              </span>
              <FormGroup className="col-12 col-md-6 mt-3 d-flex">
                <Label className="w-50 m-0">Antigüedad Laboral</Label>
                <ExField
                  type="select"
                  name={`${Empleador}.Extra.Antiguedad`}
                  className="w-50"
                  disabled={readOnly}
                >
                  <option value="">Selecciona...</option>
                  <option value="1">Menos de un año</option>
                  <option value="2">1 año</option>
                  <option value="3">2 a 5 años</option>
                  <option value="4">6 o más años</option>
                </ExField>
              </FormGroup>
            </>
          )}
        </>
      )}
      <span className="font-14-rem color-main px-3 mt-3 col-12">
        <b>¿DÓNDE TRABAJA?</b>
      </span>
      <FormGroup className="col-12 col-md-6 d-flex mt-3">
        <Label className="w-50 m-0">Nombre Empleador</Label>
        <ExField
          className="w-50"
          name={`${Empleador}.RazonSocial`}
          required={values.ReservaState === RESERVA_STATE[0]}
          readOnly={readOnly}
        />
      </FormGroup>
      <FormGroup className="col-12 col-md-6 d-flex mt-3">
        <Label className="w-50 m-0">RUT Empleador</Label>
        <ExField
          className="w-50"
          name={`${Empleador}.Rut`}
          required={values.ReservaState === RESERVA_STATE[0]}
          readOnly={readOnly}
        />
      </FormGroup>
      {!IsCompany && (
        <FormGroup className="col-12 col-md-6 d-flex mt-3">
          <Label className="w-50 m-0">Teléfono Empleador</Label>
          <ExField
            className="w-50"
            name={`${Empleador}.Extra.Phone`}
            required
            placeholder="+562"
            readOnly={readOnly}
          />
        </FormGroup>
      )}
      <FormGroup className="col-12 col-md-6 d-flex mt-3">
        <Label className="w-50 m-0">Dirección Empleador</Label>
        <ExField
          className="w-50"
          name={`${
            IsCompany
              ? 'EmpresaCompradora.Address'
              : `${Empleador}.Extra.Address`
          }`}
          readOnly={readOnly}
        />
      </FormGroup>
    </div>
  );
};

Labor.propTypes = {
  group: PropTypes.string,
  values: PropTypes.object,
  readOnly: PropTypes.bool,
};
export default Labor;
