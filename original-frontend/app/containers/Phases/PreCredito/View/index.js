/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import Button from 'components/Button';
import Tab from 'components/Tab';
import { isContadoPayment, isCreditPayment } from 'containers/App/helpers';
import { UserProject } from 'containers/Project/helper';
import Labor from './Labor';
import Codeudor from './Codeudor';
import Patrimony from './Patrimony';
import CoPatrimony from './CoPatrimony';
import Renta from './Renta';
import PhasePreCreditoFormModal from '../Form/modal';
import PhaseCredit from '../Credit';
import { calculateRenta, isValidLabor } from '../helper';
import { downloadPreApprobation, } from '../Credit/actions';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from '../Credit/reducer';
import saga from '../Credit/saga';

const PhasePreCreditoView = ({
  isCollapse,
  canEdit,
  canEditCredit,
  initialValues,
  isPendienteAprobacion,
  onSubmit,
  dispatch,
  promesa,
}) => {
  const [isOpen, setOpen] = useState(false);
  const isContado = isContadoPayment(initialValues.PayType);
  const isCredit = isCreditPayment(initialValues.PayType);
  const isValid = isValidLabor(initialValues, initialValues.PayType);
  const { moneyErr } = calculateRenta(initialValues);
  const { IsCompany=false } = initialValues.Cliente;

  useInjectReducer({ key: 'credit', reducer });
  useInjectSaga({ key: 'credit', saga });

  const PatrimonyTabs =  [{
    label: 'Deudor', content: ( <Patrimony values={initialValues} /> ),
  }]

  if(initialValues.Codeudor)
    PatrimonyTabs.push({
      label: 'Co-deudor', content: ( <CoPatrimony values={initialValues} /> ),
    });

  return (
    <>
      {isCredit && (
        <Box collapse isOpen={!!initialValues.ReservaID || isCollapse}>
          <BoxHeader
            className={!isValid || moneyErr ? 'background-color-warning' : ''}
          >
            <b>PRE APROBACIÓN DE CRÉDITO</b>
            {!isValid && (
              <span className="font-14-rem order-3 mr-3">
                <i className="icon icon-alert color-warning" />
                <b>Faltan Datos</b>
              </span>
            )}
            {isValid && moneyErr && (
              <span className="font-14-rem order-3 mr-3">
                <i className="icon icon-alert color-warning" />
                <b>La Renta no es Suficiente</b>
              </span>
            )}
            {canEdit && (
              <Button
                color="white"
                className="m-btn-pen order-3"
                onClick={() => setOpen(true)}
              >
                Editar
              </Button>
            )}
            {!promesa && (
              <Button
                onClick={() => dispatch(downloadPreApprobation(initialValues))}
                className="m-btn-download order-3"
              >
                Exportar PDF
              </Button>
            )}
          </BoxHeader>
          <BoxContent className="p-0">
            {!IsCompany && (
              <>
                <Labor values={initialValues} group="Cliente" />
                <Renta group="Cliente" values={initialValues} />
                {initialValues.Codeudor && <Codeudor values={initialValues} />}
              </>
            )}
            {/* <Patrimony values={initialValues} /> */}
            <Tab tabs={PatrimonyTabs} />

            {(initialValues.OfertaID || initialValues.PromesaID) && !UserProject.isInmobiliario() && (
              <PhaseCredit
                canEdit={canEditCredit}
                EntityID={initialValues.OfertaID}
                PayType={initialValues.PayType}
                isPendienteAprobacion={isPendienteAprobacion}
              />
            )}
          </BoxContent>
        </Box>
      )}
      <PhasePreCreditoFormModal
        isOpen={isOpen}
        initialValues={initialValues}
        onHide={() => setOpen(false)}
        onSubmit={values => {
          setOpen(false);
          onSubmit(values);
        }}
      />
    </>
  );
};

PhasePreCreditoView.propTypes = {
  isCollapse: PropTypes.bool,
  canEdit: PropTypes.bool,
  canEditCredit: PropTypes.bool,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  dispatch: PropTypes.func,
  promesa: PropTypes.bool,
};
export default PhasePreCreditoView;
