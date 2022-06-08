/**
 *
 * ClientForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form as ExForm } from 'components/ExForm';
import Button from 'components/Button';
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'components/Modal';
import WithLoading from 'components/WithLoading';
import { getContactType, stringToBoolean } from 'containers/App/helpers';
import RadioGroup from 'components/ExForm/RadioGroup';
import PersonBasic from './PersonBasic';

import CompanyBasic from './CompanyBasic';
import PersonAdvance from './PersonAdvance';

const SyncMessage = WithLoading();

function ClienteForm({ info, focusHide, selector, onHide, onSubmit }) {
  const { loading, client = {}, ...restSelector } = selector;
  const phoneContactType = getContactType('phone');
  const emailContactType = getContactType('email');

  const initialValues = {
    Name: '',
    LastNames: '',
    RegionID: '',
    ComunaID: '',
    Address: '',
    Rut: '',
    Contact: [
      { ...phoneContactType, Value: '' },
      { ...emailContactType, Value: '' },
    ],
    CivilStatus: '',
    ContractMarriageType: '',
    Genre: '',
    Ocupation: '',
    IsDefinitiveResidence: true,
    Carga: 0,
    Position: '',
    Antiquity: '',
    TotalPatrimony: 0,
    IsCompany: false,
    GiroEmpresa: '',
    ReprenetanteLegal: '',
    ...client,
    BirthDate: client.BirthDate || '',
    Nationality: client.Nationality || 'Chile',
    Extra: { AgeRank: '', SalaryRank: '', ...(client.Extra || {}) },
    CheckArt150: false,
  };
  if (selector.success) {
    onHide();
  }
  return (
    <Modal isOpen={selector.screen === 'form'} size="xl">
      <ExForm initialValues={initialValues} onSubmit={onSubmit}>
        {form => {
          const isCompany = stringToBoolean(form.values.IsCompany);
          let Form;

          switch (info) {
            case 'advance':
              Form = isCompany ? CompanyBasic : PersonAdvance;
              break;
            default:
              // Form = isCompany ? CompanyBasic : PersonBasic;
              Form = isCompany ? CompanyBasic : PersonAdvance;
          }

          if (form.values.UserID && form.values.Name === undefined)
            return <SyncMessage {...restSelector} loading={loading} />;

          return (
            <>
              <ModalHeader>
                {client.UserID ? 'Editar cliente' : 'Agregar cliente'}
              </ModalHeader>
              <ModalBody>
                <SyncMessage {...restSelector} />
                <div className="p-3 background-color-tab d-flex align-items-center">
                  {info === 'advance' &&
                    (isCompany ? 'Empresa' : 'Persona Natural')}
                  {info !== 'advance' && (
                    <RadioGroup
                      required
                      name="IsCompany"
                      options={[
                        { label: 'Persona Natural', value: '0' },
                        { label: 'Empresa', value: '1' },
                      ]}
                    />
                  )}
                </div>
                <div className="p-3 px-4 border-top">
                  <Form form={form} focusHide={focusHide} />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  loading={loading}
                  type="submit"
                  onClick={evt => {
                    evt.preventDefault();
                    form.submitForm();
                  }}
                >
                  Guardar
                </Button>
                <Button
                  disabled={loading}
                  type="reset"
                  className="ml-2"
                  color="white"
                  onClick={onHide}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </>
          );
        }}
      </ExForm>
    </Modal>
  );
}

ClienteForm.propTypes = {
  focusHide: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  info: PropTypes.string,
  selector: PropTypes.object,
  onSubmit: PropTypes.func,
  onHide: PropTypes.func,
};

export default ClienteForm;
