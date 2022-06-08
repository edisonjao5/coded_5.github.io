/**
 *
 * GeneralApprove
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
import makeSelectGeneralApprove from './selectors';
import reducer from './reducer';
import saga from './saga';
import GeneralApproveForm from './Form';
import { generalApprove, resetContainer } from './actions';
import { canApproveGeneral } from '../helper';
import makeSelectInitProject from '../Init/selectors';
const SyncMessage = WithLoading();

export function GeneralApprove({ selector, selectorProject, dispatch }) {
  useInjectReducer({ key: 'generalApprove', reducer });
  useInjectSaga({ key: 'generalApprove', saga });
  useEffect(() => () => dispatch(resetContainer()), []);

  const { project, reviews } = selectorProject;
  const { loading, ...restSelector } = selector;
  const canApprove = canApproveGeneral(project);
  if (!canApprove) return <SyncMessage {...restSelector} />;
  return (
    <GeneralApproveForm
      reviews={reviews}
      onSubmit={(Resolution, Comment = '') =>
        dispatch(
          generalApprove({
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

GeneralApprove.propTypes = {
  selector: PropTypes.object,
  selectorProject: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectGeneralApprove(),
  selectorProject: makeSelectInitProject(),
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

export default compose(withConnect)(GeneralApprove);
