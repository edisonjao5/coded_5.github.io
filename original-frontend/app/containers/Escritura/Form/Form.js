/**
 *
 * Escritura Form
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import FileSaver from 'file-saver';

import { Auth } from 'containers/App/helpers';
import InitData from 'containers/Common/InitData';
import ProjectPhases from 'containers/Common/ProjectPhases';
// import { isCreditPayment } from 'containers/App/helpers';
import { getEscrituraAction } from 'containers/App/constants';
import { UserProject } from 'containers/Project/helper';
import Log from 'components/Log';
import History from 'components/History';
import Button from 'components/Button';
import WithLoading from 'components/WithLoading';
const SyncMessage = WithLoading();

import { 
  checkPromesa,
  notificarCompradores,
  aprobaHipotecarios,
  checkHipotecarios,
  aprovaBank,
  updateSale,
} from './actions';

import Steps from './Steps';

import PhaseGeneral from 'containers/Phases/General';
import PhaseClient from 'containers/Phases/Client';
import PhaseInmueble from 'containers/Phases/Inmueble';
import PhaseFormaDePago from 'containers/Phases/FormaDePago';
import PhasePreCredito from 'containers/Phases/PreCredito';
import PhaseDocument from 'containers/Phases/Document';
import PhaseTimeline from 'containers/Phases/Promesa/Timeline';
import RevisionPromesa from 'containers/Phases/Escritura/RevisionPromesa';
import NotificacionComprado from 'containers/Phases/Escritura/NotificacionComprado';
import AprobaHipotecarios from 'containers/Phases/Escritura/AprobaHipotecarios';
import TasacionesBancarias from 'containers/Phases/Escritura/TasacionesBancarias';
import RevisionMatriz from 'containers/Phases/Escritura/RevisionMatriz';
import Matriz from 'containers/Phases/Escritura/Matriz';
import Notary from 'containers/Phases/Escritura/Notary';

export function Form({ selector, project, dispatch }) 
{  
  const [isHistoryOpen, setHistoryOpen] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  
  const entity_escritura = selector.escritura;
  const entity_promesa = selector.promesa;
  
  if (!entity_escritura || !entity_promesa) return <SyncMessage loading />;
  // const onCancel = () =>
  //   dispatch(push(`/proyectos/${project.ProyectoID}/escrituras`));
  
  const { EscrituraProyectoState } = project;
  const { EscrituraID } = entity_escritura;

  const onDownloadPromesa = () => {
    const url = entity_promesa.DocumentPromesa;
    if(url !== '')
      FileSaver.saveAs( url,'promesa');
  }

  return (
    <>
      <InitData User />
      <ProjectPhases project={project} active="escritura" />
      <Steps state={entity_escritura.EscrituraState} />
      <div className="row m-0">
        <Button
          className="col-auto mt-3 m-btn"
          onClick={() => dispatch(
            push(`/proyectos/${project.ProyectoID}/escrituras`)
          )}
        >
          Ver listado inmueble
        </Button>
        <h4 className="col p-0 font-21 mt-3">
          {/* {`${project.Name}`}
          <span className="general-phase">
            - Escritura
            <i className="icon icon-z-info" title="This is Escritura." />
          </span> */}
        </h4>
        <Button
          className="col-auto mt-3 m-btn-white m-btn-history"
          onClick={() => setHistoryOpen(true)}
        >
          Historial
        </Button>
        {UserProject.isPM() && (
          <Button
            className="col-auto mt-3 m-btn m-btn-pen"
            onClick={() => setCanEdit(true)}
          >
            Modificación
          </Button>
        )}
      </div>      
      <div className="mt-2 d-flex align-items-end justify-content-between after-expands-2">
        <h4 className="font-21 color-regular mt-3 order-1">{project.Name}</h4>
      </div>      
      <h5 className="mb-3 font-18 d-flex align-items-center justify-content-between">
        <span className="line-height-1 color-success">
          {getEscrituraAction(entity_escritura.EscrituraState)}
        </span>
      </h5>
        <PhaseGeneral
          initialValues={entity_promesa}
          canEdit={canEdit}
        />
        <PhaseClient
          payType={entity_promesa.PayType}
          client={entity_promesa.Cliente}
          canEdit={canEdit}
        />
        <PhaseInmueble
          initialValues={entity_promesa}
          canEdit={canEdit}
        />
        <PhaseFormaDePago
          initialValues={entity_promesa}
          canEdit={canEdit}
        />
        <PhasePreCredito
          isCollapse={false}
          initialValues={entity_promesa}
          canEdit={canEdit}
        />
        <PhaseDocument
          isCollapse={false}
          entity={entity_promesa}
          promesa={true}
        />
        <PhaseTimeline
          isCollapse={false}
          entity={entity_promesa}
          selector={selector}
        />

        <RevisionPromesa
          proyectoState={EscrituraProyectoState}
          canEdit={ Auth.isES() }
          initialValues={entity_escritura}
          onDownloadPromesa={onDownloadPromesa}
          onSubmit={(values)=>dispatch(checkPromesa(values, EscrituraID))}
        />
        <NotificacionComprado
          proyectoState={EscrituraProyectoState}
          initialValues={entity_escritura}
          onSubmit={(values)=>dispatch(notificarCompradores(
              {...values, ProyectoID: project.ProyectoID},
              EscrituraID)
          )}
        />
      {/* { isCreditPayment(entity_promesa.PayType) &&  */}
        <AprobaHipotecarios 
          initialValues={entity_escritura}
          onSubmit={(values, index)=>{
            if (index == 0)dispatch(aprobaHipotecarios(values, EscrituraID));
            else dispatch(checkHipotecarios(values, EscrituraID));
          }}
        />
      <TasacionesBancarias 
        initialValues={entity_escritura}
        onSubmit={(values)=>{
          dispatch(aprovaBank(values, EscrituraID))
        }}
      />
      <RevisionMatriz 
        initialValues={entity_escritura}
        onSubmit={(values)=>{
          dispatch(aprovaBank(values, EscrituraID))
        }}
      />

      <Matriz 
        initialValues={entity_escritura}
        promesaDoc={entity_promesa.DocumentPromesa}
        onSubmit={(values)=>{
          dispatch(aprovaBank(values, EscrituraID))
        }}
      />
      <Notary 
        initialValues={entity_escritura}
        onSubmit={(values, index)=>{
          if(index == 1) dispatch(updateSale(values, EscrituraID));
          else dispatch(aprovaBank(values, EscrituraID));
        }}
      />
      
      {/* <Log logs={entity.Logs} limit={10} /> */}

      {entity_escritura.Logs && (
        <History
          logs={entity_escritura.Logs}
          onHide={()=>setHistoryOpen(false)}
          isOpen={isHistoryOpen}
          title={`${project.Name}`}
        />
      )}
    </>
  );
}

Form.propTypes = {
  selector: PropTypes.object,
  project: PropTypes.object,
  dispatch: PropTypes.func,
};

export default Form;
