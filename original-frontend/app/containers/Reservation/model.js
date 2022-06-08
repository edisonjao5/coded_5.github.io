import moment from 'components/moment';
import { Auth } from '../App/helpers';

export default function model({ project = {}, entity = {} }) {
  const { Cuotas = [] } = entity;
  if (Cuotas.length < 1)
    Cuotas.push({
      Amount: 0,
      Date: new Date(),
      Observacion: '',
    });

  return {
    ReservaID: entity.ReservaID || null,
    ReservaState: entity.ReservaState || null,
    ValueProductoFinanciero: entity.ValueProductoFinanciero || 0,
    Condition: entity.Condition || [],
    CotizacionID: entity.CotizacionID || null,
    ProyectoID: project.ProyectoID,
    Folio: entity.Folio,

    EmpresaCompradora: entity.EmpresaCompradora || {
      Rut: '',
      RazonSocial: '',
      Address: '',
    },
    Documents: entity.Documents || {},
    IsOwner: !(entity.Patrimony && entity.Patrimony.Rent),
    CoIsOwner: !(entity.CoPatrimony && entity.CoPatrimony.Rent),
    Patrimony: entity.Patrimony || {
      RealState: '',
      Rent: '',
      CreditoHipotecario: {
        Pasivos: '',
        PagosMensuales: '',
        Saldo: '',
      },
      Vehicle: '',
      DownPayment: '',
      Other: '',
      CreditCard: {
        Pasivos: '',
        PagosMensuales: '',
        Saldo: '',
      },
      CreditoConsumo: {
        Pasivos: '',
        PagosMensuales: '',
        Saldo: '',
      },
      PrestamoEmpleador: {
        Pasivos: '',
        PagosMensuales: '',
        Saldo: '',
      },
      DeudaIndirecta: {
        Pasivos: '',
        PagosMensuales: '',
        Saldo: '',
      },
      AnotherCredit: {
        Pasivos: '',
        PagosMensuales: '',
        Saldo: '',
      },
      CreditoComercio: {
        Pasivos: '',
        PagosMensuales: '',
        Saldo: '',
      },
    },
    ContactMethodTypeID: entity.ContactMethodTypeID || null,
    ContactMethodType: entity.ContactMethodType || null,
    Inmuebles: entity.Inmuebles || [],
    VendedorID: entity.VendedorID || Auth.get('user_id'),
    Vendedor: entity.Vendedor || Auth.get('user'),
    UserID: null,
    ClienteID: entity.ClienteID || '',
    Cliente: {
      UserID: (entity.Cliente || {}).UserID || '',
      // FindingTypeID: (entity.Cliente || {}).FindingTypeID || null,
      InterestedTypeID: (entity.Cliente || {}).InterestedTypeID || null,
      ...(entity.Cliente || {}),
      Extra: {
        Values: {
          Honoraries:(((entity.Cliente || {}).Extra || {}).Values || {}).Honoraries || null,
        },
        Independent: ((entity.Cliente || {}).Extra || {}).Independent || 0,
        ...((entity.Cliente || {}).Extra || {}),
      },
    },
    Empleador: entity.Empleador || {
      Rut: '',
      RazonSocial: '',
      Extra: { Address: '', CurrentPosition: '', Phone: '' },
    },
    CodeudorID: entity.CodeudorID || null,
    Codeudor: entity.Codeudor || null,
    CoEmpleador: entity.CoEmpleador || {
      Rut: '',
      RazonSocial: '',
      Extra: { Address: '', CurrentPosition: '', Phone: '' },
    },
    CoPatrimony: entity.CoPatrimony || {
        RealState: '',
        Rent: '',
        CreditoHipotecario: { Pasivos: '', PagosMensuales: '', Saldo: '' },
        Vehicle: '',
        DownPayment: '',
        Other: '',
        CreditCard: { Pasivos: '', PagosMensuales: '', Saldo: '' },
        CreditoConsumo: { Pasivos: '', PagosMensuales: '', Saldo: '' },
        PrestamoEmpleador: { Pasivos: '', PagosMensuales: '',Saldo: '' },
        DeudaIndirecta: { Pasivos: '',PagosMensuales: '',Saldo: ''},
        AnotherCredit: { Pasivos: '',PagosMensuales: '',Saldo: ''},
        CreditoComercio: { Pasivos: '',PagosMensuales: '',Saldo: ''},
      },
    CotizacionType:
      entity.CotizacionType ||
      window.preload.quotationUtils.CotizacionTypes[0].Name,
    IsNotInvestment: (entity.IsNotInvestment ? '1' : '0') || "",
    CotizacionStateID: entity.CotizacionStateID || '',
    PayType: entity.PayType || window.preload.paymentUtils[0].PayTypeID,
    Cuotas,
    printCuotas: entity.printCuotas || Cuotas,
    PaymentFirmaPromesa: entity.PaymentFirmaPromesa || 0,
    PaymentFirmaEscritura: entity.PaymentFirmaEscritura || 0,
    PaymentInstitucionFinanciera: entity.PaymentInstitucionFinanciera || 0,
    AhorroPlus: entity.AhorroPlus || 0,
    Subsidio: entity.Subsidio || 0,
    SubsidioType: entity.SubsidioType || "",
    SubsidioCertificado: entity.SubsidioCertificado || "",
    Libreta: entity.Libreta || 0,
    LibretaNumber: entity.LibretaNumber || "",    
    InstitucionFinancieraID: entity.InstitucionFinancieraID || "",
    DateFirmaPromesa: entity.DateFirmaPromesa
      ? moment(entity.DateFirmaPromesa).format()
      : new Date(),
    percent: entity.percent || {},
    convert: entity.convert || {},
    confirmes: {
      general: false,
      client: false,
      inmueble: false,
      forma: false,
    },
    IsSubsidy: project.IsSubsidy || false,
    MaxCuotas: project.MaxCuotas,
    sendControl: false,
    OfertaID: entity.OfertaID
  };
}
