/**
 *
 * Users
 *
 */

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUserInmobiliaria from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchUsers } from './actions';

export function UserInmobiliaria({ dispatch, InmobiliariaID, selector }) {
  useInjectReducer({ key: 'userInmobiliaria', reducer });
  useInjectSaga({ key: 'userInmobiliaria', saga });

  useEffect(() => {
    if (
      InmobiliariaID &&
      !selector.users &&
      !selector.users[InmobiliariaID] &&
      !selector.loading
    )
      dispatch(fetchUsers(InmobiliariaID));
  }, [InmobiliariaID]);

  return null;
}

UserInmobiliaria.propTypes = {
  selector: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectUserInmobiliaria(),
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

export default compose(withConnect)(UserInmobiliaria);
