/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';
import PageHeader from 'containers/Common/PageHeader';
import Button from 'components/Button';
import { PROYECTO_APPROVAL_STATE } from 'containers/App/constants';
import { Auth } from 'containers/App/helpers';
import Alert from 'components/Alert';
import Steps from './Steps';
import { UserProject } from './helper';

export function getNextResponer(project = {}) {
  const responer = [];
  if (!project.ConstructoraID) responer.push('JP');
  if (project.EntregaInmediata && !project.Aseguradora.AseguradoraID)
    responer.push('AC');

  if (project.ConstructoraID && (project.PlanMediosState === 'Pendiente')) responer.push('MK');
  if (project.ConstructoraID && (project.BorradorPromesaState === 'Pendiente')) responer.push('LG');
  if (project.ConstructoraID && (project.IngresoComisionesState === 'Pendiente')) responer.push('FI');

  if (project.ConstructoraID && (project.ProyectoApprovalState === PROYECTO_APPROVAL_STATE[0]))
    responer.push('JP');
  if (project.ProyectoApprovalState === PROYECTO_APPROVAL_STATE[1])
    responer.push('LG');
  if (project.ProyectoApprovalState === PROYECTO_APPROVAL_STATE[2])
    responer.push('GC');
  return responer;
}

export function getSubtitle(project = {}, action) {
  if (action === 'edit' && project.IsFinished) return 'Modificar Proyecto';
  if (!project.Name) return 'Pendiente de Datos Generales';
  if (!project.ConstructoraID) return 'Pendiente de Datos Comerciales';
  const { Aseguradora = {}, EntregaInmediata } = project;

  if (EntregaInmediata && !Aseguradora.AseguradoraID)
    return 'Pendiente de Pólizas';

  if (project.Graph) {
    if (project.BorradorPromesaState === 'Pendiente') return 'Carga Documentos';
    if (project.Graph.Node)
      return project.Graph.Node.find(node => node.Color === 'red').Description;
    return 'Resumen Proyecto';
  }

  return '';
}

export function TopPage({ action, project = {}, dispatch }) {
  const canEdit =
    (Auth.isGerenteComercial() || UserProject.isPM(project)) &&
    action === 'view' &&
    Auth.canManageProject();
  // header
  const header = ['Proyectos'];
  if (action === 'edit' && project.IsFinished) {
    header.push('Modificar Proyecto');
    header.push(project.Name);
  } else {
    if (project.ProyectoApprovalState !== 'Aprobado')
      header.push('Nuevo Proyecto');
    if (project.Name) header.push(project.Name);
    if (action === 'view' && project.IsFinished) header.push('Resumen');
  }
  // subtitle
  const subtitle = getSubtitle(project, action);
  const nextResponer = getNextResponer(project);
  const responers =
    nextResponer.length > 0 ? (
      <span className="color-warning">({nextResponer.join(', ')})</span>
    ) : (
      ''
    );
  return (
    <div className="mt-3">
      <Helmet title={action === 'create' ? 'Nuevo Proyecto' : project.Name} />
      <PageHeader header={header} />
      {!project.IsFinished && <Steps project={project} />}
      {action === 'edit' && project.IsFinished && (
        <Alert type="danger">
          El modificar algunos datos implicará cambios importantes en el
          proceso.
        </Alert>
      )}
      <h4 className="font-21 color-regular mt-3">
        {project.Name || 'Nuevo Proyecto'}
      </h4>

      {subtitle && (
        <h5 className="mb-3 font-18 d-flex align-items-center justify-content-between">
          <span
            className={`line-height-1 ${
              project.IsFinished ? 'color-success' : 'color-caution-03'
            }`}
          >
            {subtitle} {responers}
          </span>
          {action === 'view' && (
            <div className="d-flex">
              {/* project.ProyectoApprovalState === PROYECTO_APPROVAL_STATE[3] && (
                <Button className="m-btn-plus mr-2">Promesar</Button>
              ) */}
              {canEdit && (
                <Button
                  onClick={() =>
                    dispatch(push(`/proyectos/${project.ProyectoID}/editar`))
                  }
                  className="m-btn-pen mr-2"
                >
                  Editar Proyecto
                </Button>
              )}
              {/*
              <Button color="white" className="m-btn-time">
                Historial
              </Button>
              */}
            </div>
          )}
          {action === 'edit' && (
            <Button color="white" onClick={() => dispatch(push('/proyectos'))}>
              Volver
            </Button>
          )}
        </h5>
      )}
    </div>
  );
}

TopPage.propTypes = {
  action: PropTypes.string,
  project: PropTypes.object,
  dispatch: PropTypes.func,
};

export default TopPage;
