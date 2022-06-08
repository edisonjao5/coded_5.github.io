/**
 *
 * Client
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import makeSelectClient from './selectors';
import ClienteForm from './Form';
import List from './List';
import { toggleScreen, saveClient, queryClients, deleteClient } from './actions';
import View from './View';

function Client({
  canEdit = true,
  focusHide,
  info,
  query,
  selector,
  onQuery,
  onCreate,
  onEdit,
  onView,
  onSubmit,
  onHide,
  onSelect,
  onDelete,
  canAdd=false,
}) {
  useEffect(() => {
    onQuery(query);
  }, []);

  return (
    <>
      <List
        onQuery={onQuery}
        selector={selector}
        onCreate={onCreate}
        onDelete={onDelete}
        onEdit={onEdit}
        onView={onView}
        onSelect={onSelect}
        canEdit={canEdit}
        canAdd={canAdd}
      />
      {canEdit && (
        <ClienteForm
          focusHide={focusHide}
          info={info}
          query={query}
          selector={selector}
          onHide={onHide}
          onSubmit={onSubmit}
        />
      )}
      <View selector={selector} onHide={onHide} />
    </>
  );
}

Client.propTypes = {
  canEdit: PropTypes.bool,
  focusHide: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  info: PropTypes.string,
  query: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  selector: PropTypes.object,
  onQuery: PropTypes.func,
  onCreate: PropTypes.func,
  onEdit: PropTypes.func,
  onView: PropTypes.func,
  onSubmit: PropTypes.func,
  onHide: PropTypes.func,
  onSelect: PropTypes.func,
  onDelete: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectClient(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onQuery: query => dispatch(queryClients(query)),
    onCreate: () => dispatch(toggleScreen('form', false)),
    onEdit: client => dispatch(toggleScreen('form', client)),
    onView: client => dispatch(toggleScreen('view', client)),
    onSubmit: values => dispatch(saveClient(values)),
    onHide: () => dispatch(toggleScreen(false, false)),
    onDelete: client => dispatch( deleteClient(client) )
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Client);
