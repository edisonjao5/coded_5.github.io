/* eslint-disable array-callback-return */
import {
  getDescendantProp,
  stringToBoolean,
  isCreditPayment,
} from 'containers/App/helpers';
import { calculates } from '../FormaDePago/helper';

export const isValidLabor = ( Values, PayType ) => {
  const Cliente = Values.Cliente;
  const isCompany = stringToBoolean(Cliente.IsCompany);
  const isCredit = isCreditPayment(PayType);

  const requiredFields = [
    'Empleador.RazonSocial',
    'Empleador.Rut',
    'Empleador.Extra.Phone',
    // 'Extra.Values.Honoraries',
  ];
  
  if (!isCompany && isCredit) {
    return requiredFields.find(
      field => ["", null].includes(getDescendantProp(Values, field))
    ) === undefined;
  }
  return true;
};

export const getInvalidLabor = ( Values ) => {
  const Cliente = Values.Cliente;
  const isCompany = stringToBoolean(Cliente.IsCompany);
  const isCredit = isCreditPayment(Values.PayType);

  const requiredFields = [
    'Empleador.RazonSocial',
    'Empleador.Rut',
    'Empleador.Extra.Phone',
    // 'Extra.Values.Honoraries',
  ];

  const inValidValues = [];
  if (!isCompany && isCredit) {
    requiredFields.forEach(
      field => {
        if(["", null].includes(getDescendantProp(Values, field))){
          if(field === "Empleador.RazonSocial") inValidValues.push("Nombre Empleador");
          else if(field === "Empleador.Rut") inValidValues.push("RUT Empleador");
          else inValidValues.push("Teléfono Empleador");
        }
      });
  }
  return inValidValues;
}

export const calculateRenta = (reserva = {}) => {
  const Cliente = reserva.Cliente || {};
  const Codeudor = reserva.Codeudor || {};
  const { Extra = { Values: {} } } = Cliente;
  const CoExtra = Codeudor.Extra || { Values: {} };
  if (Codeudor.Extra && !Codeudor.Extra.Values) Codeudor.Extra.Values = {};
  if (!Extra.Values) Extra.Values = {};

  const Renta =
    (parseInt(Extra.Values.LiquidIncome) || 0) +
    (parseInt(Extra.Values.VariableSalary) || 0) +
    (parseInt(Extra.Values.Honoraries) || 0) +
    (parseInt(Extra.Values.RealStateLeasing) || 0) +
    (parseInt(Extra.Values.Retirements) || 0) +
    (parseInt(Extra.Values.Pension) || 0);
  const CoRenta =
    (parseInt(CoExtra.Values.LiquidIncome) || 0) +
    (parseInt(CoExtra.Values.VariableSalary) || 0) +
    (parseInt(CoExtra.Values.Honoraries) || 0) +
    (parseInt(CoExtra.Values.RealStateLeasing) || 0) +
    (parseInt(CoExtra.Values.Retirements) || 0) +
    (parseInt(CoExtra.Values.Pension) || 0);
  const SumRenta = Renta + CoRenta;

  const { total, discount } = calculates(reserva);
  const moneyErr = Cliente.IsCompany ? false : Math.floor(total - discount) >= SumRenta;
  
  return {
    Renta,
    CoRenta,
    SumRenta,
    moneyErr,
  };
};
