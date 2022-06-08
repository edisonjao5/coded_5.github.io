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
import FinanceForm from './Form';
import FinanceView from './View';
import makeSelectFinance from './selectors';
import {
  getEntity,
  saveEntity,
  toggleScreen,
  reviewFinanza,
  resetContainer,
} from './actions';

export function Finance({ action, selectorProject, selector, dispatch }) {
  useInjectReducer({ key: 'finance', reducer });
  useInjectSaga({ key: 'finance', saga });
  const { project = {} } = selectorProject;

  useEffect(() => {
    if (!selector.entity && project.ProyectoID)
      dispatch(getEntity(project.ProyectoID), true);
    return () => dispatch(resetContainer());
  }, []);

  if (!canAccessArea(project)) return <Ban />;

  const { screen } = selector;
  if (screen === 'view' && selectorProject.project)
    return (
      <FinanceView
        action={action}
        selectorProject={selectorProject}
        selector={selector}
        onEdit={() => dispatch(toggleScreen('form', true))}
        onConfirm={state =>
          dispatch(reviewFinanza(selectorProject.project.ProyectoID, state))
        }
      />
    );
  if (screen === 'form')
    return (
      <FinanceForm
        onSubmit={values => dispatch(saveEntity(project.ProyectoID, values))}
        selectorProject={selectorProject}
        selector={selector}
        onReset={() => dispatch(toggleScreen('view', true))}
      />
    );
  return null;
}

Finance.propTypes = {
  action: PropTypes.string,
  selector: PropTypes.object,
  selectorProject: PropTypes.object,
  dispatch: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
  selectorProject: makeSelectInitProject(),
  selector: makeSelectFinance(),
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

export default compose(withConnect)(Finance);
