/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';
import InitData from 'containers/Common/InitData';
import { compose } from 'redux';
import WithLoading from 'components/WithLoading';
import Button from 'components/Button';
import makeSelectInmueble from 'containers/Common/Inmueble/selectors';
import makeSelectRestriction from 'containers/Common/Restriction/selectors';
import TopPage from './TopPage';
import General from './General';
import makeSelectInitProject from './Init/selectors';
import Commercial from './Commercial';
import Poliza from './Poliza';
import { hasCollectedFullData, isCollectedDatos, UserProject } from './helper';
import Documents from './Documents';
import Inmueble from './Inmueble';
import LegalApprove from './LegalApprove';
import Comment from './Comment';
import GeneralApprove from './GeneralApprove';
import SendToLegal from './SendToLegal';
import makeSelectFinance from './Documents/Finance/selectors';
import { PROYECTO_APPROVAL_STATE } from '../App/constants';

const SyncMessage = WithLoading();

export function Project({
  match,
  user,
  action = 'view',
  selectorProject,
  selectorFinance,
  selectorInmuebles,
  selectorRestrictions,
  dispatch,
}) {
  const { project } = selectorProject;
  const hasFullData = hasCollectedFullData({
    project,
    finanza: selectorFinance.entity,
    inmuebles: selectorInmuebles.entities,
    restrictions:selectorRestrictions.entities,
  });

  return (
    <>
      <InitData
        StageState
        RealEstate
        User
        // Aseguradora
        InstitucionFinanciera
        Project={{ ProyectoID: match.params.id }}
        ProjectLog={{ project }}
        Inmueble={{ ProyectoID: project.ProyectoID }}
        Restriction={{ ProyectoID: project.ProyectoID }}
      />

      {!project && <SyncMessage {...selectorProject} />}
      {project && (
        <>
          <TopPage action={action} project={project} dispatch={dispatch} />
          <General action={action} />
          <Commercial action={action} />
          {/* {project.EntregaInmediata && <Poliza action={action} />} */}
          {isCollectedDatos(project) && (
            <>
              <Documents project={project} action={action} user={user} />
              <Inmueble project={project} action={action} />
              <Comment project={project} action={action} />
              {UserProject.isPM(project) &&
                (project.ProyectoApprovalState !== PROYECTO_APPROVAL_STATE[2] &&
                  ((!project.IsFinished || action !== 'view') && (
                    <SendToLegal hasFullData={hasFullData} project={project} />
                  )))}
            </>
          )}
          {!project.IsFinished &&
            (hasFullData &&
              (project.ProyectoApprovalState !== PROYECTO_APPROVAL_STATE[2] && (
                <LegalApprove project={project} action={action} />
              )))}
          {!project.IsFinished && <GeneralApprove />}
          {project.IsFinished && (
            <div className="my-3 d-flex justify-content-end align-items-center">
              <Button
                color="white"
                onClick={() => dispatch(push('/proyectos'))}
              >
                Volver
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
}

Project.propTypes = {
  action: PropTypes.string,
  match: PropTypes.object,
  selectorProject: PropTypes.object,
  selectorFinance: PropTypes.object,
  selectorInmuebles: PropTypes.object,
  selectorRestrictions: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectorProject: makeSelectInitProject(),
  selectorFinance: makeSelectFinance(),
  selectorInmuebles: makeSelectInmueble(),
  selectorRestrictions: makeSelectRestriction(),
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

export default compose(withConnect)(Project);
