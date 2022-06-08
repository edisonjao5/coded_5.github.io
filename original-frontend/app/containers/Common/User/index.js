/**
 *
 * User
 *
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import makeSelectUser from './selectors';
import Form from './Form';
import List from './List';
import {
  toggleScreen,
  saveUser,
  resetPasswordUser,
  activeUser,
  queryUsers,
  resetQueryUsers,
} from './actions';
import ResetPassword from './ResetPassword';
import ActiveUser from './ActiveUser';
import View from './View';

function User({
  query,
  selector,
  onQuery,
  onActive,
  onCreate,
  onEdit,
  onView,
  onResetPassword,
  onSubmit,
  onHide,
  onSelect,
  onRsetQueryUsers,
}) {
  useEffect(() => {
    onQuery(query);
    return () => onRsetQueryUsers();
  }, []);
  return (
    <>
      <List
        onQuery={onQuery}
        selector={selector}
        onActive={onActive}
        onCreate={onCreate}
        onEdit={onEdit}
        onView={onView}
        onResetPassword={onResetPassword}
        onSelect={onSelect}
      />
      <Form
        query={query}
        selector={selector}
        onHide={onHide}
        onSubmit={onSubmit}
      />
      <ResetPassword selector={selector} onHide={onHide} />
      <ActiveUser selector={selector} onHide={onHide} />
      <View selector={selector} onHide={onHide} />
    </>
  );
}

User.propTypes = {
  query: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  selector: PropTypes.object,
  onQuery: PropTypes.func,
  onActive: PropTypes.func,
  onCreate: PropTypes.func,
  onEdit: PropTypes.func,
  onView: PropTypes.func,
  onResetPassword: PropTypes.func,
  onSubmit: PropTypes.func,
  onHide: PropTypes.func,
  onSelect: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onRsetQueryUsers: () => dispatch(resetQueryUsers()),
    onQuery: query => dispatch(queryUsers(query)),
    onActive: user => dispatch(activeUser(user.UserID)),
    onCreate: () => dispatch(toggleScreen('form', false)),
    onEdit: user => dispatch(toggleScreen('form', user)),
    onView: user => dispatch(toggleScreen('view', user)),
    onResetPassword: user => dispatch(resetPasswordUser(user.UserID)),
    onSubmit: values => dispatch(saveUser(values)),
    onHide: () => dispatch(toggleScreen(false, false)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(User);
