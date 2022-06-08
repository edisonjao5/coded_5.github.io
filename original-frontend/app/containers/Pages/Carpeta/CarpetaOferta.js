/**
 *
 * Carpeta Oferta
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import InitData from 'containers/Common/InitData';
import PageHeader from 'containers/Common/PageHeader';
import makeSelectInitProject from 'containers/Project/Init/selectors';
import makeSelectOfferForm from 'containers/Offer/Form/selectors';
import { getOffer } from 'containers/Offer/Form/actions';
import reducer from 'containers/Offer/Form/reducer';
import saga from 'containers/Offer/Form/saga';
import WithLoading from 'components/WithLoading';

import PdfTab from 'components/PdfTab';
const SyncMessage = WithLoading();

export function CarpetaOferta({ 
  projectID, OfertaID, selectorProject,
  selectorOffer, dispatch })
{
  useInjectReducer({ key: 'offerform', reducer });
  useInjectSaga({ key: 'offerform', saga });

  const { project = {} } = selectorProject;

  const { offer, loading } = selectorOffer;

  const documents = offer.Documents
  useEffect(() => {
    if (OfertaID) dispatch(getOffer(OfertaID));
  }, [OfertaID]);

  let content1=[], content2=[], content3=[];
  if (documents) {
    content1 = [
      // {title:'copia del cheque o transferencia de la reserva', url: documents.DocumentFirmadoCheques},
      {title:'Cédula de identidad del cliente', url: documents.DocumentCertificadoMatrimonio},
      {title:'Cotización', url: documents.DocumentFirmadoCotizacion},
      {title:'Oferta', url: documents.DocumentOfertaFirmada}
    ];
    content2 = [
      {title:'scoring (Simulador del crédito)', url: documents.DocumentSimulador},
      {title:'solicitud de preaprobación', url: documents.DocumentFichaPreAprobacion},
      {title:'liquidacione1', url: documents.DocumentLiquidacion1},
      {title:'liquidacione2', url: documents.DocumentLiquidacion2},
      {title:'liquidacione3', url: documents.DocumentLiquidacion3},
      {title:'Certificado de AFP', url: documents.DocumentCotizacionAFP}
    ];
    content3 = [
      {title:'Promesa de Compraventa y pólizas', url: documents.DocumentSimulador},
      {title:'Modificaciones de Promesa y Cesiones', url: documents.DocumentFichaPreAprobacion}
    ];
  }
  const tabs = [
    {label: 'Oferta', content: content1},
    {label: 'Crédito', content: content2},
    {label: 'Promesa', content: content3},
  ];

  return (
    <>
      <PageHeader header={['Proyectos', project.Name || '...']} />
      <Helmet title={`Oferta - ${project.Name || '...'}`} />
      <InitData Project={{ ProyectoID: projectID }} />
      <SyncMessage loading={loading} />
      {!loading && (<PdfTab tabs={tabs}/>)}
    </>
  );
}

CarpetaOferta.propTypes = {
  projectID: PropTypes.string,
  OfertaID: PropTypes.string,
  selectorProject: PropTypes.object,
  selectorReserva: PropTypes.object,
  dispatch: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
  selectorProject: makeSelectInitProject(),
  selectorOffer: makeSelectOfferForm(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CarpetaOferta);
