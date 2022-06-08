/**
 *
 * Quotation Detail Form
 *
 */
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import Inmueble from 'containers/Common/Inmueble';
import { FormGroup, Label, Field as ExField } from 'components/ExForm';
import ExUsers from 'components/ExForm/ExUsers';
import ExClients from 'components/ExForm/ExClients';
import RadioGroup from 'components/ExForm/RadioGroup';
import Button from 'components/Button';
import { getIn } from 'formik';
import { Auth } from 'containers/App/helpers';
import { calculates } from 'containers/Phases/FormaDePago/helper';
import InmueblesElement from 'containers/Phases/Inmueble/InmueblesElement';

export function DetailForm({ form }) {
  const { quotationUtils } = window.preload;
  const [openInmueble, setOpenInmueble] = useState(false);
  const { values, touched, errors, setFieldValue, setValues } = form;
  const getInTouched = getIn(touched, 'Inmuebles');
  const getInErrors = getIn(errors, 'Inmuebles');

  const { total, discount } = calculates({ Inmuebles: values.Inmuebles });

  // const cotizacionTypeIDs = quotationUtils.CotizacionTypes.map(({ Name }) => ({
  //   label: Name,
  //   value: Name,
  // }));

  return (
    <>
      <Box>
        <BoxHeader className="d-none">
          <div className="row p-2 d-flex align-items-center pl-4">
            <span className="title">Forma de pago</span>
            {/* <RadioGroup
              required
              name="CotizacionType"
              options={cotizacionTypeIDs}
            /> */}
          </div>
        </BoxHeader>
        <BoxContent>
          <div className="row m-0 align-middle-group">
            <table className="table table-responsive-sm table-summary col-12 mt-0">
              <tbody className="border-bottom">
                <tr className="align-middle-group">
                  <td className="col-md-8">
                    <div className="py-2 border-bottom">
                      <span className="d-block">
                        <b>Inmuebles por Cotizar</b>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="nav-btn add d-flex">
                      <Button
                        color="white"
                        className="m-btn-plus"
                        onClick={evt => {
                          evt.preventDefault();
                          setOpenInmueble(true);
                        }}
                      >
                        Ver Disponibles
                      </Button>
                    </div>
                  </td>
                </tr>
                {getInTouched && getInErrors && (
                  <tr>
                    <td colSpan={2}>
                      <div className="invalid-feedback d-block m-0">
                        {getInErrors}
                      </div>
                    </td>
                  </tr>
                )}
                <InmueblesElement values={form.values} required />

                <tr className="resume">
                  <td />
                  <td className="sub-table">
                    <dl>
                      <dt>Valor Total UF</dt>
                      <dd>
                        <b>
                          <FormattedNumber value={total} />
                        </b>
                      </dd>
                      <dt>Total Descuentos UF</dt>
                      <dd>
                        <b>
                          {discount > 0 && `-`}
                          <FormattedNumber value={discount} />
                        </b>
                      </dd>
                      <dt>
                        <b>Valor Final UF</b>
                      </dt>
                      <dd>
                        <b>
                          <FormattedNumber value={total - discount} />
                        </b>
                      </dd>
                    </dl>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-0 pt-3">
            <ul className="row m-0 p-0">
              <span className="col-12 font-16-rem color-regular">
                <b className="border-bottom d-block pb-2 mb-2">
                  Datos de contacto
                </b>
              </span>
              <FormGroup className="col-md-6 my-2">
                <Label style={{ width: '12em' }}>Vendedor</Label>
                <ExUsers
                  name="VendedorID"
                  style={{ width: '18em' }}
                  query={{ roles: 'Vendedor' }}
                  required
                  disabled={!Auth.isPM()}
                  onSelect={user =>
                    setValues({
                      ...values,
                      VendedorID: user.UserID,
                      Vendedor: user,
                    })
                  }
                />
              </FormGroup>
              <FormGroup className="col-md-6 my-2">
                <Label style={{ width: '12em' }}>Cliente</Label>
                <ExClients
                  name="Cliente.UserID"
                  style={{ width: '18em' }}
                  info="basic"
                  onSelect={client =>
                    setFieldValue('Cliente', {
                      ...client,
                      FindingTypeID: values.Cliente.FindingTypeID || '',
                    })
                  }
                  focusHide={
                    values.CotizacionType ===
                    quotationUtils.CotizacionTypes[1].Name
                      ? ['ComunaID']
                      : false
                  }
                  required
                  canAdd={ Auth.isPM() || Auth.isVendor() }
                />
              </FormGroup>
              <FormGroup className="col-md-6 my-2">
                <Label style={{ width: '12em' }}>Fecha</Label>
                <ExField
                  name="DateFirmaPromesa"
                  style={{ width: '18em' }}
                  type="datepicker"
                  required
                />
              </FormGroup>
              {values.CotizacionType ===
                quotationUtils.CotizacionTypes[0].Name && (
                <FormGroup className="col-md-6 my-2">
                  <Label style={{ width: '12em' }}>Medio de Llegada</Label>
                  <ExField
                    type="select"
                    name="Cliente.FindingTypeID"
                    style={{ width: '18em' }}
                    required
                  >
                    <option value="">Selecciona...</option>
                    {quotationUtils.FindingTypes.map(findingtype => (
                      <option
                        key={findingtype.FindingTypeID}
                        value={findingtype.FindingTypeID}
                      >
                        {findingtype.Name}
                      </option>
                    ))}
                  </ExField>
                </FormGroup>
              )}
              {values.CotizacionType ===
                quotationUtils.CotizacionTypes[1].Name && (
                <>
                  <FormGroup className="col-md-6 my-2">
                    <Label style={{ width: '12em' }}>
                      Destino de la Compra
                    </Label>
                    <ExField
                      type="select"
                      name="IsNotInvestment"
                      style={{ width: '18em' }}
                      required
                    >
                      <option value="">Selecciona...</option>
                      <option value="1">Vivienda</option>
                      <option value="0">Inversión</option>
                    </ExField>
                  </FormGroup>
                  <FormGroup className="col-md-6 my-2">
                    <Label style={{ width: '12em' }}>Medio de Llegada</Label>
                    <ExField
                      type="select"
                      name="ContactMethodTypeID"
                      style={{ width: '18em' }}
                      required
                    >
                      <option value="">Selecciona...</option>
                      {quotationUtils.ContactMethodTypes.map(contacttype => (
                        <option
                          key={contacttype.ContactMethodTypeID}
                          value={contacttype.ContactMethodTypeID}
                        >
                          {contacttype.Name}
                        </option>
                      ))}
                    </ExField>
                  </FormGroup>
                </>
              )}
            </ul>
          </div>
        </BoxContent>
      </Box>
      <Inmueble
        isOpen={openInmueble}
        showSummary
        onHide={() => setOpenInmueble(false)}
        selected={values.Inmuebles}
        onSelect={inmuebles => {
          setOpenInmueble(false);
          setFieldValue(
            'Inmuebles',
            inmuebles.map(inmueble => ({
              ...inmueble,
              Discount: (
                values.Inmuebles.find(
                  item => item.InmuebleID === inmueble.InmuebleID,
                ) || { Discount: 0 }
              ).Discount,
            })),
          );
        }}
      />
    </>
  );
}

DetailForm.propTypes = {
  form: PropTypes.object,
};

export default DetailForm;
