import { getContactType } from 'containers/App/helpers';
import { USER_PROYECTO_TYPE } from '../App/constants';

export default function model(project = {}) {
  const phoneContactType = getContactType('phone');
  const emailContactType = getContactType('email');
  const UsersProyecto = (project.UsersProyecto || []).map(user => ({
    ...user,
    UserProyectoTypeID: user.UserProyectoType,
  }));
  const EtapaStateID =
    project.EtapaStateID ||
    (project.EtapaState || { EtapaStateID: '' }).EtapaStateID;
  // merge phone
  const ContactInfo = [
    {
      ...phoneContactType,
      Value: '',
    },
    {
      ...phoneContactType,
      Value: '',
    },
  ];
  (
    (project.ContactInfo || project.Contact || []).filter(
      contact => contact.ContactInfoType === 'Phone',
    ) || []
  ).forEach((contact, index) => {
    ContactInfo[index] = {
      ...phoneContactType,
      Value: contact.Value ? contact.Value : '+56',
    };
  });
  // merge email
  ContactInfo[2] = (project.ContactInfo || project.Contact || []).find(
    contact => contact.ContactInfoType === 'Email',
  ) || {
    ...emailContactType,
    Value: '',
  };

  const {
    ProyectoID,
    Name = '',
    Arquitecto = '',
    Symbol = '',
    Address = '',
    InmobiliariaID = '',
    EntregaInmediata = 0,
    InstitucionFinancieraID,
    ConstructoraID,
    ComunaID = '',
    CotizacionDuration,
    GuaranteeAmount,
    GuaranteePercent = 20,
    Aseguradora = {},
    MetasUf = 0,
    MetasPromesas = 0,
  } = project;
  return {
    ...project,
    ProyectoID,
    Name,
    Arquitecto,
    Symbol,
    ContactInfo,
    Address,
    UsersProyecto,
    EtapaStateID,
    EntregaInmediata,
    InmobiliariaID,
    InstitucionFinancieraID,
    ConstructoraID,
    ComunaID,
    CotizacionDuration,
    GuaranteeAmount,
    GuaranteePercent,
    Aseguradora,
    MetasUf,
    MetasPromesas,
    tmp: {
      UsersProyecto: UsersProyecto.reduce((acc, user) => {
        if (
          ['Representante', 'Aprobador', 'Autorizador'].includes(
            user.UserProyectoType,
          )
        ) {
          acc[user.UserProyectoType] = acc[user.UserProyectoType] || [];
          acc[user.UserProyectoType].push(user);
        } else {
          acc[user.UserProyectoType] = user;
        }
        return acc;
      }, USER_PROYECTO_TYPE.reduce((bcc, userType) => ({ ...bcc, [userType]: '' }), {})),
    },
  };
}
