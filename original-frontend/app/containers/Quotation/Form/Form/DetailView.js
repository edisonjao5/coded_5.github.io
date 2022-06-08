/**
 *
 * GeneralData
 *
 */
import React from 'react';
import { FormattedNumber } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'components/moment';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import { stringToBoolean } from 'containers/App/helpers';
import { calculates } from 'containers/Phases/FormaDePago/helper';
import { inmuebleLabel } from 'containers/Common/Inmueble/helper';
import { userFullname } from 'containers/Common/User/helper';
import { clientFullname } from 'containers/Common/Client/helper';

function DetailView({ values }) {
  const { ClienteProyecto = [] } = values.Cliente;
  const { total, discount } = calculates(values);
  const { quotationUtils } = window.preload;
  const finding = ClienteProyecto.find(
    item => item.ProyectoID === window.project.ProyectoID,
  );
  return (
    <Box collapse>
      <BoxHeader>
        <b>DETALLE</b>
      </BoxHeader>
      <BoxContent>
        <table className="table table-responsive-sm table-summary border-bottom">
          <tbody>
            {values.Inmuebles &&
              values.Inmuebles.map(inmueble => (
                <tr key={inmueble.InmuebleID}>
                  <td>
                    <b>{inmueble.InmuebleType}</b>
                  </td>
                  <td className="expand">{inmuebleLabel(inmueble)}</td>
                  <td className="sub-table">
                    <dl>
                      <dt>
                        <b>Valor UF</b>
                      </dt>
                      <dd>
                        <b>
                          <FormattedNumber value={inmueble.Price} />
                        </b>
                      </dd>
                      <dt>Descuentos UF</dt>
                      <dd>
                        <b>
                          {inmueble.Discount ?
                          <FormattedNumber
                            value={
                              ((inmueble.Discount || 0) / 100) * inmueble.Price
                            }
                          /> : null}
                        </b>
                      </dd>
                    </dl>
                  </td>
                </tr>
              ))}

            <tr className="resume">
              <td />
              <td className="expand" />
              <td className="sub-table">
                <dl>
                  <dt>Valor Total UF</dt>
                  <dd>
                    <b>
                      {total ? <FormattedNumber value={total} /> : null}
                    </b>
                  </dd>
                  <dt>Total Descuentos UF</dt>
                  <dd>
                    <b>
                      {discount > 0 && `-`}
                      {discount ? <FormattedNumber value={discount} /> : null}
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
      </BoxContent>
      <BoxContent>
        <ul className="row m-0 p-0">
          <li className="col-md-6 d-flex align-items-center my-2">
            <span
              className="font-14-rem color-regular mr-3"
              style={{ width: '9em' }}
            >
              <b>Vendedor</b>
            </span>
            <span className="font-14-rem color-regular">
              {userFullname(values.Vendedor)}
            </span>
          </li>

          <li className="col-md-6 d-flex align-items-center my-2">
            <span
              className="font-14-rem color-regular mr-3"
              style={{ width: '9em' }}
            >
              <b>Cliente</b>
            </span>
            <span className="font-14-rem color-regular">
              {clientFullname(values.Cliente)}
            </span>
          </li>

          <li className="col-md-6 d-flex align-items-center my-2">
            <span
              className="font-14-rem color-regular mr-3"
              style={{ width: '9em' }}
            >
              <b>Fecha</b>
            </span>
            <span className="font-14-rem color-regular">
              {moment(values.DateFirmaPromesa).format('DD MMM YYYY')}
            </span>
          </li>
          {values.CotizacionType === quotationUtils.CotizacionTypes[0].Name && (
            <li className="col-md-6 d-flex align-items-center my-2">
              <span
                className="font-14-rem color-regular mr-3"
                style={{ width: '9em' }}
              >
                <b>Medio de Llegada</b>
              </span>
              <span className="font-14-rem color-regular">
                {!values.CotizacionID &&
                  values.Cliente.FindingTypeID &&
                  quotationUtils.FindingTypes.find(
                    item => item.FindingTypeID === values.Cliente.FindingTypeID,
                  ).Name}
                {values.CotizacionID && finding && finding.FindingType}
              </span>
            </li>
          )}

          {values.CotizacionType === quotationUtils.CotizacionTypes[1].Name && (
            <>
              <li className="col-md-6 d-flex align-items-center my-2">
                <span
                  className="font-14-rem color-regular mr-3"
                  style={{ width: '9em' }}
                >
                  <b>Interés del Cliente</b>
                </span>
                <span className="font-14-rem color-regular">
                  {stringToBoolean(values.IsNotInvestment)
                    ? 'Vivienda'
                    : 'Inversión'}
                </span>
              </li>
              <li className="col-md-6 d-flex align-items-center my-2">
                <span
                  className="font-14-rem color-regular mr-3"
                  style={{ width: '9em' }}
                >
                  <b>Medio de Llegada</b>
                </span>
                <span className="font-14-rem color-regular">
                  {values.ContactMethodTypeID &&
                    quotationUtils.ContactMethodTypes.find(
                      item =>
                        item.ContactMethodTypeID === values.ContactMethodTypeID,
                    ).Name}
                </span>
              </li>
            </>
          )}
        </ul>
      </BoxContent>
    </Box>
  );
}

DetailView.propTypes = {
  values: PropTypes.object,
};

export default DetailView;
