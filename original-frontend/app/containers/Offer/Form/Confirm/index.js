/**
 *
 * Offer Form
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import History from 'components/History';
import Log from 'components/Log';
import PhaseGeneral from 'containers/Phases/General';
import PhaseClient from 'containers/Phases/Client';
import PhaseInmueble from 'containers/Phases/Inmueble';
import PhaseFormaDePago from 'containers/Phases/FormaDePago';
import PhasePreCredito from 'containers/Phases/PreCredito';
import PhaseDocument from 'containers/Phases/Document';
import { push } from 'connected-react-router';
import ProjectPhases from 'containers/Common/ProjectPhases';
import model from '../../model';
import { getActionTitle } from '../../helper';
import { 
  deleteOffer, 
  confirmToClient,
  updateOffer,
  withdrawOffer
} from '../actions';
import OfferConfirmObservation from './Observation';
import OfferConfirmActions from './Actions';
import Steps from '../Steps';

export function OfferConfirm({ selector, dispatch }) {
  const { project = {} } = window;
  const entity = selector.offer;
  const initialValues = model({ project, entity });
  const onEdit = () =>
    dispatch(
      push(
        `/proyectos/${project.ProyectoID}/oferta/editar?OfertaID=${
        initialValues.OfertaID
        }`,
      ),
  );
  
  const [isHistoryOpen, setHistoryOpen] = useState(false);
  

  return (
    <>
      <ProjectPhases project={project} active="offer" />
      <Steps offer={selector.offer} />
      <div className="row m-0">
        <h4 className="col p-0 font-21 mt-3">
          {`${project.Name} / ${entity.Folio}`}
          <span className="general-phase"> - Oferta
            <i className="icon icon-z-info" title="This is Oferta."/>
          </span>
        </h4>
        <Button
          className="col-auto mt-3 m-btn-white m-btn-history"
          onClick={() => setHistoryOpen(true)}
        >
          Historial
        </Button>
        <Button
          className="col-auto mt-3 m-btn m-btn-pen"
          onClick={onEdit}
        >
          Modificación
        </Button>
      </div>
      <h5 className="mb-3 d-flex align-items-center justify-content-between">
        <span className="font-16-rem line-height-1 color-success">
          {getActionTitle(selector.offer)}
        </span>
      </h5>
      <OfferConfirmObservation
        entity={selector.offer}
        onChange={Condition =>
          dispatch(
            updateOffer({
              Condition,
            }),
          )
        }
      />
      <PhaseGeneral initialValues={initialValues} />
      <PhaseClient payType={entity.PayType} client={entity.Cliente} />
      <PhaseInmueble initialValues={initialValues} />
      <PhaseFormaDePago initialValues={initialValues} />
      <PhasePreCredito initialValues={initialValues} isCollapse={false} />
      <PhaseDocument entity={initialValues} isCollapse />
      <OfferConfirmActions
        entity={initialValues}
        selector={selector}
        onCancel={() =>
          dispatch(push(`/proyectos/${project.ProyectoID}/ofertas`))
        }
        onConfirm={(condtion) =>
          dispatch(
            confirmToClient({
              OfertaID: selector.offer.OfertaID,
              Conditions: condtion,
            }),
          )
        }
        onEdit={() =>
          dispatch(
            push(
              `/proyectos/${project.ProyectoID}/oferta/editar?OfertaID=${
                entity.OfertaID
              }`,
            ),
          )
        }
        onDelete={(comment) => dispatch(deleteOffer({...entity, Comment:comment}))}
        onWithdraw={(comment) => dispatch(withdrawOffer({...entity, Comment:comment}))}
      />
      <Log logs={selector.offer.Logs} limit={10} />
      {selector.offer && (
        <>          
          <History logs={selector.offer.Logs}
            onHide={()=>setHistoryOpen(false)}
            isOpen={isHistoryOpen}
            title={`${project.Name} / ${entity.Folio}`}
          />
        </>
      )}
    </>
  );
}

OfferConfirm.propTypes = {
  selector: PropTypes.object,
  dispatch: PropTypes.func,
};

export default OfferConfirm;
