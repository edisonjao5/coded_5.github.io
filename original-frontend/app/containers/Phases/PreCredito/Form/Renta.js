/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Field as ExField } from 'components/ExForm';
import RentaSummary from './RentaSummary';

const Renta = ({ group = 'Cliente', form, readOnly=false }) => {
  const { IsCompany } = form.values[group];
  if(IsCompany) return null;
  
  return (
    <>
      <div className="row pb-3 border-top">
        <h4 className="col-12">
          <span className="w-50 border-bottom py-3 d-block">Renta</span>
        </h4>

        <span className=" color-main px-3 mt-3 col-12">
          <b>¿CUÁL ES SU SUELDO?</b>
        </span>

        <FormGroup className="col-12 col-md-6 d-flex mt-3">
          <Label className="w-50 m-0 ">Sueldo Fijo Líquido</Label>
          <ExField
            className="w-50"
            name={`${group}.Extra.Values.LiquidIncome`}
            placeholder="$"
            type="number"
            readOnly = {readOnly}
          />
        </FormGroup>
        <FormGroup className="col-12 col-md-6 d-flex mt-3">
          <Label className="w-50 m-0 ">Sueldo Variable</Label>
          <ExField
            className="w-50"
            name={`${group}.Extra.Values.VariableSalary`}
            placeholder="$"
            type="number"
            readOnly = {readOnly}
          />
        </FormGroup>
        <FormGroup className="col-12 col-md-6 d-flex mt-3">
          <Label className="w-50 m-0 ">Honorarios Bruto</Label>
          <ExField
            className="w-50"
            name={`${group}.Extra.Values.Honoraries`}
            required
            placeholder="$"
            type="number"
            readOnly = {readOnly}
          />
        </FormGroup>
      </div>
      <div className="row pb-3 border-top">
        <span className=" color-main px-3 mt-3 col-12">
          <b>¿TIENE ALGUNA ENTRADA EXTRA DE DINERO?</b>
        </span>

        <FormGroup className="col-12 col-md-6 d-flex mt-3">
          <Label className="w-50 m-0 ">Arriendo Bienes Raíces</Label>
          <ExField
            className="w-50"
            name={`${group}.Extra.Values.RealStateLeasing`}
            placeholder="$"
            type="number"
            readOnly = {readOnly}
          />
        </FormGroup>
        <FormGroup className="col-12 col-md-6 d-flex mt-3">
          <Label className="w-50 m-0 ">Retiros</Label>
          <ExField
            className="w-50"
            name={`${group}.Extra.Values.Retirements`}
            placeholder="$"
            type="number"
            readOnly = {readOnly}
          />
        </FormGroup>
        <FormGroup className="col-12 offset-md-6 col-md-6 d-flex mt-3">
          <Label className="w-50 m-0 ">Pensión</Label>
          <ExField
            className="w-50"
            name={`${group}.Extra.Values.Pension`}
            placeholder="$"
            type="number"
            readOnly = {readOnly}
          />
        </FormGroup>
      </div>
      <RentaSummary
        group={group}
        form={form}
        addCodeudor={evt => {
          evt.preventDefault();
          form.setFieldValue('Codeudor', {
            UserID: "",
            Extra: {
              Values: {
                Honoraries: null,
              },
              Independent: false,
            },
          });
        }}
        canAddCodeudor={
          !form.values.Codeudor &&
          !form.values.Cliente.IsCompany &&
          group === 'Cliente'
        }
      />
    </>
  )
};

Renta.propTypes = {
  group: PropTypes.string,
  form: PropTypes.object,
  readOnly: PropTypes.bool,
};
export default Renta;
