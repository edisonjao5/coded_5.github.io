import React, { useState } from 'react';
import { FormattedNumber } from 'react-intl';
import PropTypes from 'prop-types';
import { FieldArray } from 'formik';
import ExField from 'components/ExForm/ExField';
import {Field} from 'components/ExForm';
import { inmuebleLabel } from 'containers/Common/Inmueble/helper';



const InmueblesElement = ({ values, onSelect }) => {
  const handleRemove = inmueble => {
    const required = (inmueble.Restrictions || []).reduce((acc, item) => {
      if (item.InmuebleInmuebleType === 'Required') acc.push(item.InmuebleBID);
      return acc;
    }, []);

    if(onSelect)
      onSelect(
        values.Inmuebles.filter(
          item =>
            item.InmuebleID !== inmueble.InmuebleID &&
            !required.includes(item.InmuebleID),
        ),
      );
  };

  return (
    <FieldArray
      name="Inmuebles"
      // eslint-disable-next-line no-unused-vars
      render={({ remove, replace }) => (
        <>
          {values.Inmuebles &&
            values.Inmuebles.map((inmueble, index) => (
              <tr className="align-middle-group" key={inmueble.InmuebleID}>
                <td className="expand">
                  <div className="background-color-tab border p-3 position-relative">
                    <h5 className="d-block font-16 main_color">
                      <b>{inmuebleLabel(inmueble)}</b>
                    </h5>
                    {inmuebleLabel(inmueble).includes('Departamento') ? (
                    <div className="d-flex align-items-center justify-content-between mt-1">
                      <span className="">
                        <b>Descuentos</b>
                      </span>
                      <div className="search-filter shadow-sm mx-2">
                        <Field
                          className="flex-fill"
                          name={`Inmuebles.${index}.Discount`}
                          type="number"
                          min={0}
                          max={(inmueble.MaximumDiscount && inmueble.MaximumDiscount != 100) ? inmueble.MaximumDiscount: values.DiscountMaxPercent }
                          style={{ width: '11.5em' }}
                          // onChange={evt => {
                          //   const maxDiscount = values.DiscountMaxPercent || 100;
                          //   if(evt.currentTarget.value == "") return;
                          //   let percent = (evt.currentTarget.value == "")? 0: parseFloat(evt.currentTarget.value);
                          //   console.log(evt.currentTarget.value, percent);
                          //   if ( percent > maxDiscount) percent = maxDiscount;
                          //   if ( percent < 0) percent = 0;

                          //   replace(index, {
                          //     ...inmueble,
                          //     Discount: percent,
                          //   });
                          // }}
                        />
                      </div>
                      <span className="italic-gray">
                        Límite Maximo de Descuento {(inmueble.MaximumDiscount && inmueble.MaximumDiscount != 100) ? inmueble.MaximumDiscount: values.DiscountMaxPercent}%
                      </span>
                    </div>) : null}
                    {!inmueble.isRequiredRestriction && (
                      <button
                        type="button"
                        className="close close-absolute"
                        onClick={() => {
                          handleRemove(inmueble);
                          remove(index);
                        }}
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    )}
                  </div>
                </td>
                <td className="sub-table">
                  <dl>
                    <dt>
                      <b>Valor UF</b>
                    </dt>
                    <dd>
                      <b name={`Inmuebles.${index}.Price`}>
                        <FormattedNumber value={inmueble.Price} />
                      </b>
                    </dd>
                    <dt>Descuentos UF</dt>
                    <dd>
                      {inmueble.Discount > 0 && <b>-</b>}
                      <b name={`Inmuebles.${index}.DiscountValue`}>
                        {(inmueble.Discount / 100) * inmueble.Price ? <FormattedNumber
                          value={(inmueble.Discount / 100) * inmueble.Price}
                        /> : null }
                      </b>
                    </dd>
                  </dl>
                </td>
              </tr>
            ))}
        </>
      )}
    />
  );
};

InmueblesElement.propTypes = {
  values: PropTypes.object,
  onSelect: PropTypes.func,
};
export default InmueblesElement;
