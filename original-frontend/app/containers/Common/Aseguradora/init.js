/**
 *
 * AseguradoraInit
 *
 */

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAseguradora from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchEntities } from './actions';

export function AseguradoraInit({ dispatch, selector }) {
  useInjectReducer({ key: 'aseguradora', reducer });
  useInjectSaga({ key: 'aseguradora', saga });

  useEffect(() => {
    if (!selector.entities && !selector.loading) dispatch(fetchEntities());
  }, []);

  return null;
}

AseguradoraInit.propTypes = {
  selector: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectAseguradora(),
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

export default compose(withConnect)(AseguradoraInit);
