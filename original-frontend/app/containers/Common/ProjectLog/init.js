/**
 *
 * Log
 *
 */

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { fetchLogs } from './actions';

function ProjectLogInit({ project, dispatch }) {
  useInjectReducer({ key: 'projectLog', reducer });
  useInjectSaga({ key: 'projectLog', saga });

  useEffect(() => {
    if (project && project.ProyectoID) dispatch(fetchLogs(project.ProyectoID));
  }, [project]);

  return null;
}

ProjectLogInit.propTypes = {
  ProyectoID: PropTypes.string,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ProjectLogInit);
