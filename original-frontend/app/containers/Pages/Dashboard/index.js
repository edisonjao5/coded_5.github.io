/**
 *
 * Dashboard
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Helmet } from 'react-helmet';
import PageHeader from 'containers/Common/PageHeader';
import WithLoading from 'components/WithLoading';
import makeSelectDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchEntities, fetchLogs, queryUserPending } from './actions';
import MainContent from './Main';
import ActionPending from './Action';

const SyncMessage = WithLoading();

export function DashboardPage({ dispatch, selector, onQuery }) {
  useInjectReducer({ key: 'dashboard', reducer });
  useInjectSaga({ key: 'dashboard', saga });

  const { loading } = selector;

  useEffect(() => {
    dispatch(fetchEntities());
    dispatch(fetchLogs());
  }, []);
  return (
    <div className="mt-4">
      <Helmet title="Dashboard" />
      <PageHeader>Dashboard</PageHeader>
      {loading && (<SyncMessage {...selector} />)}
      {!loading && (
        <>
          <ActionPending dispatch={dispatch} selector={selector} />
          <MainContent onQuery={onQuery} dispatch={dispatch} selector={selector} />
        </>
      )}
    </div>
  );
}

DashboardPage.propTypes = {
  selector: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  onQuery: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectDashboard(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onQuery: query => {
      dispatch(queryUserPending(query))
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DashboardPage);
