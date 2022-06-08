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
import makeSelectInitProject from '../Init/selectors';
import reducer from './reducer';
import saga from './saga';
import GeneralForm from './Form';
import GeneralView from './View';
import makeSelectGeneral from './selectors';
import { resetContainer, saveProject, toggleScreen } from './actions';
import { UserProject } from '../helper';

export function General({
  action = 'view',
  selectorProject,
  selector,
  // eslint-disable-next-line react/prop-types
  isCollapse = true,
  dispatch,
}) {
  useInjectReducer({ key: 'general', reducer });
  useInjectSaga({ key: 'general', saga });
  useEffect(() => {
    if (action === 'create') dispatch(toggleScreen('form', true));
    return () => dispatch(resetContainer());
  }, []);

  const { screen } = selector;
  const isPM = UserProject.isPM(selectorProject.project);
  if (screen === 'view' && selectorProject.project)
    return (
      <GeneralView
        canEdit={
          (isPM || Auth.isAdmin() || Auth.isGerenteComercial()) &&
          Auth.canManageProject() &&
          action !== 'view'
        }
        selectorProject={selectorProject}
        selector={selector}
        onEdit={() => dispatch(toggleScreen('form'))}
        isCollapse={isCollapse}
      />
    );
  if (screen === 'form') {
    if (!Auth.canManageProject()) return <Ban />;
    return (
      <GeneralForm
        onSubmit={values => dispatch(saveProject(values))}
        selectorProject={selectorProject}
        selector={selector}
        onReset={() => dispatch(toggleScreen('view'))}
      />
    );
  }
  return null;
}

General.propTypes = {
  action: PropTypes.string,
  selector: PropTypes.object,
  selectorProject: PropTypes.object,
  dispatch: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
  selectorProject: makeSelectInitProject(),
  selector: makeSelectGeneral(),
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

export default compose(withConnect)(General);
