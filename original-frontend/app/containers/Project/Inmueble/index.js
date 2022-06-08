/**
 *
 * Project
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WithLoading from 'components/WithLoading';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import { FormGroup } from 'components/ExForm';
import makeSelectInitProject from '../Init/selectors';
import reducer from './reducer';
import saga from './saga';
import makeSelectInmueble from './selectors';
import { canEditProject } from '../helper';

import {
  importFile,
  resetContainer,
  saveEntities,
  toggleScreen,
} from './actions';
import Inmuebles from './Inmuebles';
import Restrictions from './Restrictions';
import makeSelectInmuebleInit from '../../Common/Inmueble/selectors';

const SyncMessage = WithLoading();
export function Inmueble({
  selector,
  selectorProject,
  selectorInmueble,
  dispatch,
}) {
  useInjectReducer({ key: 'inmueble', reducer });
  useInjectSaga({ key: 'inmueble', saga });
  const { project = {} } = selectorProject;
  useEffect(() => () => dispatch(resetContainer()), []);

  return (
    <Box collapse={project.IsFinished}>
      <BoxHeader>
        <b>INMUEBLES</b>
      </BoxHeader>
      <BoxContent>
        {!selectorInmueble.entities && <SyncMessage {...selectorInmueble} />}
        {selectorInmueble.entities && (
          <div className="p-0 font-14 row">
            <FormGroup className="col-md-7 my-2">
              <Inmuebles
                selectorInmueble={selectorInmueble}
                selector={selector}
                toggleScreen={screen => dispatch(toggleScreen(screen))}
                onImportFile={data => dispatch(importFile(project, data))}
                onSaveInmuebles={() =>
                  dispatch(saveEntities(project, selector.reviewInmuebles))
                }
                canEdit={canEditProject(project)}
              />
            </FormGroup>
            {selectorInmueble.entities && selectorInmueble.entities.length > 0 && (
              <FormGroup className="col-md-5 my-2">
                <Restrictions project={project} />
              </FormGroup>
            )}
          </div>
        )}
      </BoxContent>
    </Box>
  );
}

Inmueble.propTypes = {
  selector: PropTypes.object,
  selectorInmueble: PropTypes.object,
  selectorProject: PropTypes.object,
  dispatch: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
  selectorProject: makeSelectInitProject(),
  selector: makeSelectInmueble(),
  selectorInmueble: makeSelectInmuebleInit(),
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

export default compose(withConnect)(Inmueble);
