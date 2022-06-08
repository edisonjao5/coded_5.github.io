/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label } from 'components/ExForm';
import { stringToBoolean } from 'containers/App/helpers';
import { Collapse, CollapseContent, CollapseHeader } from 'components/Collapse';

const Labor = ({ group = 'Cliente', values }) => {
  const { Extra, IsCompany } = values[group];

  let Empleador = (group === 'Codeudor') ? 'CoEmpleador' : 'Empleador';
  // if (IsCompany) Empleador = 'EmpresaCompradora';
  if (IsCompany) return null;

  return (
    <Collapse>
      <CollapseHeader>Antecedentes Laborales</CollapseHeader>
      <CollapseContent>
        <div className="row pb-3">
          {!IsCompany && (
            <>
              <span className="font-14-rem color-main px-3 mt-3 col-12">
                <b>¿QUÉ TIPO DE EMPLEO TIENE?</b>
              </span>
              <div className="col-12 col-md-6 mb-3 mt-3">
                {stringToBoolean(Extra.Independent) ? 'Independiente' : 'Contrato'}
              </div>
              <FormGroup className="col-12 col-md-6">
                <Label className="w-50 ">Cargo Actual Cliente</Label>
                <span className="font-14-rem">{Extra.CurrentPosition}</span>
              </FormGroup>
              {!stringToBoolean(Extra.Independent) && (
                <>
                  <span className="font-14-rem color-main px-3 mt-3 col-12">
                    <b>¿DURANTE CUANTO TIEMPO?</b>
                  </span>
                  <FormGroup className="col-12 col-md-6 mt-3 d-flex">
                    <Label className="w-50 ">Antigüedad Laboral</Label>
                    <span>{Extra.Antiguedad}</span>
                  </FormGroup>
                </>
              )}
            </>
          )}
          <span className="font-14-rem color-main px-3 mt-3 col-12">
            <b>¿DÓNDE TRABAJA?</b>
          </span>
          <FormGroup className="col-12 col-md-6 d-flex mt-3">
            <Label className="w-50">Nombre Empleador</Label>
            <span>{values[Empleador] ? values[Empleador].RazonSocial : ""}</span>
          </FormGroup>
          <FormGroup className="col-12 col-md-6 d-flex mt-3">
            <Label className="w-50 ">RUT Empleador</Label>
            <span>{values[Empleador] ? values[Empleador].Rut: ''}</span>
          </FormGroup>
          {!IsCompany && (
            <FormGroup className="col-12 col-md-6 d-flex mt-3">
              <Label className="w-50">Teléfono Empleador</Label>
              <span>{values[Empleador] ? values[Empleador].Extra.Phone : ''}</span>
            </FormGroup>
          )}
          <FormGroup className="col-12 col-md-6 d-flex mt-3">
            <Label className="w-50 ">Dirección Empleador</Label>
            <span>{`${
              IsCompany
                ? values.EmpresaCompradora.Address
                : values[Empleador] ? values[Empleador].Extra.Address: ''
            }`}</span>
          </FormGroup>
        </div>
      </CollapseContent>
    </Collapse>
  );
};

Labor.propTypes = {
  group: PropTypes.string,
  values: PropTypes.object,
};
export default Labor;
