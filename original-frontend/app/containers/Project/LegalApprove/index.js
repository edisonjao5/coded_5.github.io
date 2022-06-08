/**
 *
 * LegalApprove
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import WithLoading from 'components/WithLoading';
import makeSelectLegalApprove from './selectors';
import reducer from './reducer';
import saga from './saga';
import LegalApproveForm from './Form';
import { legalApprove, resetContainer } from './actions';
import { canApproveLegal } from '../helper';
const SyncMessage = WithLoading();

export function LegalApprove({ selector, project, dispatch }) {
  useInjectReducer({ key: 'legalApprove', reducer });
  useInjectSaga({ key: 'legalApprove', saga });
  const { loading, ...restSelector } = selector;
  useEffect(() => () => dispatch(resetContainer()), []);
  const canApprove = canApproveLegal(project);
  if (!canApprove) return <SyncMessage {...restSelector} />;
  return (
    <LegalApproveForm
      project={project}
      onSubmit={(Resolution, Comment = '') =>
        dispatch(
          legalApprove({
            ProyectoID: project.ProyectoID,
            Resolution,
            Comment,
          }),
        )
      }
      selector={selector}
    />
  );
}

LegalApprove.propTypes = {
  selector: PropTypes.object,
  project: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectLegalApprove(),
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

export default compose(withConnect)(LegalApprove);
