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
import Ban from 'components/Ban';
import makeSelectInitProject from '../../Init/selectors';

import { canAccessArea } from '../../helper';
import reducer from './reducer';
import saga from './saga';
import LegalForm from './Form';
import makeSelectLegal from './selectors';
import {
  approveDocuments,
  saveEntity,
  reviewEntity,
  resetContainer,
} from './actions';

export function Legal({ action, selectorProject, selector, dispatch }) {
  useInjectReducer({ key: 'legal', reducer });
  useInjectSaga({ key: 'legal', saga });
  const { project = {} } = selectorProject;
  useEffect(() => () => dispatch(resetContainer()), []);

  if (!canAccessArea(project)) return <Ban />;
  return (
    <LegalForm
      action={action}
      selectorProject={selectorProject}
      selector={selector}
      onConfirm={values => dispatch(reviewEntity(project.ProyectoID, values))}
      onSubmit={values => dispatch(saveEntity(project.ProyectoID, values, project.EntregaInmediata))}
      onApprove={isApprove => {
        dispatch(approveDocuments(project.ProyectoID, isApprove));
      }}
    />
  );
}

Legal.propTypes = {
  action: PropTypes.string,
  selector: PropTypes.object,
  selectorProject: PropTypes.object,
  dispatch: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
  selectorProject: makeSelectInitProject(),
  selector: makeSelectLegal(),
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

export default compose(withConnect)(Legal);
