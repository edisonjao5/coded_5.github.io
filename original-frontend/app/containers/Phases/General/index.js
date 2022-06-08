/**
 *
 * Reservation Inmueble Form
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Button from 'components/Button';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import { createStructuredSelector } from 'reselect';
import { Auth } from 'containers/App/helpers';
import { UserProject } from 'containers/Project/helper';
import PhaseGeneralView from './View';
import PhaseGeneralForm from './Form';

export function PhaseGeneral({
  isCollapse = false,
  canEdit,
  canConfirm,
  onConfirm,
  initialValues,
  onUpdate,
  canVNEdit,
}) {
  const [isOpen, setOpen] = useState(false);

  return (
    <Box collapse isOpen={isCollapse}>
      <BoxHeader>
        <b>DATOS GENERALES</b>
        {canConfirm && (
          <div className="d-flex align-items-center mr-3 order-3">
            <div className="checkbox-01 checkbox-medium">
              <span>
                <input
                  type="checkbox"
                  onChange={evt => {
                    onConfirm('general', evt.currentTarget.checked);
                  }}
                />
                <label />
              </span>
            </div>
            <span>
              <b>Confirmar</b>
            </span>
          </div>
        )}
        {!canVNEdit &&
          ((canEdit || (UserProject.in(window.project) && Auth.isVendor())) && (
            <Button
              color="white"
              className="m-btn-pen order-3"
              onClick={() => setOpen(true)}
            >
              Editar
            </Button>
          ))}
      </BoxHeader>
      <BoxContent>
        <PhaseGeneralView values={initialValues} />
      </BoxContent>
      <PhaseGeneralForm
        initialValues={initialValues}
        onHide={() => setOpen(false)}
        onUpdate={values => {
          onUpdate(values);
          setOpen(false);
        }}
        isOpen={isOpen}
      />
    </Box>
  );
}

PhaseGeneral.propTypes = {
  isCollapse: PropTypes.bool,
  canEdit: PropTypes.bool,
  canConfirm: PropTypes.bool,
  initialValues: PropTypes.object,
  onConfirm: PropTypes.func,
  onUpdate: PropTypes.func,
  canVNEdit: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PhaseGeneral);
