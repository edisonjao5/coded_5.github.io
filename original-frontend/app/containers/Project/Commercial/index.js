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
import { Auth } from 'containers/App/helpers';
import Ban from 'components/Ban';
import makeSelectRealEstate from 'containers/Common/RealEstate/selectors';
import makeSelectInitProject from '../Init/selectors';
import reducer from './reducer';
import saga from './saga';
import CommercialForm from './Form';
import CommercialView from './View';
import makeSelectCommercial from './selectors';
import { resetContainer, saveProject, toggleScreen } from './actions';
import { UserProject } from '../helper';

export function Commercial({
  action = 'view',
  selectorProject,
  selectorRealEstate,
  selector,
  dispatch,
}) {
  useInjectReducer({ key: 'commercial', reducer });
  useInjectSaga({ key: 'commercial', saga });
  const { project = {} } = selectorProject;
  const { ConstructoraID } = project;
  const isPM = UserProject.isPM(project);

  useEffect(() => {
    if (isPM && !ConstructoraID) {
      dispatch(toggleScreen('form', true));
    }
    return () => dispatch(resetContainer());
  }, []);

  const { screen } = selector;

  if (screen === 'view')
    return (
      <CommercialView
        canEdit={
          (isPM || Auth.isAdmin() || Auth.isGerenteComercial()) &&
          Auth.canManageProject() &&
          action !== 'view'
        }
        selectorProject={selectorProject}
        selector={selector}
        onEdit={() => dispatch(toggleScreen('form', true))}
      />
    );
  if (screen === 'form') {
    if (!Auth.canManageProject()) return <Ban />;
    return (
      <CommercialForm
        onSubmit={values => dispatch(saveProject(values))}
        selectorProject={selectorProject}
        selectorRealEstate={selectorRealEstate}
        selector={selector}
        onReset={() => dispatch(toggleScreen('view', true))}
      />
    );
  }
  return null;
}

Commercial.propTypes = {
  action: PropTypes.string,
  selector: PropTypes.object,
  selectorProject: PropTypes.object,
  selectorRealEstate: PropTypes.object,
  dispatch: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
  selectorProject: makeSelectInitProject(),
  selectorRealEstate: makeSelectRealEstate(),
  selector: makeSelectCommercial(),
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

export default compose(withConnect)(Commercial);
