/**
 *
 * Reservation Upload Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import ExField from 'components/ExForm/ExField';
import Alert from 'components/Alert';

function DocumentCondition({ form }) {
  const { Condition = [] } = form.values;
  const lengthCond = Condition.length;
  return (
    <>
      {Condition.length > 0 && (
        <>
          <span className="d-block font-14-rem">
            <b>Nueva Observación</b>
          </span>
          <ExField
            rows={5}
            type="textarea"
            className="mb-3"
            name={`Condition.${lengthCond - 1}.Description`}
          />
        </>
      )}
      {Condition.filter((item, index) => index < lengthCond - 1).map(
        (item, index) => (
          <Alert
            key={String(index)}
            onDismiss={() => {
              form.setFieldValue(
                'Condition',
                Condition.filter((co, i) => i !== index),
              );
            }}
          >
            {item.Description}
          </Alert>
        ),
      )}
    </>
  );
}

DocumentCondition.propTypes = {
  form: PropTypes.object,
};

export default DocumentCondition;
