import { Auth } from 'containers/App/helpers';

export default function model({ project = {}, entity = {} }) {
  const { quotationUtils, paymentUtils } = window.preload;

  const initialModel = {
    ProyectoID: project.ProyectoID,
    ContactMethodTypeID: entity.ContactMethodTypeID || null,
    Inmuebles: entity.Inmuebles || [],
    Vendedor: entity.Vendedor || Auth.get('user'),
    VendedorID: entity.VendedorID || Auth.get('user_id'),
    UserID: '',
    Cliente: {
      UserID: (entity.Cliente || {}).UserID || '',
      FindingTypeID: (entity.Cliente || {}).FindingTypeID || '',
      ...(entity.Cliente || {}),
    },
    CotizacionType:
      entity.CotizacionType ||
      entity.CotizacionTypeID ||
      quotationUtils.CotizacionTypes[0].Name ||
      '',
    IsNotInvestment: entity.IsNotInvestment || '',
    CotizacionState: entity.CotizacionState || '',
    PayType: entity.PayType || paymentUtils[0].PayTypeID,
    Cuotas: entity.Cuotas || [],
    PaymentFirmaPromesa: entity.PaymentFirmaPromesa || 0,
    PaymentFirmaEscritura: entity.PaymentFirmaEscritura || 0,
    PaymentInstitucionFinanciera: entity.PaymentInstitucionFinanciera || 0,
    AhorroPlus: entity.AhorroPlus || 0,
    Subsidio: entity.Subsidio || 0,
    Libreta: entity.Libreta || 0,
    InstitucionFinancieraID: entity.InstitucionFinancieraID || '',
    DateFirmaPromesa: entity.DateFirmaPromesa || new Date(),
    DiscountMaxPercent: parseFloat(project.DiscountMaxPercent) || 100,
    IsSubsidy: project.IsSubsidy || false,
    step: 1,
    MaxCuotas: project.MaxCuotas,
  };
  if (initialModel.Cuotas.length < 1)
    initialModel.Cuotas.push({
      Amount: 0,
      Date: new Date(),
      Observacion: '',
    });
  return initialModel;
}
