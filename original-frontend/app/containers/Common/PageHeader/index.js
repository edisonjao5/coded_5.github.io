/**
 *
 * PageHeader
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import makeSelectPageHeader from './selectors';
import reducer from './reducer';
import { setPageHeader } from './actions';

export function PageHeader({ dispatch, children, header, actions = false }) {
  useInjectReducer({ key: 'pageHeader', reducer });
  useEffect(() => {
    dispatch(
      setPageHeader({
        header: header || children,
        actions,
      }),
    );
  });
  return <></>;
}

PageHeader.propTypes = {
  header: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  actions: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  children: PropTypes.node,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  pageHeader: makeSelectPageHeader(),
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
)(PageHeader);
