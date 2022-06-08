import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'formik';
import { FormGroup } from 'components/ExForm';
import ExField from 'components/ExForm/ExField';
import { getContactType, getContactTypeByID } from 'containers/App/helpers';
import Button from 'components/Button';

const ContactsElement = ({ values, ...props }) => {
  const { contactTypes = [] } = window.preload;
  const phoneContactType = getContactType('phone');
  const addContact = (evt, push) => {
    evt.preventDefault();
    push({ ...phoneContactType, Value: '' });
  };

  const changeContact = (evt, index, replace) => {
    replace(index, {
      ...values.Contact[index],
      ...getContactTypeByID(evt.currentTarget.value),
    });
  };

  return (
    <FieldArray
      name="Contact"
      render={({ remove, push, replace }) => (
        <>
          <div className="font-14-rem mt-4 d-flex align-items-center">
            <b className="color-main ">MEDIOS DE CONTACTO</b>{' '}
            <Button
              color="white"
              onClick={evt => addContact(evt, push)}
              className="btn-plus"
            >
              <b>Agregar</b>
            </Button>
          </div>
          <div className="row justify-content-between">
            {(values.Contact || []).map((contact, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div className="col-md-6" key={index}>
                <FormGroup className="mt-3">
                  <ExField
                    type="select"
                    disabled={index < 2}
                    name={`Contact.${index}.ContactInfoTypeID`}
                    style={{ width: '9em' }}
                    className="mr-2"
                    onChange={evt => changeContact(evt, index, replace)}
                  >
                    {contactTypes.length > 1 &&
                      contactTypes.map(contactType => (
                        <option
                          key={contactType.ContactInfoTypeID}
                          value={contactType.ContactInfoTypeID}
                        >
                          {contactType.Name}
                        </option>
                      ))}
                  </ExField>
                  <ExField
                    className="flex-fill"
                    name={`Contact.${index}.Value`}
                    type={values.Contact[index].ContactInfoType.toLowerCase()}
                    placeholder={
                      values.Contact[index].ContactInfoType.toLowerCase() ===
                      'phone'
                        ? '+56 9 '
                        : ''
                    }
                    {...props}
                  />
                  {index > 1 && (
                    <div
                      role="presentation"
                      onClick={() => remove(index)}
                      className="font-21 color-main background-color-transparent ml-2 pl-2 pointer"
                    >
                      <strong> - </strong>
                    </div>
                  )}
                </FormGroup>
              </div>
            ))}
          </div>
        </>
      )}
    />
  );
};

ContactsElement.propTypes = {
  values: PropTypes.object,
};
export default ContactsElement;
