/**
 *
 * Aseguradora
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import makeSelectAseguradora from './selectors';
import Form from './Form';
import List from './List';
import reducer from './reducer';
import saga from './saga';
import { toggleScreen, saveEntity, queryEntities,fetchEntities } from './actions';

function Aseguradora({
  query,
  selector,
  onQuery,
  onCreate,
  onEdit,
  onView,
  onSubmit,
  onHide,
  onSelect,
  dispatch,
}) {
  useInjectReducer({ key: 'aseguradora', reducer });
  useInjectSaga({ key: 'aseguradora', saga });

  useEffect(() => {
    if (!selector.entities && !selector.loading) dispatch(fetchEntities());
    onQuery(query);
  }, []);
  return (
    <>
      <List
        onQuery={onQuery}
        selector={selector}
        onCreate={onCreate}
        onEdit={onEdit}
        onView={onView}
        onSelect={onSelect}
      />
      <Form
        query={query}
        selector={selector}
        onHide={onHide}
        onSubmit={onSubmit}
      />
    </>
  );
}

Aseguradora.propTypes = {
  query: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  selector: PropTypes.object,
  onQuery: PropTypes.func,
  onCreate: PropTypes.func,
  onEdit: PropTypes.func,
  onView: PropTypes.func,
  onSubmit: PropTypes.func,
  onHide: PropTypes.func,
  onSelect: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectAseguradora(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onQuery: query => dispatch(queryEntities(query)),
    onCreate: () => dispatch(toggleScreen('form', false)),
    onEdit: entity => dispatch(toggleScreen('form', entity)),
    onView: entity => dispatch(toggleScreen('view', entity)),
    onSubmit: values => dispatch(saveEntity(values)),
    onHide: () => dispatch(toggleScreen(false, false)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Aseguradora);
