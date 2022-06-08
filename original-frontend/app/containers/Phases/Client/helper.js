import { stringToBoolean, getDescendantProp } from 'containers/App/helpers';
import { isContadoType } from '../FormaDePago/helper';

export const isValidClient = ({ Cliente, Codeudor = null, PayType, CotizacionType }) => {
  const isCompany = stringToBoolean(Cliente.IsCompany);
  const isCompany_Codeudor = Codeudor ? stringToBoolean(Codeudor.IsCompany) : false;

  const requiredOfCompany = [
    'Rut',
    'Name',
    'ReprenetanteLegal',
    'GiroEmpresa',
    'Contact.0.Value',
  ];
  const requiredOfPersonal = [
    'Rut',
    'Name',
    'LastNames',
    'Ocupation',
    'BirthDate',
    'Genre',
    'CivilStatus',
    'Carga',
    'Nationality',
    'Contact.0.Value',
  ];
  
  if (!isContadoType(PayType)) {
    requiredOfPersonal.push(
      ...['Position', 'Extra.SalaryRank', 'Antiquity', 'TotalPatrimony'],
    );
  }

  if (CotizacionType !== window.preload.quotationUtils.CotizacionTypes[1].Name)
    requiredOfPersonal.push('ComunaID');

  const client_valid = isCompany  
    ? !requiredOfCompany.find(field => getDescendantProp(Cliente, field) === '', )
    : !requiredOfPersonal.find(field => getDescendantProp(Cliente, field) === '', );
  
  if( Codeudor == null ) return client_valid;

  const codeudor_valid = isCompany_Codeudor
    ? !requiredOfCompany.find(field => getDescendantProp(Codeudor, field) === '', )
    : !requiredOfPersonal.find(field => getDescendantProp(Codeudor, field) === '', );

  return client_valid && codeudor_valid;
};
