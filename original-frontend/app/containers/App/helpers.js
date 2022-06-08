import { PERMISSIONS } from './constants';

export const Storage = {
  get: (name, defaultValue = null) =>
    window.sessionStorage.getItem(name) ||
    window.localStorage.getItem(name) ||
    defaultValue,
  set: (name, value, remember = false) =>
    remember
      ? window.localStorage.setItem(name, value)
      : window.sessionStorage.setItem(name, value),
  remove: name => {
    window.sessionStorage.removeItem(name);
    window.localStorage.removeItem(name);
  },
};

export const Auth = {
  get: (field = null) => {
    let user = Storage.get('auth');
    user = user ? JSON.parse(user) : null;
    if (user && field && user[field] !== undefined) {
      return user[field];
    }
    return user;
  },
  hasPermission: permission => {
    const permissions = Auth.get('user_permissions');
    return permissions.includes(permission);
  },

  hasOneOfPermissions: permissions => {
    const userPermissions = Auth.get('user_permissions');
    let hasPermission = false;
    userPermissions.forEach(permission => {
      if (permissions.includes(permission)) hasPermission = true;
    });
    return hasPermission;
  },
  hasOneOfRoles: roles => {
    const userRoles = Auth.get('user').Roles.map(role => role.Name);

    let hasRole = false;
    userRoles.forEach(role => {
      if (roles.includes(role)) hasRole = true;
    });
    return hasRole;
  },
  isAdmin: () => Auth.hasOneOfRoles(['Administrador']),
  isPM: () => Auth.hasOneOfRoles(['Jefe de Proyecto']),
  isGerenteComercial: () => Auth.hasOneOfRoles(['Gerente Comercial']),
  isLegal: () => Auth.hasOneOfRoles(['Legal']),
  isFinanza: () => Auth.hasOneOfRoles(['Finanza']),
  isVendor: () => Auth.hasOneOfRoles(['Vendedor']),
  isAC: () => Auth.hasOneOfRoles(['Asistente Comercial']),
  isInmobiliario: () => Auth.hasOneOfRoles(['Inmobiliario']),
  isES: () => Auth.hasOneOfRoles(['Escritura']),
  canManageProject: () =>
    Auth.hasOneOfPermissions([PERMISSIONS[12], PERMISSIONS[14]]),

  getUser: () => {
    const user = Storage.get('auth');
    return user ? JSON.parse(user) : null;
  },

  logIn: (user, remember = false) =>
    Storage.set('auth', JSON.stringify(user), remember),

  logout: () => {
    Storage.remove('auth');
    window.location = '/';
  },

  isLoggedIn: () => Auth.getUser() != null,
};

export const isUserProjectType = (
  userProjectType = '',
  project = window.project,
) => {
  if (!project) return false;
  const { UsersProyecto = [] } = project;
  return (
    !!UsersProyecto.find(user => user.UserID === Auth.get('user').UserID) &&
    Auth.hasOneOfRoles([userProjectType])
  );
};

export const getContactType = (type = 'email') => {
  const { contactTypes = [] } = window.preload;
  const ContactInfoType =
    contactTypes.find(item => item.Name.toLowerCase() === type.toLowerCase()) || {};

  return {
    ...ContactInfoType,
    ContactInfoTypeName: ContactInfoType.Name,
    ContactInfoType: ContactInfoType.Name,
  };
};

export const getContactTypeByID = id => {
  const { contactTypes = [] } = window.preload;
  const ContactInfoType =
    contactTypes.find(item => item.ContactInfoTypeID === id) || {};

  return {
    ...ContactInfoType,
    ContactInfoTypeName: ContactInfoType.Name,
    ContactInfoType: ContactInfoType.Name,
  };
};

export const getUserProjectType = (
  type = 'Jefe de Proyecto',
  userProjectTypes = [],
  getField = false,
) => {
  const userProjectType = userProjectTypes.find(
    item => item.Name.toLowerCase() === type.toLowerCase(),
  );
  if (userProjectType) {
    return getField ? userProjectType[getField] : userProjectType;
  }
  return null;
};

export const getDescendantProp = (obj, path) => {
  const arr = path.split('.');
  let value = obj;
  while (arr.length) {
    value = value[arr.shift()];
    if (!value) break;
  }
  return value;
};

export const setDescendantProp = (obj, path, value) => {
  const arr = path.split('.');
  let string = obj;
  while (arr.length) {
    string += `[${arr.shift()}]`;
  }
  eval(`${string}=${value}`);
};

export const stringToBoolean = (string = null) => {
  if (string === null) return null;
  if (typeof string === 'string')
    switch (string.toLowerCase().trim()) {
      case 'true':
      case 'yes':
      case '1':
        return true;
      case 'false':
      case 'no':
      case '0':
        return false;
      default:
        return Boolean(string);
    }
  return string;
};

export const getFileName = (url = '') => {
  if (!url) return '';
  return url.substr(url.lastIndexOf('/') + 1);
};

export const formatNumber = (number, fraction = 2) => {
  if (number === '') return '';
  return parseFloat(parseFloat(number).toFixed(fraction));
};

export const isContadoPayment = PayType => {
  const { paymentUtils } = window.preload;
  return (
    PayType === paymentUtils[0].PayTypeID || PayType === paymentUtils[0].Name
  );
};

export const isCreditPayment = PayType => {
  const { paymentUtils } = window.preload;
  return (
    PayType === paymentUtils[1].PayTypeID || PayType === paymentUtils[1].Name
  );
};

export const convertUfToPeso = uf =>
  formatNumber(uf * window.preload.uf.valor, 0);

export const convertStringToNumber = str => {
  if (str) {
    const formatNumbers = str.replace(/[^0-9.,]+/g, '').split(',');
    formatNumbers[0] = formatNumbers[0].replace(/[^0-9]+/g, '');
    if (formatNumbers.length > 1) return parseFloat(formatNumbers.join('.'));
    return parseInt(formatNumbers[0], 10);
  }

  return str;
};

export const numberFormat = value => {
  const formatter = new Intl.NumberFormat('es-CL');
  return formatter.format(value);
};
