import { stringToBoolean, isCreditPayment } from 'containers/App/helpers';

export const getDocuments = entity => {
  const isCompany = stringToBoolean(entity.Cliente.IsCompany);
  const isIndependent = stringToBoolean(entity.Cliente.Extra.Independent);
  // const hasProfesion = stringToBoolean(entity.Cliente.Ocupation);
  const hasProfesion = (entity.Cliente.Ocupation.trim() !== "");
  const hasTieneDeposito = entity.Patrimony.DownPayment !== 0;
  const hasTieneCredito = entity.Patrimony.CreditoConsumo.PagosMensuales !== 0;
  const hasVehicle = entity.Patrimony.Vehicle !== 0;
  const isOwner = entity.Patrimony.Rent == 0;

  const totalActivos =
    entity.Patrimony.RealState +
    // values.Patrimony.CreditoHipotecario.PagosMensuales +
    entity.Patrimony.Vehicle +
    entity.Patrimony.DownPayment +
    entity.Patrimony.Other;
  const totalPasivos =
    entity.Patrimony.CreditoHipotecario.Pasivos +
    entity.Patrimony.CreditCard.Pasivos +
    entity.Patrimony.CreditoConsumo.Pasivos +
    entity.Patrimony.PrestamoEmpleador.Pasivos +
    entity.Patrimony.DeudaIndirecta.Pasivos +
    entity.Patrimony.AnotherCredit.Pasivos +
    entity.Patrimony.CreditoComercio.Pasivos;

  let baseDocuments = [
    {
      documentoName: 'Transferencia',
      documentoType: 'DocumentPagoGarantia',
      required: true,
    },
    //offerta
    {
      documentoName: 'Cotizacion',
      documentoType: 'DocumentCotizacion',
      autoGenerate: true,
      offerta: true,
    },
    {
      documentoName: 'Oferta',
      documentoType: 'DocumentOferta',
      autoGenerate: true,
      offerta: true,
    },
    {
      documentoName: 'Cotizacion Firmada',
      accept: 'pdf',
      documentoType: 'DocumentFirmadoCotizacion',
      firmado: true,
      required: true,
      offerta: true,
    },
    {
      documentoName: 'Oferta Firmada',
      documentoType: 'DocumentOfertaFirmada',
      firmado: true,
      required: true,
      offerta: true,
    },
    {
      documentoName: 'Plano',
      documentoType: 'DocumentPlanoFirmada',
      firmado: true,
      required: true,
      offerta: true,
    },
    {
      documentoName: 'Ficha Pre-aprobacion',
      documentoType: 'DocumentFichaPreAprobacion',
      autoGenerate: true,
    },
    {
      documentoName: 'Simulación de crédito',
      documentoType: 'DocumentSimulador',
      autoGenerate: true,
    },
  ];

  if(isCreditPayment(entity.PayType)) {
    baseDocuments = [
      ...baseDocuments,
      {
        documentoName: 'Ficha Pre-aprobacion',
        documentoType: 'DocumentFirmadoFichaPreAprobacion',
        accept: 'pdf',
        firmado: true,
        required: true,
      },
    ];

    if(totalActivos>0)
      baseDocuments.push({
        documentoName: 'Acreditación de Activo',
        documentoType: 'DocumentAcredittacionActivo',
        required: true,
      });
  }

  if (!isCompany && entity.Cliente.CivilStatus === 'Casado(a)') {
    baseDocuments.push({
      documentoName: 'Certificado Matrimonio',
      documentoType: 'DocumentCertificadoMatrimonio',
      required: true,
      offerta: true,
    });
  }

  // Creditos
  if ( isCreditPayment(entity.PayType) ) {
    if (isCompany){ //Empresa Client
      baseDocuments = [
        ...baseDocuments,
        {
          documentoName: 'Constitucion de Sociedad',
          documentoType: 'DocumentConstitucionSociedad',
          // firmado: true,
          required: true,
        },
        {
          documentoName: 'Certificado de Vigencia de sociedad',
          accept: 'pdf',
          documentoType: 'DocumentCertificadoSociedad',
          required: true,
        },
        {
          documentoName: 'Carpeta Tributaria de Últimos Dos Años',
          documentoType: 'DocumentCarpetaTributaria',
          required: true,
        },
        {
          documentoName: '3 Últimos Balances Timbrados',
          documentoType: 'DocumentBalancesTimbrados',
          required: true,
        },
      ];
    }
    else //Personal Client
    {  
      if (isIndependent) // Independente
      { 
        baseDocuments = [
          ...baseDocuments,
          {
            documentoName: '6 Últimas boletas de homorarios o pagos IVA',
            documentoType: 'Document6IVA',
            required: true,
          },
          {
            documentoName: '2 Últimas declaraciones anuales de renta (DAI)',
            documentoType: 'Document2DAI',
            required: true,
          },
        ];
        
        if (hasTieneDeposito) {
          baseDocuments.push({
            documentoName: 'Acreditación de Ahorros (Vale Vista, Libreta de ahorro subsidio, etc.)',
            documentoType: 'DocumentAcredittacionAhorros',
          });
        }

        if (hasProfesion) {
          baseDocuments.push({
            documentoName: 'Fotocopia de Título Profesional',
            documentoType: 'DocumentTituloProfesional',
          });
        }

        if (hasTieneCredito)
          baseDocuments.push({
            documentoName: 'Acreditación de pago Deudas (crédito de consumo, deuda hipotecaria, pago de líneas de crédito, etc.)',
            documentoType: 'DocumentAcredittacionDeudas',
          });
      }
      else // Contrato
      {
        if(entity.Cliente.Extra.Values.LiquidIncome && entity.Cliente.Extra.Values.LiquidIncome != 0) {
          baseDocuments.push({
            documentoName: '3 ultimas liquidaciones de sueldo para renta fija',
            documentoType: 'DocumentLiquidacion1',
            required: true,
          });
        }
  
        if(entity.Cliente.Extra.Values.VariableSalary && entity.Cliente.Extra.Values.VariableSalary != 0) {
          baseDocuments.push({
            documentoName: '6 ultimas liquidaciones de sueldo para renta variable',
            documentoType: 'DocumentLiquidacion2',
            required: true,
          });
        }
  
        baseDocuments = [
          ...baseDocuments,
          {
            documentoName: '12 ultimas cotizaciones de AFP',
            documentoType: 'DocumentCotizacionAFP',
            required: true,
          },
          {
            documentoName: 'Certificado de antigüedad laboral',
            documentoType: 'DocumentCotizacionLaboral',
            required: true,
          }
        ];
  
        if(totalPasivos>0) {
          baseDocuments.push({
            documentoName: 'Acreditación de cuotas de crédito de consumo, deuda hipotecaria y l- íneas de créditos si corresponde',
            documentoType: 'DocumentAcredittacionCuotas',
            required: true,
          });
        }
  
        if (hasProfesion) {
          baseDocuments.push({
            documentoName: 'Fotocopia de Título Profesional',
            documentoType: 'DocumentTituloProfesional',
            required: true,
          });
        }
        
        if (hasVehicle) {
          baseDocuments.push({
            documentoName: 'Vehículos (Fotocopia del permiso de circulación)',
            documentoType: 'DocumentVehicle',
            required: true,
          });
        }

        if (isOwner) {
          baseDocuments.push({
            documentoName: 'Propiedades (Fotocopia de Escritura)',
            documentoType: 'DocumentPhotoEscritura',
            required: true,
          });
        }
      }
    }
  }

  if (!isCompany) {
    baseDocuments = [
      ...baseDocuments,
      {
        documentoName: 'Fotocopia Cédula de Indentidad',
        documentoType: 'DocumentFotocopiaCarnet',
        required: true,
        offerta: true,
      },      
    ];
  }

  return baseDocuments;
};

export const CodeudorDocuments = entity => {
  console.log("this is CodeudoDocuments:", entity);
  if (!entity.Codeudor) return [];
  
  const isCompany = stringToBoolean(entity.Codeudor.IsCompany);
  const isIndependent = stringToBoolean(entity.Codeudor.Extra.Independent);
  const hasProfesion = (entity.Codeudor.Ocupation.trim() !== "");
  const hasTieneDeposito = entity.Patrimony.DownPayment !== 0;
  const hasTieneCredito = entity.Patrimony.CreditoConsumo.PagosMensuales !== 0;
  const hasVehicle = entity.Patrimony.Vehicle !== 0;
  const isOwner = entity.Patrimony.Rent == 0;

  const totalActivos =
    entity.Patrimony.RealState +
    entity.Patrimony.Vehicle +
    entity.Patrimony.DownPayment +
    entity.Patrimony.Other;
  const totalPasivos =
    entity.Patrimony.CreditoHipotecario.Pasivos +
    entity.Patrimony.CreditCard.Pasivos +
    entity.Patrimony.CreditoConsumo.Pasivos +
    entity.Patrimony.PrestamoEmpleador.Pasivos +
    entity.Patrimony.DeudaIndirecta.Pasivos +
    entity.Patrimony.AnotherCredit.Pasivos +
    entity.Patrimony.CreditoComercio.Pasivos;

  let baseDocuments = [];

  if (!isCompany && entity.Codeudor.CivilStatus === 'Casado(a)') {
    baseDocuments.push({
      documentoName: 'Certificado Matrimonio',
      documentoType: 'DocumentCodeudorCertificadoMatrimonio',
      required: true
    });
  }

  // Creditos
  if ( isCreditPayment(entity.PayType) ) {
    if(totalActivos>0) {
      baseDocuments = [
        ...baseDocuments,
        {
          documentoName: 'Acreditación de Activo',
          documentoType: 'DocumentCodeudorAcredittacionActivo',
          required: true,
        },
      ];
    }

    if (isCompany){ //Empresa Client
      baseDocuments = [
        ...baseDocuments,
        {
          documentoName: 'Constitucion de Sociedad',
          documentoType: 'DocumentCodeudorConstitucionSociedad',
          required: true,
        },
        {
          documentoName: 'Certificado de Vigencia de sociedad',
          accept: 'pdf',
          documentoType: 'DocumentCodeudorCertificadoSociedad',
          required: true,
        },
        {
          documentoName: 'Carpeta Tributaria de Últimos Dos Años',
          documentoType: 'DocumentCodeudorCarpetaTributaria',
          required: true,
        },
        {
          documentoName: '3 Últimos Balances Timbrados',
          documentoType: 'DocumentCodeudorBalancesTimbrados',
          required: true,
        },
      ];
    }
    else //Personal Client
    {  
      if (isIndependent) // Independente
      { 
        baseDocuments = [
          ...baseDocuments,
          {
            documentoName: '6 Últimas boletas de homorarios o pagos IVA',
            documentoType: 'DocumentCodeudor6IVA',
            required: true,
          },
          {
            documentoName: '2 Últimas declaraciones anuales de renta (DAI)',
            documentoType: 'DocumentCodeudor2DAI',
            required: true,
          },
        ];
        
        if (hasTieneDeposito) {
          baseDocuments.push({
            documentoName: 'Acreditación de Ahorros (Vale Vista, Libreta de ahorro subsidio, etc.)',
            documentoType: 'DocumentCodeudorAcredittacionAhorros',
          });
        }

        if (hasProfesion) {
          baseDocuments.push({
            documentoName: 'Fotocopia de Título Profesional',
            documentoType: 'DocumentCodeudorTituloProfesional',
          });
        }

        if (hasTieneCredito) {
          baseDocuments.push({
            documentoName: 'Acreditación de pago Deudas (crédito de consumo, deuda hipotecaria, pago de líneas de crédito, etc.)',
            documentoType: 'DocumentCodeudorAcredittacionDeudas',
          });
        }
      }
      else // Contrato
      {
        if(entity.Codeudor.Extra.Values.LiquidIncome && entity.Codeudor.Extra.Values.LiquidIncome != 0) {
          baseDocuments.push({
            documentoName: '3 ultimas liquidaciones de sueldo para renta fija',
            documentoType: 'DocumentCodeudorLiquidacion1',
            required: true,
          });
        }

        if(entity.Codeudor.Extra.Values.VariableSalary && entity.Codeudor.Extra.Values.VariableSalary != 0) {
          baseDocuments.push({
            documentoName: '6 ultimas liquidaciones de sueldo para renta variable',
            documentoType: 'DocumentCodeudorLiquidacion2',
            required: true,
          });
        }

        baseDocuments = [
          ...baseDocuments,
          {
            documentoName: '12 ultimas cotizaciones de AFP',
            documentoType: 'DocumentCodeudorCotizacionAFP',
            required: true,
          },
          {
            documentoName: 'Certificado de antigüedad laboral',
            documentoType: 'DocumentCodeudorCotizacionLaboral',
            required: true,
          }
        ];

        if(totalPasivos>0) {
          baseDocuments.push({
            documentoName: 'Acreditación de cuotas de crédito de consumo, deuda hipotecaria y l- íneas de créditos si corresponde',
            documentoType: 'DocumentCodeudorAcredittacionCuotas',
            required: true,
          });
        }

        if (hasProfesion) {
          baseDocuments.push({
            documentoName: 'Fotocopia de Título Profesional',
            documentoType: 'DocumentCodeudorTituloProfesional',
            required: true,
          });
        }
        
        if (hasVehicle) {
          baseDocuments.push({
            documentoName: 'Vehículos (Fotocopia del permiso de circulación)',
            documentoType: 'DocumentCodeudorVehicle',
            required: true,
          });
        }

        if (isOwner) {
          baseDocuments.push({
            documentoName: 'Propiedades (Fotocopia de Escritura)',
            documentoType: 'DocumentCodeudorPhotoEscritura',
            required: true,
          });
        }
      }
    }
  }

  if (!isCompany) {
    baseDocuments = [
      ...baseDocuments,
      {
        documentoName: 'Fotocopia Cédula de Indentidad',
        documentoType: 'DocumentCodeudorFotocopiaCarnet',
        required: true
      }    
    ];
  }

  return baseDocuments;
};

export const requiredSaveDocuments = [  
  'DocumentPagoGarantia',
  'DocumentOfertaFirmada',
  'DocumentFirmadoCotizacion',
  'DocumentPlanoFirmada',
  'DocumentFirmadoFichaPreAprobacion',
  'DocumentFotocopiaCarnet', 'DocumentCodeudorFotocopiaCarnet',
]
  
export const requiredSendToControl = [
  'DocumentCotizacionAFP', 'DocumentCodeudorCotizacionAFP',
  'Document6IVA', 'DocumentCodeudor6IVA',
  'Document2DAI', 'DocumentCodeudor2DAI',
  'DocumentAcredittacionAhorros', 'DocumentCodeudorAcredittacionAhorros',
  'DocumentTituloProfesional', 'DocumentCodeudorTituloProfesional',
  'DocumentCertificadoMatrimonio', 'DocumentCodeudorCertificadoMatrimonio',
  'DocumentConstitucionSociedad', 'DocumentCodeudorConstitucionSociedad',
  'DocumentCertificadoSociedad', 'DocumentCodeudorCertificadoSociedad',
  'DocumentCarpetaTributaria', 'DocumentCodeudorCarpetaTributaria',
  'DocumentBalancesTimbrados', 'DocumentCodeudorBalancesTimbrados',
  'DocumentCotizacionLaboral',  'DocumentCodeudorCotizacionLaboral',
  'DocumentAcredittacionCuotas', 'DocumentCodeudorAcredittacionCuotas',
  'DocumentVehicle', 'DocumentCodeudorVehicle',
  'DocumentPhotoEscritura', 'DocumentCodeudorPhotoEscritura',
  'DocumentLiquidacion1', 'DocumentCodeudorLiquidacion1',
  'DocumentLiquidacion2', 'DocumentCodeudorLiquidacion2',
]