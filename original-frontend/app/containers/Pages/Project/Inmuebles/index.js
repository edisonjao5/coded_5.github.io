/**
 *
 * Create Project
 *
 */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import WithLoading from 'components/WithLoading';
import Button from 'components/Button';
import { resetSelected } from 'containers/Common/Inmueble/actions';
import InmuebleList from 'containers/Common/Inmueble/InmuebleList';

import makeSelectInitProject from 'containers/Project/Init/selectors';
import makeSelectInmueble from 'containers/Project/Inmueble/selectors';
import makeSelectInmuebleInit from 'containers/Common/Inmueble/selectors';
import InitData from 'containers/Common/InitData';

const SyncMessage = WithLoading();

import ReplaceConfirm from 'containers/Common/Inmueble/ReplaceConfirm';
import { canEditProject } from 'containers/Project/helper';
import { importFile, importAuthFile, saveEntities } from 'containers/Project/Inmueble/actions';
import reducer from 'containers/Project/Inmueble/reducer';
import saga from 'containers/Project/Inmueble/saga';

export function InmueblesPage({
  match,
  selector,
  draftSelector,
  selectorProject,
  dispatch
}) {
  useInjectReducer({ key: 'inmueble', reducer });
  useInjectSaga({ key: 'inmueble', saga });

  const { project = {} } = selectorProject;
  const canEdit = canEditProject(project);

  const onImportFile = data =>
    dispatch(importFile(project, data));
  const onAuthFile = data =>
    dispatch(importAuthFile(project, data));
  // const onSave = () =>
  //   dispatch(saveEntities(project, reviewInmuebles))

  const fileUploader = useRef(null);
  const pdfUploader = useRef(null);
  const [isReplaceOpen, setReplaceOpen] = useState(false);
  const [replaceData, setReplaceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [entities, setEntities] = useState(null);

  const usedEntities = (entities || []).filter(entity =>
    entity.InmuebleState !== 'Disponible'
  );
  
  const [tempSelector, setSelector] = useState({});

  useEffect(() => {
    return () => dispatch(resetSelected([], false));    
  }, []);
  
  useEffect(() => {
    if(draftSelector.isAuth) return;
    setLoading(draftSelector.loading);
    setEntities(false);
    setSelector(draftSelector);

    if(draftSelector.reviewInmuebles){
      dispatch(saveEntities(project, draftSelector.reviewInmuebles))
    }
  }, [draftSelector]);

  useEffect(() => {
    setLoading(selector.loading);
    setEntities(selector.entities);
    setSelector(selector);
  }, [selector]);

  const onConfirm = () => {
    setReplaceOpen(false);

    if (usedEntities.length) {
      console.log(usedEntities);
    }

    onImportFile(replaceData);
  }

  const onCancel = () => {
    setReplaceData(null);
    setReplaceOpen(false);
  }

  return (
    <div id="seleccion_inmuebles_page">
      <InitData
        StageState
        RealEstate
        User
        Aseguradora
        InstitucionFinanciera
        Project={{ ProyectoID: match.params.id }}
        ProjectLog={{ project }}
        Inmueble={{ ProyectoID: project.ProyectoID }}
        Restriction={{ ProyectoID: project.ProyectoID }}
      />

      <span>Inmuebles</span>
      {loading && <SyncMessage {...tempSelector} />}
      {!loading && entities && (
        <>
          <InmuebleList selector={tempSelector} />
          <div className="d-flex p-3 justify-content-end">
            {canEdit && (
              <>
                {!draftSelector.isAuth && (
                  <Button loading={loading} disabled={loading}
                    onClick={() => { pdfUploader.current.click() }}
                  >
                    Autorización
                  </Button>
                )}
                <input
                  name="AuthorizationDoc"
                  accept=".pdf"
                  style={{ display: 'none' }}
                  type="file"
                  ref={pdfUploader}
                  onChange={event => {
                    const data = new FormData();
                    data.append('AuthFile', event.currentTarget.files[0]);
                    event.currentTarget.value = '';
                    onAuthFile(data);
                  }}
                />
                {draftSelector.isAuth && (
                  <Button loading={loading} disabled={loading}
                    onClick={() => { fileUploader.current.click() }}
                  >
                    Nueva carga
                  </Button>
                )}
                <input
                  name="File"
                  accept=".csv,.xls,.xlsx"
                  style={{ display: 'none' }}
                  type="file"
                  ref={fileUploader}
                  onChange={event => {
                    const data = new FormData();
                    data.append('File', event.currentTarget.files[0]);
                    event.currentTarget.value = '';
                    setReplaceData(data);

                    if (usedEntities.length) setReplaceOpen(true);
                    else onConfirm();
                  }}
                />
                {/* <Button loading={loading} disabled={ true }
                  onClick={() => onSave}
                >
                  Guardarar
                </Button> */}
              </>
            )}
            <Button disabled={loading} type="reset" color="white">
              Volver
            </Button>
          </div>
        </>
      )}

      <ReplaceConfirm
        isOpen={isReplaceOpen}
        onHide={onCancel}
        onConfirm={onConfirm}
      />
    </div>
  );
}

InmueblesPage.propTypes = {
  match: PropTypes.object,
  selectorProject: PropTypes.object,
  selector: PropTypes.object,
  draftSelector: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectorProject: makeSelectInitProject(),
  selector: makeSelectInmuebleInit(),
  draftSelector: makeSelectInmueble(),
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

export default compose(withConnect)(InmueblesPage);
