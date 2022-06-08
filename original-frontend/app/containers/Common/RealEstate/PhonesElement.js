import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'formik';
import { FormGroup, Label } from 'components/ExForm';
import ExField from 'components/ExForm/ExField';
import { getContactType } from 'containers/App/helpers';

const PhonesElement = ({ values, contactTypes, ...props }) => {
  const phoneContactType = getContactType('phone');

  return (
    <FieldArray
      name="Contact"
      render={({ remove, push }) => (
        <>
          <FormGroup className="mt-3">
            <Label style={{ width: '10em' }}>Teléfono(s)</Label>
            <ExField className="flex-fill" name="Contact.1.Value" {...props} />
            <div
              role="presentation"
              onClick={() => push({ ...phoneContactType, Value: '' })}
              className="font-21 color-main background-color-transparent ml-2 pointer"
            >
              <strong>+</strong>
            </div>
          </FormGroup>
          {values.Contact.filter((contact, index) => index > 1).map(
            (contact, index) => (
              /* eslint-disable-next-line */
              <FormGroup key={index + 2} className="mt-3">
                <Label style={{ width: '10em' }} />
                <ExField
                  className="flex-fill"
                  required
                  name={`Contact.${index + 2}.Value`}
                  {...props}
                />
                <div
                  role="presentation"
                  onClick={() => remove(index + 2)}
                  className="font-21 color-main background-color-transparent ml-2 pl-2 pointer"
                >
                  <strong> - </strong>
                </div>
              </FormGroup>
            ),
          )}
        </>
      )}
    />
  );
};

PhonesElement.propTypes = {
  values: PropTypes.object,
  contactTypes: PropTypes.array,
};
export default PhonesElement;
