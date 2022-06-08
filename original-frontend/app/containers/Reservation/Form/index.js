/* eslint-disable no-unused-vars */
/**
 *
 * Reservation Form
 *
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import InitData from 'containers/Common/InitData';
import { Helmet } from 'react-helmet';
import PageHeader from 'containers/Common/PageHeader';
import makeSelectInitProject from 'containers/Project/Init/selectors';
import { UserProject } from 'containers/Project/helper';
import ProjectPhases from 'containers/Common/ProjectPhases';
import { RESERVA_STATE } from 'containers/App/constants';
import WithLoading from 'components/WithLoading';
import Button from 'components/Button';
import makeSelectReservationForm from './selectors';
import Form from './Form';
import reducer from './reducer';
import saga from './saga';
import { getActionTitle } from './helper';
import {
  getQuotation,
  getReservation,
  resetContainer,
  updateReservation,
} from './actions';
import Steps from './Steps';
import ReservationCreation from './Creation';
const SyncMessage = WithLoading();
import History from 'components/History';

export function ReservationForm({
  match,
  selectorProject,
  selector,
  dispatch,
  location,
}) {
  useInjectReducer({ key: 'reservationform', reducer });
  useInjectSaga({ key: 'reservationform', saga });
  const query = queryString.parse(location.search);
  const { CotizacionID, ReservaID } = query;
  const { project } = selectorProject;
  const { Folio = '' } = selector.reservation;
  useEffect(() => {
    if (ReservaID) dispatch(getReservation(ReservaID));
    else if (CotizacionID) dispatch(getQuotation(CotizacionID));
    else dispatch(updateReservation({ ProyectoID: project.ProyectoID }));
    return () => dispatch(resetContainer());
  }, [location.search]);

  const [isHistoryOpen, setHistoryOpen] = useState(false);

  if (selector.success && selector.redirect) {
    return <Redirect to={`/proyectos/${project.ProyectoID}/reservas`} />;
  }
  if (!ReservaID && selector.reservation.ReservaID) {
    return (
      <Redirect
        to={`${location.pathname}?ReservaID=${selector.reservation.ReservaID}`}
      />
    );
  }

  return (
    <>
      <Helmet title={`Reserva - ${project.Name || '...'}`} />
      <PageHeader header={['Proyectos', project.Name || '...']} />
      <InitData
        User
        Project={{ ProyectoID: match.params.id }}
        Client
        Inmueble={{ ProyectoID: match.params.id }}
      />
      {!(project && selector.reservation) && <SyncMessage loading />}
      {project && selector.reservation && (
        <>
          <ProjectPhases project={project} active="reservation" />
          <Steps reservation={selector.reservation} />
          <div className="row m-0">
            <h4 className="col p-0 font-21 mt-3">
              {project.Name} {Folio ? ` / ${Folio}` : ''}
              <span className="general-phase"> - {selector.reservation.ReservaState!=RESERVA_STATE[2] && selector.reservation.OfertaID ? 'Modificación Oferta' : 'Reserva'}
                <i className="icon icon-z-info" title="This is Reserva."/>
              </span>
            </h4>
            { !UserProject.isInmobiliario() &&
              <Button 
                className="col-auto mt-3 m-btn-white m-btn-history"
                onClick={()=> setHistoryOpen(true)}
              >
                Historial
              </Button>
            }
          </div>
          <h5 className="mb-3 d-flex align-items-center justify-content-between">
            <span className="font-16-rem line-height-1 color-success">
              {getActionTitle(selector.reservation)}
            </span>
          </h5>
          {!CotizacionID && !ReservaID && (
            <ReservationCreation selector={selector} dispatch={dispatch} />
          )}
          {(ReservaID || CotizacionID) && Folio && (
            <Form project={project} selector={selector} dispatch={dispatch} />
          )}
          {selector.reservation && (
            <History logs={selector.reservation.Logs} 
                     onHide={()=>setHistoryOpen(false)}
                     isOpen={isHistoryOpen}
                     title={ project.Name + (Folio ? ` / ${Folio}`:'') }
            />
          )}
        </>
      )}
    </>
  );
}

ReservationForm.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  selector: PropTypes.object,
  selectorProject: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectReservationForm(),
  selectorProject: makeSelectInitProject(),
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

export default compose(withConnect)(ReservationForm);
