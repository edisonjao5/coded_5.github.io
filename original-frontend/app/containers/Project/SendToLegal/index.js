/**
 *
 * SendToLegal
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
import Button from 'components/Button';
import makeSelectSendToLegal from './selectors';
import reducer from './reducer';
import saga from './saga';
import { resetContainer, sendToLegal } from './actions';
import { UserProject } from '../helper';
const SyncMessage = WithLoading();

export function SendToLegal({ selector, project, dispatch, hasFullData }) {
  useInjectReducer({ key: 'sendToLegal', reducer });
  useInjectSaga({ key: 'sendToLegal', saga });
  const { loading, reviews, ...restSelector } = selector;
  const isReady = UserProject.isPM(project) && hasFullData;
  useEffect(() => () => dispatch(resetContainer()), []);
  return (
    <>
      <div className="my-3 d-flex justify-content-end align-items-center">
        <Button
          disabled={!isReady}
          onClick={() => {
            if (isReady) dispatch(sendToLegal(project.ProyectoID));
          }}
          loading={loading}
        >
          Guardar para aprobar legal
        </Button>
      </div>
      <SyncMessage {...restSelector} />
    </>
  );
}

SendToLegal.propTypes = {
  selector: PropTypes.object,
  project: PropTypes.object,
  hasFullData: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectSendToLegal(),
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

export default compose(withConnect)(SendToLegal);
