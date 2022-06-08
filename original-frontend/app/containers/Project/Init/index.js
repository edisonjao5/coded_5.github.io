/**
 *
 * Project
 *
 */

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Auth } from 'containers/App/helpers';
import makeSelectInitProject from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchProject, resetProject, updateProject } from './actions';

export function InitProject({ ProyectoID, dispatch, selector }) {
  useInjectReducer({ key: 'initProject', reducer });
  useInjectSaga({ key: 'initProject', saga });
  useEffect(() => {
    const { project = {}, loading } = selector;
    if (ProyectoID && !loading && !project) dispatch(fetchProject(ProyectoID));
    else if (!project)
      dispatch(
        updateProject({
          UsersProyecto: [
            {
              UserID: Auth.get('user_id'),
              UserProyectoType: 'Jefe de Proyecto',
            },
          ],
        }),
      );

    return () => dispatch(resetProject());
  }, [ProyectoID]);
  return null;
}

InitProject.propTypes = {
  ProyectoID: PropTypes.string,
  action: PropTypes.string,
  selector: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectInitProject(),
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

export default compose(withConnect)(InitProject);
