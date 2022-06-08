/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label } from 'components/ExForm';
import { Collapse, CollapseContent, CollapseHeader } from 'components/Collapse';
import IntlFormatNumber from 'components/IntlFormat/Number';
import RentaSummary from './RentaSummary';

const Renta = ({ group = 'Cliente', values }) => {
  const { IsCompany } = values[group];
  if(IsCompany) return null;
  
  return (
    <Collapse>
      <CollapseHeader>Renta</CollapseHeader>
      <CollapseContent>
        <div className="row pb-3">
          <span className="font-14-rem color-main px-3 mt-3 col-12">
            <b>¿CUÁL ES SU SUELDO?</b>
          </span>

          <FormGroup className="col-12 col-md-6 d-flex mt-3">
            <Label className="w-50 p-0">Sueldo Fijo Líquido</Label>
            <IntlFormatNumber
              value={values[group].Extra.Values.LiquidIncome}
              prefix="$"
            />
          </FormGroup>
          <FormGroup className="col-12 col-md-6 d-flex mt-3">
            <Label className="w-50 ">Sueldo Variable</Label>
            <IntlFormatNumber
              value={values[group].Extra.Values.VariableSalary}
              prefix="$"
            />
          </FormGroup>
          <FormGroup className="col-12 col-md-6 d-flex mt-3">
            <Label className="w-50 ">Honorarios Bruto</Label>
            <IntlFormatNumber
              value={values[group].Extra.Values.Honoraries}
              prefix="$"
            />
          </FormGroup>
        </div>
        <div className="row pb-3 border-top">
          <span className="font-14-rem color-main px-3 mt-3 col-12">
            <b>¿TIENE ALGUNA ENTRADA EXTRA DE DINERO?</b>
          </span>

          <FormGroup className="col-12 col-md-6 d-flex mt-3">
            <Label className="w-50">Arriendo Bienes Raíces</Label>
            <IntlFormatNumber
              value={values[group].Extra.Values.RealStateLeasing}
              prefix="$"
            />
          </FormGroup>
          <FormGroup className="col-12 col-md-6 d-flex mt-3">
            <Label className="w-50">Retiros</Label>
            <IntlFormatNumber
              value={values[group].Extra.Values.Retirements}
              prefix="$"
            />
          </FormGroup>
          <FormGroup className="col-12 offset-md-6 col-md-6 d-flex mt-3">
            <Label className="w-50">Pensión</Label>
            <IntlFormatNumber
              value={values[group].Extra.Values.Pension}
              prefix="$"
            />
          </FormGroup>
        </div>
        <RentaSummary group={group} values={values} />
      </CollapseContent>
    </Collapse>
  );
}

Renta.propTypes = {
  group: PropTypes.string,
  values: PropTypes.object,
};
export default Renta;
