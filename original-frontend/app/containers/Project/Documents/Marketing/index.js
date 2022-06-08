/**
 *
 * Project
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Ban from 'components/Ban';
import makeSelectInitProject from '../../Init/selectors';
import { canAccessArea } from '../../helper';
import reducer from './reducer';
import saga from './saga';
import MarketingForm from './Form';
import makeSelectMarketing from './selectors';
import { resetContainer, reviewMarketing, saveMarketing } from './actions';

export function Marketing({ action, selectorProject, selector, dispatch }) {
  useInjectReducer({ key: 'marketing', reducer });
  useInjectSaga({ key: 'marketing', saga });
  const { project = {} } = selectorProject;
  useEffect(() => () => dispatch(resetContainer()), []);

  if (!canAccessArea(project)) return <Ban />;
  return (
    <MarketingForm
      action={action}
      selectorProject={selectorProject}
      selector={selector}
      onConfirm={values => dispatch(reviewMarketing(project.ProyectoID, values))}
      onSubmit={values => dispatch(saveMarketing(project.ProyectoID, values))}
    />
  );
}

Marketing.propTypes = {
  action: PropTypes.string,
  selector: PropTypes.object,
  selectorProject: PropTypes.object,
  dispatch: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
  selectorProject: makeSelectInitProject(),
  selector: makeSelectMarketing(),
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

export default compose(withConnect)(Marketing);
