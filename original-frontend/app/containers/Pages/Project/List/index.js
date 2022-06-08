/**
 *
 * ProjectList
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
import { UserProject } from 'containers/Project/helper';
import { Auth } from 'containers/App/helpers';
import makeSelectProjectList from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchEntities } from './actions';
import List from './List';
import InList from './InList';
import FiList from './FIList';

const SyncMessage = WithLoading();

export function ProjectListPage({ dispatch, selector }) {
  useInjectReducer({ key: 'projectList', reducer });
  useInjectSaga({ key: 'projectList', saga });

  const { entities, loading } = selector;

  useEffect(() => {
    if (!loading) dispatch(fetchEntities());
  }, []);
 
  const assignEntities = [];
  const otherEntities = [];
  const creationEntities = [];
  (entities || []).forEach(entity => {
    if (!entity.IsFinished) {
      return creationEntities.push(entity);
    }
    if (UserProject.in(entity)) {
      return assignEntities.push(entity);
    }
    return otherEntities.push(entity);
  });

  return (
    <div>
      <Helmet title="Project list" />
      <PageHeader>Proyectos</PageHeader>
      {!entities && <SyncMessage {...selector} />}
      {entities && !loading && !Auth.isInmobiliario() && (  
        // !Auth.isFinanza() && (
        <List dispatch={dispatch} selector={selector} />
      )}
      {entities && !loading && Auth.isInmobiliario() && (
        <InList dispatch={dispatch} selector={selector} />
      )}
      {/* {entities && !loading && Auth.isFinanza() && (
        <FiList dispatch={dispatch} selector={selector} />
      )} */}
    </div>
  );
}

ProjectListPage.propTypes = {
  selector: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectProjectList(),
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

export default compose(
  withConnect,
  memo,
)(ProjectListPage);
