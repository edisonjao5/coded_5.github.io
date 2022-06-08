import React from 'react';
import { Link } from 'react-router-dom';
import { getContactType, numberFormat } from 'containers/App/helpers';
import ExUsers from 'components/ExForm/ExUsers';
import ExConstructoras from 'components/ExForm/ExConstructoras';
import ExInmobiliarias from 'components/ExForm/ExInmobiliarias';
import RealEstateView from 'containers/Common/RealEstate/RealEstateView';
import moment from 'components/moment';
import ExAseguradoras from 'components/ExForm/ExAseguradoras';
import ExInstitucionFinancieras from 'components/ExForm/ExInstitucionFinancieras';
import IntlFormatNumber from 'components/IntlFormat/Number';

import { userFullname } from '../Common/User/helper';

const buildUsersField = (form, options = {}) => {
  const { tmp } = form.values;
  const {
    userProyectoType,
    label,
    roles,
    multiple = false,
    query = {},
    required = true,
  } = options;
  let selected = tmp.UsersProyecto[userProyectoType];
  if (!Array.isArray(selected) && selected) selected = [selected];
  return {
    ...options,
    label,
    required,
    name: `tmp.UsersProyecto[${userProyectoType}]`,
    multiple,
    value: selected,
    view: (selected || []).map(user => (
      <div
        className="text-nowrap"
        style={{ textOverflow: 'ellipsis' }}
        key={user.UserID}
      >
        {userFullname(user)}
      </div>
    )),
    query: {
      roles: roles || userProyectoType,
      selected,
      ...query,
    },
    Component: ExUsers,
  };
};

export const getGeneralFields = form => {
  const {
    ContactInfo = [],
    EtapaState,
    InmobiliariaID,
    Inmobiliaria,
  } = form.values;
  /* prepare contact type */
  const phoneContactType = getContactType('phone');
  const emailContactType = getContactType('email');
  // index email
  let emailIndex = ContactInfo.findIndex(
    contact => contact.ContactInfoType === 'Email',
  );
  // make sure has 2 phones + 1 email
  if (emailIndex < -1) {
    ContactInfo.push({
      ...emailContactType,
      Value: '',
    });
    emailIndex = ContactInfo.length - 1;
  }
  // index phones
  if (ContactInfo[1] === undefined)
    ContactInfo.push({
      ...phoneContactType,
      Value: '',
    });
  if (ContactInfo[2] === undefined)
    ContactInfo.push({
      ...phoneContactType,
      Value: '',
    });
  const phones = ContactInfo.reduce((acc, contact, index) => {
    if (contact.ContactInfoType === 'Phone') {
      acc.push(index);
    }
    return acc;
  }, []);

  const Address = [form.values.Address];
  if (form.values.Comuna) {
    Address.push(form.values.Comuna);
  }
  let Comuna;
  if (form.values.ComunaID && window.preload) {
    Comuna = window.preload.comunas.find(
      item => item.ComunaID === form.values.ComunaID,
    );
    Comuna = [Comuna.Provincia, Comuna.Regione].join(', ');
  }

  let InmobiliariaElm = '';
  if (InmobiliariaID) {
    const InmobiliariaLinkView = RealEstateView(({ onOpen }) => (
      <div className="d-flex align-items-center">
        <span className="font-14-rem mr-3" style={{ maxWidth: '13em' }}>
          {Inmobiliaria}
        </span>
        <Link
          to="/"
          className="btn-arrow font-14-rem"
          onClick={evt => {
            evt.preventDefault();
            onOpen();
          }}
        >
          <b>Ver ficha</b>
        </Link>
      </div>
    ));
    InmobiliariaElm = <InmobiliariaLinkView ID={InmobiliariaID} />;
  }

  return [
    {
      label: 'Nombre Proyecto',
      name: 'Name',
      maxlen: 40,
      required: true,
      placeholder: 'Ingrese el nombre',
    },
    {
      label: 'Abreviación Proyecto',
      name: 'Symbol',
      maxlen: 5,
      required: true,
      placeholder: 'Ej: JDF',
    },
    {
      label: 'Teléfono Fijo',
      type: 'tel',
      name: `ContactInfo.${phones[0]}.Value`,
      view:
        ContactInfo && ContactInfo[phones[0]]
          ? ContactInfo[phones[0]].Value
          : '',
      placeholder: '+56 2',
      pattern: '\\+[0-9]{11}',
      required: true,
    },
    {
      label: 'Teléfono Móvil',
      type: 'tel',
      name: `ContactInfo.${phones[1]}.Value`,
      view:
        ContactInfo && ContactInfo[phones[1]]
          ? ContactInfo[phones[1]].Value
          : '',
      placeholder: '+56 9',
      pattern: '\\+[0-9]{11}',
      required: true,
    },
    {
      label: 'Mail',
      type: 'email',
      name: `ContactInfo.${emailIndex}.Value`,
      view:
        ContactInfo && ContactInfo[emailIndex]
          ? ContactInfo[emailIndex].Value
          : '',
      required: true,
      placeholder: 'Ej: usuario@gmail.com',
    },
    {
      label: 'Dirección',
      name: 'Address',
      maxlen: 150,
      view: Address.join(', '),
      required: true,
      placeholder: 'Ej: Av La Florida 2087',
    },
    buildUsersField(form, {
      label: 'Jefe de Proyecto',
      userProyectoType: 'Jefe de Proyecto',
      required: true,
    }),
    {
      label: 'Comuna',
      name: 'ComunaID',
      view: Comuna || '',
      required: true,
      type: 'comunas',
    },
    {
      label: 'Estado de la Etapa',
      type: 'stageStates',
      name: 'EtapaStateID',
      view: EtapaState ? EtapaState.Name : '',
      required: true,
    },
    {
      label: 'Inmobiliaria',
      name: `InmobiliariaID`,
      view: InmobiliariaElm,
      Component: ExInmobiliarias,
      required: true,
    },
  ];
};

export const getCommercialFields = (form, { UsersInmobiliaria = [] } = {}) => {
  const {
    Arquitecto,
    Constructora,
    CotizacionDuration,
    GuaranteeAmount,
    DiscountMaxPercent,
    // EntregaInmediata,
    InstitucionFinanciera,
    IsSubsidy,
  } = form.values;

  return [
    /* Commercial Data */
    buildUsersField(form, {
      label: 'Asistente Comercial',
      userProyectoType: 'Asistente Comercial',
      required: false,
    }),
    buildUsersField(form, {
      label: 'Vendedor',
      userProyectoType: 'Vendedor',
      required: false,
    }),
    buildUsersField(form, {
      label: 'Representante Inmobiliaria',
      userProyectoType: 'Representante',
      multiple: true,
      query: {
        roles: [],
        mustIn: UsersInmobiliaria.filter(
          item => item.UserInmobiliariaType === 'Representante',
        ),
      },
      required: false,
    }),
    buildUsersField(form, {
      label: 'Aprobador Inmobiliaria',
      userProyectoType: 'Aprobador',
      multiple: true,
      query: {
        roles: [],
        mustIn: UsersInmobiliaria.filter(
          item => item.UserInmobiliariaType === 'Aprobador',
        ),
      },
      required: false,
    }),
    buildUsersField(form, {
      label: 'Autorizador Inmobiliaria',
      userProyectoType: 'Autorizador',
      multiple: true,
      query: {
        roles: [],
        mustIn: UsersInmobiliaria.filter(
          item => item.UserInmobiliariaType === 'Autorizador',
        ),
      },
      required: false,
    }),
    {
      label: 'Arquitecto',
      name: 'Arquitecto',
      view: Arquitecto || '',
      required: false,
    },
    buildUsersField(form, {
      label: 'Marketing',
      userProyectoType: 'Marketing',
      required: false,
    }),
    buildUsersField(form, {
      label: 'Legal',
      userProyectoType: 'Legal',
      required: false,
    }),
    buildUsersField(form, {
      label: 'Finanza',
      userProyectoType: 'Finanza',
      required: true,
      query: {
        roles: 'Finanza',
      },
    }),
    {
      label: 'Constructora',
      name: `ConstructoraID`,
      view: Constructora || '',
      Component: ExConstructoras,
      required: false,
    },
    {
      label: 'Duración Cotización',
      name: `CotizacionDuration`,
      view: `${CotizacionDuration || ''} Días`,
      type: 'number',
      required: false,
    },
    {
      label: 'Monto Reserva',
      name: `GuaranteeAmount`,
      view: <IntlFormatNumber prefix="$ " value={GuaranteeAmount} />,
      maskOptions: { prefix: '$ ' },
      type: 'currency',
      min: 0,
      required: true,
    },
    {
      label: 'Institucion Financiera',
      name: `InstitucionFinancieraID`,
      view: InstitucionFinanciera || '',
      Component: ExInstitucionFinancieras,
      required: true,
    },
    {
      label: 'Descuento limite cotización',
      name: `DiscountMaxPercent`,
      view: `${DiscountMaxPercent || 100}`,
      maskOptions: { prefix: '%' },
      type: 'number',
      required: true,
      min: 0,
      max: 100,
    },
    {
      label: 'Tiene Subsidio?',
      name: 'IsSubsidy',
      view: `${IsSubsidy || false}`,
      type: 'checkbox',
    },
  ];
};

export const getPolizaFields = entity => [
  /* Poliza Data */
  {
    label: 'Monto de la Póliza',
    name: `Aseguradora.Amount`,
    view: (
      <IntlFormatNumber
        prefix="UF "
        value={entity.Aseguradora ? entity.Aseguradora.Amount : ''}
      />
    ),
    maskOptions: { prefix: 'UF ' },
    type: 'currency',
    min: 0,
    required: true,
  },
  {
    label: 'Fecha Vencimiento',
    name: `Aseguradora.ExpirationDate`,
    view:
      entity.Aseguradora && entity.Aseguradora.ExpirationDate
        ? moment(entity.Aseguradora.ExpirationDate).format('DD MMM YYYY')
        : '',
    required: true,
    type: 'datepicker',
  },
  {
    label: 'Ente que da la Póliza',
    name: `Aseguradora.AseguradoraID`,
    view:
      entity && entity.Aseguradora.Aseguradora
        ? entity.Aseguradora.Aseguradora
        : '',
    required: true,
    Component: ExAseguradoras,
  },
];

export const getPaymentFields = (form, type) => {
  const { values } = form;

  return [
    {
      label: 'PIE / Monto Firma Promesa',
      name: `${type}MontoPromesa`,
      view: `${values[`${type}MontoPromesa`] || 20}`,
    },
    {
      label: 'PIE / Monto a Financiar en Cuotas',
      name: `${type}MontoCuotas`,
      view: `${values[`${type}MontoCuotas`] || 20}`,
    },
    {
      label: 'Monto Firma Escritura / Contado',
      name: `${type}MontoEscrituraContado`,
      view: `${values[`${type}MontoEscrituraContado`] || 20}`,
    },
    {
      label: 'Ahorro Plus',
      name: `${type}AhorroPlus`,
      view: `${values[`${type}AhorroPlus`] || 20}`,
    },
    {
      label: 'Ahorro Plus Máximos Descuentos',
      name: `${type}AhorroPlusMaxDiscounts`,
      view: `${values[`${type}AhorroPlusMaxDiscounts`] || 20}`,
    },
  ];
};

export const getCuotasFields = entity => [
  /* Cuotas Data */
  {
    label: 'Máximo Cuotas',
    name: 'MaxCuotas',
    view: `${parseInt(numberFormat(entity.MaxCuotas), 10) || 0}`,
    value: `${parseInt(numberFormat(entity.MaxCuotas), 10) || 0}`,
    type: 'number',
    max: 24,
    min: 0,
  },
];

export const getMetasFields = entity => [
  /* Metas Data */
  {
    label: 'Metas UF',
    name: 'MetasUf',
    view: `${numberFormat(entity.MetasUf) || 0}`,
    value: `${numberFormat(entity.MetasUf) || 0}`,
    type: 'number',
    min: 0,
  },
  {
    label: 'Metas Promesas',
    name: 'MetasPromesas',
    view: `${numberFormat(entity.MetasPromesas) || 0}`,
    type: 'number',
    min: 0,
  },
];
