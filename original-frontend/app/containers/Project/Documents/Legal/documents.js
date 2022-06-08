export const getDocuments = entregaInmediata => {
  let documents = [
    {
      documentoName: 'Maqueta Promesa Contado WORD',
      accept: 'word',
      documentoType: 'counter_word',
      required: true,
      // noExisteable: true,
    },
    {
      documentoName: 'Maqueta Promesa Contado PDF',
      accept: 'pdf',
      documentoType: 'counter_pdf',
      firmado: true,
      required: true,
      // noExisteable: true,
    },
    {
      documentoName: 'Maqueta Promesa Crédito WORD',
      accept: 'word',
      documentoType: 'credit_word',
      required: true,
      // noExisteable: true,
    },
    {
      documentoName: 'Maqueta Promesa Crédito PDF',
      accept: 'pdf',
      documentoType: 'credit_pdf',
      firmado: true,
      required: true,
      // noExisteable: true,
    },
    {
      documentoName: 'Maqueta Promesa Empresa WORD',
      accept: 'word',
      documentoType: 'company_word',
      required: true,
      // noExisteable: true,
    },
    {
      documentoName: 'Maqueta Promesa Empresa PDF',
      accept: 'pdf',
      documentoType: 'company_pdf',
      firmado: true,
      required: true,
      // noExisteable: true,
    },
    {
      documentoName: 'Contrato Corretaje',
      accept: 'image',
      documentoType: 'brokerage_contract',
      noExisteable: true,
      required: true,
    },
    {
      documentoName: 'Certificado de Dominio Vigente',
      accept: '*',
      documentoType: 'domain_certificate',
      required: true,
      // noExisteable: true,
    },
    {
      documentoName: 'Escritura de Sociedad',
      accept: '*',
      documentoType: 'company_deed',
      required: true,
      // noExisteable: true,
    },
    {
      documentoName: 'Listado de Precios Aprobado',
      accept: '*',
      documentoType: 'approved_price_list',
      firmado: true,
      required: true,
      // noExisteable: true,
    },
  ];
  return entregaInmediata ? 
          [...documents,
              {
                documentoName: 'Carpeta de Títulos',
                accept: '*',
                documentoType: 'title_folder',
                // noExisteable: true,
              }
          ]: 
          documents
};
