/**
 *
 * InstitucionFinancieraInit
 *
 */

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectInstitucionFinanciera from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchEntities } from './actions';

export function InstitucionFinancieraInit({ dispatch, selector }) {
  useInjectReducer({ key: 'institucionFinanciera', reducer });
  useInjectSaga({ key: 'institucionFinanciera', saga });

  useEffect(() => {
    if (!selector.entities && !selector.loading) dispatch(fetchEntities());
  }, []);

  return null;
}

InstitucionFinancieraInit.propTypes = {
  selector: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectInstitucionFinanciera(),
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

export default compose(withConnect)(InstitucionFinancieraInit);
