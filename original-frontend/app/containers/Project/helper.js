import React from 'react';
import {
  PROYECTO_APPROVAL_STATE,
  PROYECTO_DOCUMENT_STATE,
  USER_PROYECTO_TYPE,
} from 'containers/App/constants';
import { isUserProjectType, Auth } from 'containers/App/helpers';
import marketingDocuments from './Documents/Marketing/documents';
import { getDocuments } from './Documents/Legal/documents';

export const currentProjectStep = (project = {}) => {
  const {
    ProyectoID,
    UsersProyecto = [],
    Documentos = {},
    EntregaInmediata,
    Aseguradora = {},
    BorradorPromesaState,
    IngresoComisionesState,
    ProyectoApprovalState,
  } = project;

  const legalDocuments = getDocuments(EntregaInmediata);

  // 1. create new (general)
  if (!ProyectoID) return 1;

  // 2. filled general, but not commercial
  if (
    !UsersProyecto.find(
      user => user.UserProyectoType === USER_PROYECTO_TYPE[3] && user.UserID,
    )
  )
    return 2;

  // 3. filler comemrcial, but not poliza
  if (EntregaInmediata && !Aseguradora.AseguradoraID) return 3;

  // 4. filler poliza, but not upload marketing
  if (
    Object.keys(Documentos).find(
      document =>
        marketingDocuments.find(doc => doc.documentoType === document) &&
        !Documentos[document],
    )
  )
    return 4;

  // 5. uploaded marketing, but not legal
  if (
    Object.keys(Documentos).find(
      document =>
        legalDocuments.find(doc => doc.documentoType === document) &&
        !Documentos[document],
    )
  )
    return 5;

  // 6. uploaded marketing & legal, pending to approve documents
  if (BorradorPromesaState !== PROYECTO_DOCUMENT_STATE[1]) return 6;

  // 7. approved documents, but not finanza
  if (IngresoComisionesState !== PROYECTO_DOCUMENT_STATE[1]) return 7;

  // 8 filled finanza, but not immubles
  if (ProyectoApprovalState === PROYECTO_APPROVAL_STATE[0]) return 8;

  // 9 finish collect data, pending to approve legal
  if (ProyectoApprovalState === PROYECTO_APPROVAL_STATE[1]) return 9;

  // 10 approved legal, but not general approve
  if (ProyectoApprovalState === PROYECTO_APPROVAL_STATE[2]) return 10;

  // 11 approve gerencia
  if (ProyectoApprovalState === PROYECTO_APPROVAL_STATE[3]) return 11;

  return 0;
};

export const UserProject = {
  in: (project = window.project || {}) =>
    project.UsersProyecto.find(user => user.UserID === Auth.get('user').UserID),
  isPM: (project = window.project || {}) =>
    isUserProjectType(USER_PROYECTO_TYPE[1], project),
  isMarketing: (project = window.project || {}) =>
    isUserProjectType(USER_PROYECTO_TYPE[5], project),
  isLegal: (project = window.project || {}) =>
    isUserProjectType(USER_PROYECTO_TYPE[6], project),
  isFinanza: (project = window.project || {}) =>
    isUserProjectType(USER_PROYECTO_TYPE[7], project),
  isAC: (project = window.project || {}) =>
    isUserProjectType(USER_PROYECTO_TYPE[3], project),
  isInmobiliario: (project = window.project || {}) =>
    isUserProjectType(USER_PROYECTO_TYPE[0], project) ||
    isUserProjectType(USER_PROYECTO_TYPE[4], project) ||
    (isUserProjectType('Inmobiliario', project) && UserProject.in()),
  isVendor: (project = window.project || {}) =>
    isUserProjectType(USER_PROYECTO_TYPE[2], project),
  isES: (project = window.project || {}) =>
    isUserProjectType(USER_PROYECTO_TYPE[2], project),
};

export const isCollectedDatos = project =>
  !!project.UsersProyecto.find(
    user => user.UserProyectoType === USER_PROYECTO_TYPE[6] && user.UserID,
  );

export const isLegalApprove = project =>
  project.ProyectoApprovalState === PROYECTO_APPROVAL_STATE[2];

export const isGeneralApprove = project =>
  project.ProyectoApprovalState === PROYECTO_APPROVAL_STATE[3];

export const canConfirmDocument = project =>
  UserProject.isPM(project) &&
  project.BorradorPromesaState === PROYECTO_DOCUMENT_STATE[1] &&
  project.IngresoComisionesState === PROYECTO_DOCUMENT_STATE[1] &&
  project.PlanMediosState === PROYECTO_DOCUMENT_STATE[1];

export const canUploadDocument = (docType, project) => {
  let isUserType = false;
  switch (docType) {
    case 'marketing':
      isUserType = UserProject.isMarketing(project);
      break;
    case 'legal':
      isUserType = UserProject.isLegal(project);
      break;
    case 'finanza':
      isUserType = UserProject.isFinanza(project);
      break;
    default:
      isUserType = false;
  }
  return (
    (isUserType && !isLegalApprove(project) && !isGeneralApprove(project))
    // || (UserProject.isPM(project) && !isLegalApprove(project)) /* JP don't have to upload documents */
  );
};

export const canAccessArea = (project, area = '') =>
  UserProject.in(project) || Auth.isGerenteComercial();
  
export const canEditProject = project => UserProject.isPM(project);

export const hasCollectedFullData = ({
  project = {},
  finanza = {},
  inmuebles = [],
  restrictions = [],
}) =>
  project &&
  project.Documentos &&
  !Object.keys(project.Documentos).find(doc => !project.Documentos[doc]) &&
  !Object.keys(project.Documentos).find(
    doc => project.Documentos[doc].state !== 'confirmed',
  ) &&
  finanza &&
  finanza.State === 'confirmed' &&
  inmuebles &&
  inmuebles.length > 0 &&
  restrictions.length > 0;

export const canApproveLegal = project =>
  UserProject.isLegal(project) &&
  project.ProyectoApprovalState === PROYECTO_APPROVAL_STATE[1];

export const canApproveGeneral = project =>
  Auth.isGerenteComercial() &&
  project.ProyectoApprovalState === PROYECTO_APPROVAL_STATE[2];

export const pending = project => {
  let progress = 100;
  let color = 'red';
  const pendings = [];

  if (
    !project.UsersProyecto.find(
      user => user.UserProyectoType === USER_PROYECTO_TYPE[3] && user.UserID,
    )
  ) {
    pendings.push({
      label: (
        <>
          <b>Pendiente Datos</b> Comerciales
        </>
      ),
    });
    progress = 10;
  } else if (project.EntregaInmediata && !project.Aseguradora.AseguradoraID) {
    pendings.push({
      label: (
        <>
          <b>Pendiente Datos</b> Póliza
        </>
      ),
    });
    progress = 20;
  } else if (project.PlanMediosState === PROYECTO_DOCUMENT_STATE[0] ||
             project.BorradorPromesaState === PROYECTO_DOCUMENT_STATE[0] ||
             project.IngresoComisionesState === PROYECTO_DOCUMENT_STATE[0] )
  {
    progress = 30;
    if (project.PlanMediosState === PROYECTO_DOCUMENT_STATE[0]){
      pendings.push({
        label: (
          <>
            <b>Carga Documentos</b> Marketing
          </>
        ),
        remind: 'marketing',
      });
    }else progress += 10;

    if (project.BorradorPromesaState === PROYECTO_DOCUMENT_STATE[0]){
      pendings.push({
        label: (
          <>
            <b>Carga Documentos</b> Legal
          </>
        ),
        remind: 'legal',
      });
    }else progress += 10;

    if (project.IngresoComisionesState === PROYECTO_DOCUMENT_STATE[0]){
      pendings.push({
        label: (
          <>
            <b>Carga Comisiones</b> Finanzas
          </>
        ),
        remind: 'finanzas',
      });
    }else progress += 10;

  } else if (project.ProyectoApprovalState === PROYECTO_APPROVAL_STATE[1]) {
    pendings.push({
      label: (
        <>
          <b>Falta aprobación</b> legal
        </>
      ),
      remind: '',
    });
    progress = 80;
  } else if (project.ProyectoApprovalState === PROYECTO_APPROVAL_STATE[2]) {
    pendings.push({
      label: (
        <>
          <b>Falta aprobación</b> gerencia
        </>
      ),
      remind: '',
    });
    progress = 90;
  } else {
    pendings.push({
      label: (
        <>
          <b>Carga Inmuebles</b>
        </>
      ),
      remind: '',
    });
    progress = 60;
  }

  if (progress > 40) color = 'yellow';
  if (progress > 80) color = 'green';
  return { pendings, progress, color };
};

export const getPromesa = entity => {
  const { Documentos = {} } = window.project;
  
  let maquetaWord;
  let maquetaPdf;
  let maquetaName;
  if (entity.Cliente.IsCompany) {
    maquetaWord = Documentos.company_word;
    maquetaPdf = Documentos.company_pdf;
    maquetaName = "Maqueta Promesa Empresa WORD";
  } else if (entity.PayType === 'Contado') {
    maquetaWord = Documentos.counter_word;
    maquetaPdf = Documentos.counter_pdf;
    maquetaName = "Maqueta Promesa Contado WORD";
  } else {
    maquetaWord = Documentos.credit_word;
    maquetaPdf = Documentos.credit_pdf;
    maquetaName = "Maqueta Promesa Crédito WORD";
  }
  
  let docPromesa = null;
  if(entity.DocumentPromesaFirma) docPromesa = entity.DocumentPromesaFirma;
  else if(entity.DocumentPromesa) docPromesa = entity.DocumentPromesa;

  return { maquetaWord, maquetaPdf, maquetaName, docPromesa };
};

export const countIN = () => {
  return (window.project.UsersProyecto || []).filter(
    user => user.UserProyectoType === 'Autorizador' || user.UserProyectoType === 'Aprobador',
  ).length; 
}

export const Is_EntregaInmediata = () =>{
  const estato_obj = document.getElementsByName('EtapaStateID')[0];
  if(!estato_obj) return false;
  const estado_val = estato_obj.options[estato_obj.selectedIndex].text;
  return (estado_val==="Entrega inmediata")
}