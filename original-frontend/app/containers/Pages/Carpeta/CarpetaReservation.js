/**
 *
 * Create Project
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
import makeSelectReservationForm from 'containers/Reservation/Form/selectors';
import reducer from 'containers/Reservation/Form/reducer';
import saga from 'containers/Reservation/Form/saga';
import { getReservation } from 'containers/Reservation/Form/actions';
import WithLoading from 'components/WithLoading';

import PdfTab from 'components/PdfTab';
const SyncMessage = WithLoading();

export function CarpetaReservation({ 
  projectID, ReservaID, selectorProject,
  selectorReserva, dispatch })
{
  useInjectReducer({ key: 'reservationform', reducer });
  useInjectSaga({ key: 'reservationform', saga });

  const { project = {} } = selectorProject;
  const { reservation, loading } = selectorReserva;

  const documents = reservation.Documents
  
  useEffect(() => {
    if (ReservaID) dispatch(getReservation(ReservaID));
  }, [ReservaID]);

  let content1=[], content2=[], content3=[];
  if (documents) {
    content1 = [
      // {title:'copia del cheque o transferencia de la reserva', url: documents.DocumentFirmadoCheques},
      {title:'Cédula de identidad del cliente', url: documents.DocumentFotocopiaCarnet},
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

CarpetaReservation.propTypes = {
  projectID: PropTypes.string,
  ReservaID: PropTypes.string,
  selectorProject: PropTypes.object,
  selectorReserva: PropTypes.object,
  dispatch: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
  selectorProject: makeSelectInitProject(),
  selectorReserva: makeSelectReservationForm(),
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

export default compose(withConnect)(CarpetaReservation);
