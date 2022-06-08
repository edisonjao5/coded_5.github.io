/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import Tab from 'components/Tab';
import { Form as ExForm } from 'components/ExForm';
import { calculates } from 'containers/Phases/FormaDePago/helper';
import { isContadoPayment } from 'containers/App/helpers';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'components/Modal';
import Labor from './Labor';
import Codeudor from './Codeudor';
import Patrimony from './Patrimony';
import CoPatrimony from './CoPatrimony';
import Renta from './Renta';
import Summary from './Summary';
import { calculateRenta } from '../helper';
const PhasePreCreditoFormModal = ({
  initialValues,
  onSubmit,
  isOpen,
  onHide,
}) => (
  <ExForm initialValues={initialValues} onSubmit={onSubmit}>
    {form => {
      const { values, submitForm } = form;
      const isContado = isContadoPayment(values.PayType);
      let moneyErr = false;
      if (!isContado) {
        const { SumRenta } = calculateRenta(values);
        const { total, discount } = calculates(values);
        moneyErr = values.Cliente.IsCompany ? false : Math.floor(total - discount) >= SumRenta;
      }

      const PatrimonyTabs =  [{
        label: 'Deudor', content: ( <Patrimony form={form} /> ),
      }]
    
      if(values.Codeudor)
        PatrimonyTabs.push({
          label: 'Co-deudor', content: ( <CoPatrimony form={form} /> ),
        });

      return (
        <Modal isOpen={isOpen} size="xl" scrollable>
          <ModalHeader>PRE APROBACIÓN DE CRÉDITO</ModalHeader>
          <ModalBody>
            <div className="container-content bg-white pl-3 pr-3 pb-3">
              {!isContado && (
                <>
                  <article className="person-record pt-3">
                    <Labor values={values} group="Cliente" />
                    <Renta group="Cliente" form={form} />
                  </article>
                  {values.Codeudor && (
                    <Codeudor
                      form={form}
                      removeCodeudor={evt => {
                        evt.preventDefault();
                        form.setFieldValue('Codeudor', null);
                        form.setFieldValue('CodeudorID', null);
                        form.setFieldValue('CoEmpleador', null);
                      }}
                    />
                  )}
                </>
              )}

              {/* <Patrimony form={form} /> */}
              <Tab tabs={PatrimonyTabs} />

              {values.Codeudor && <Summary form={form} />}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              disabled={moneyErr}
              className="order-3"
              onClick={evt => {
                evt.preventDefault();
                submitForm();
              }}
            >
              Guardar
            </Button>

            <Button
              onClick={evt => {
                evt.preventDefault();
                onHide();
              }}
              className="order-3"
              color="white"
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      );
    }}
  </ExForm>
);

PhasePreCreditoFormModal.propTypes = {
  isOpen: PropTypes.bool,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  onHide: PropTypes.func,
};
export default PhasePreCreditoFormModal;
