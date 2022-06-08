/**
 *
 * Escritura Form
 *
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';

import Log from 'components/Log';
import Button from 'components/Button';
import History from 'components/History';
import WithLoading from 'components/WithLoading';
import { Auth } from 'containers/App/helpers';
import ProjectPhases from 'containers/Common/ProjectPhases';
import InitData from 'containers/Common/InitData';
const SyncMessage = WithLoading();

import {
  updateEscritura,
} from './actions';

import Steps from './Steps';

import MunicipalReception from 'containers/Phases/Escritura/MunicipalReception';
import DatesEscrituracion from 'containers/Phases/Escritura/DatesEscrituracion';
import TitleReport from 'containers/Phases/Escritura/TitleReport';

export function ProjectForm({ project, dispatch }) {
  // const [isHistoryOpen, setHistoryOpen] = useState(false);
    
  if (!project) return <SyncMessage loading />;
  // const onCancel = () =>
  //   dispatch(push(`/proyectos/${project.ProyectoID}/escrituras`));

  const { EscrituraProyectoState } = project;

  return (
    <>
      <InitData User Client />
      <ProjectPhases project={project} active="escritura" />
      <Steps state={EscrituraProyectoState} />
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
      </div>
      {/* <!-- Title --> */}
      <div className="mt-2 d-flex align-items-end justify-content-between after-expands-2">
        <h4 className="font-21 color-regular mt-3 order-1">{project.Name}</h4>
      </div>
      {/* <!-- Subtitle --> */}
      <h5 className="mb-3 font-18 d-flex align-items-center justify-content-between">
        <span className="line-height-1 color-success">Ingreso Fechas de Presentación de Recepción Municipal</span>
      </h5>
      
      {/* { (EscrituraProyectoState !== ESCRITURA_STATE.Fechas_Avisos_I) && */}
        <MunicipalReception          
          state={EscrituraProyectoState}
          initialValues={project}
          onSubmit={(value)=>{
            dispatch(updateEscritura(value, project.ProyectoID));
          }}
        /> 
      {/* } */}

      {/* { (EscrituraProyectoState > ESCRITURA_STATE.A_Comercial) && */}
        <DatesEscrituracion
          state={EscrituraProyectoState}
          initialValues={project}
          onSubmit={(value)=>{
            dispatch(updateEscritura(value, project.ProyectoID));
          }}
        />
      {/* } */}

      {/* { (EscrituraProyectoState > ESCRITURA_STATE.Matrices_Escrit) && */}
        <TitleReport
          state={EscrituraProyectoState}
          initialValues={project}
          onSubmit={(value)=>{
            dispatch(updateEscritura(value, project.ProyectoID));
          }}
        />
      {/* } */}

      {/* <Log logs={entity.Logs} limit={10} /> */}

      {project.Logs && (
        <History
          logs={project.Logs}
          onHide={()=>setHistoryOpen(false)}
          isOpen={isHistoryOpen}
          title={`${project.Name}`}
        />
      )}
    </>
  );
}

ProjectForm.propTypes = {
  project: PropTypes.object,
  dispatch: PropTypes.func,
};


export default ProjectForm;
