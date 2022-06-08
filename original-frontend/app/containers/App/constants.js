/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const { API_ROOT } = process.env;

export const FETCH_PRELOAD_DATA = 'app/containers/App/FETCH_PRELOAD_DATA';
export const FETCH_PRELOAD_DATA_ERROR =
  'app/containers/App/FETCH_PRELOAD_DATA_ERROR';
export const FETCH_PRELOAD_DATA_SUCCESS =
  'app/containers/App/FETCH_PRELOAD_DATA_SUCCESS';

export const LOGOUT = 'app/containers/App/LOGOUT';

export const PERMISSIONS = [
  'Administra roles',
  'Administra usuarios',
  'Administra inmobiliarias',
  'Es representante inmobiliario',
  'Consulta roles',
  'Consulta usuarios',
  'Consulta inmobiliarias',
  'Es jefe de proyectos',
  'Es vendedor',
  'Es asistente comercial',
  'Consulta parámetros',
  'Administra parámetros',
  'Administra proyectos',
  'Aprueba proyectos',
  'Monitorea proyectos',
  'Es aprobador inmobiliario',
  'Consulta proyectos',
  'Administra clientes',
  'Consulta clientes',
  'Aprueba inmuebles',
  'Recepciona garantias',
  'Aprueba confeccion promesa',
  'Confecciona maquetas',
];

export const USER_PROYECTO_TYPE = [
  'Representante',
  'Jefe de Proyecto',
  'Vendedor',
  'Asistente Comercial',
  'Aprobador',
  'Marketing',
  'Legal',
  'Finanza',
  'Autorizador',
];

export const PROYECTO_DOCUMENT_STATE = ['Pendiente', 'Agregado'];

export const PROYECTO_APPROVAL_STATE = [
  'Pendiente, falta información',
  'Pendiente, falta aprobación legal',
  'Pendiente, falta aprobación gerencia',
  'Aprobado',
];

export const PROYECTO_LOG_TYPE = [
  'Creación',
  'Aprobación legal',
  'Modificación',
  'Modificación restricciones',
  'Cancelación',
  'Rechazo legal',
  'Confección Plan De Medios',
  'Confección Borrador Promesa',
  'Ingreso Comisiones',
  'Aprobación gerencia',
  'Rechazo gerencia',
  'Inicio de Ventas',
];

export const RESERVA_STATE = [
  'Pendiente información',
  'Pendiente control',
  'Oferta',
  'Rechazada',
  'Cancelada',
  'Modificación Oferta By JP',
  'Modificación Oferta By VN',
];

export const OFERTA_STATE = [
  'Pendiente aprobaciones',
  'Pendiente legal',
  'Rechazada por legal',
  'Promesa',
  'Cancelada',
  'Modificado',
  'Desistimiento',
];

export const APROBACION_INMOBILIARIA_STATE = [
  'Pendiente jefe de proyecto',
  'Pendiente aprobacion inmobiliaria',
  'Aprobada',
  'Rechazada',
  'Pendiente autorizador inmobiliario',
  'Rechazada autorizador',
  'Pendiente aprobador inmobiliario',
  'Rechazada aprobador',
];

export const PRE_APROBACION_CREDITO_STATE = [
  'No aplica',
  'Pendiente asistente comercial',
  'Aprobada',
  'Rechazada',
];

export const RECEPCION_GARANTIA_STATE = [
  'Pendiente recepcion en finanzas',
  'Aprobada',
  'Refund',
];

export const PROMESA_STATE = [
  'Pendiente Confección', // #0 -> #9
  'Pendiente firma comprador', // #1 -> #20 or #1->#13
  'Pendiente envío a inmobiliaria', // # 2 -> #3
  'Pendiente factura', // #3 -> 4
  'Pendiente firma inmobiliaria', // #4 -> #5 or #6
  'Pendiente legalizacion', // #5 -> #6
  'Pendiente envio de copias', // # 6 -> #7 or #8
  'Pendiente escrituracion', // # 7
  'Escritura', // #8
  'Pendiente AC aprobación de maqueta', // #9 -> #11
  'Promesa modificada', // #10 -> #0
  'Pendiente JP aprobación de maqueta', // #11 -> #1
  'Pendiente Aprobación Firma', // #12 -> #2
  'Pendiente revisión negociación', // #13 -> #14     send condition to JP review
  'Pendiente aprobación negociación', // # 14 -> 15 or 1     wait IN approve condition. If reject -> #15, if approve -> #1
  'Rechazada Inmobiliaria', // #15
  'Desistimiento', // # 16 -> PROMESA_DESISTIMIENTO_STATE + PROMESA_REFUND_STATE
  'Resciliación', // # 17 -> PROMESA_RESCILIACION_STATE + PROMESA_REFUND_STATE
  'Resolución', // #18 -> PROMESA_RESOLUCION_STATE + PROMESA_REFUND_STATE
  'Modificación', // #19 -> PROMESA_MODIFICACION_STATE + PROMESA_REFUND_STATE
  'Envío a cliente', // #20 -> #12
  'Rechazada'
];

export const PROMESA_DESISTIMIENTO_STATE = ['Pendiente aprobación'];

export const PROMESA_RESCILIACION_STATE = [
  'Pendiente JP aprobación',
  'Pendiente GC aprobación',
  'Pendiente IN aprobación',
  'Pendiente confección de resciliación',
  'Pendiente firma de resciliación',
];

export const PROMESA_RESOLUCION_STATE = [
  'Pendiente JP aprobación',
  'Pendiente GC aprobación',
  'Pendiente IN aprobación',
  'Pendiente confección de resolución',
];

export const PROMESA_MODIFICACION_STATE = [];

export const PROMESA_REFUND_STATE = ['Pendiente devolución garantía', 'Refund'];

export const REQUIRED_DOCUMENTS = [
  'DocumentCotizacion',
  'DocumentPagoGarantia',
  'DocumentFotocopiaCarnet',
];

export const VENTA_LOG_TYPE = [
  'Creacion reserva',
  'Reserva a control',
  'Aprobacion reserva',
  'Rechazo reserva',
  'Cancelacion reserva',
  'Modificacion reserva',
  'Creacion oferta',
  'Envio aprobacion inmobiliaria',
  'Aprobacion oferta',
  'Rechazo oferta',
  'Recepcion garantia',
  'Envio oferta a confeccion promesa',
  'Aprobacion confeccion promesa',
  'Rechazo confeccion promesa',
  'Cancelacion oferta',
  'Modificacion oferta',
  'Creacion cotizacion',
  'Creacion promesa',
  'Aprobacion maqueta',
  'Rechazo maqueta',
  'Aprobacion promesa',
  'Rechazo promesa',
  'Registro envio promesa a inmobiliaria',
  'Registro firma de inmobiliaria',
  'Legalizacion promesa',
  'Envio copias',
  'Modificacion promesa(Antes de firma comprador)',
  'Modificacion promesa(Despues de firma comprador)',
  'Rechazo Modificacion oferta',
  'Aprobacion Modificacion oferta',
  'Refund garantia',
  'AC Aprobacion maqueta',
  'Envio a negociación',
  'Envio negociación a inmobiliaria',
  'Aprobacion a negociación',
  'Rechazo a negociación',
  'Register Desistimiento',
  'Aprobacion Desistimiento',
  'Envío promesa a cliente',
  'Oferta Desistimiento',
];

export const FACTURA_INMUEBLE_TYPE = [
  'Promesa',
  'Escritura',
  'Cierre de gestion',
];

export const FACTURA_INMUEBLE_STATE = ['Pendiente factura', 'Facturado'];

export const FACTURA_STATE = ['Pendiente pago', 'Pagada'];

export const ESCRITURA_STATE = {
  Recep_Mun: 0,
  Fechas_Avisos: 1,
  Fechas_Avisos_I: 1.1,
  Fechas_Avisos_II: 1.2,
  A_Comercial: 2,
  Apr_Creditos_I: 2.1,
  Apr_Creditos_II: 2.2,
  ETitulo_Tasacion: 3,
  Matrices_Escrit: 4,
  Matrices_Escrit_I: 4.1,
  Matrices_Escrit_II: 4.2,
  Rev_Escrit: 5,
  Rev_Escrit_I: 5.1,
  Rev_Escrit_II: 5.2,
  Notaria: 6,
  Notaria_I: 6.1,
  Notaria_II: 6.2,
  Notaria_III: 6.3,
  Notaria_IV: 6.4,
  Notaria_IV_I: 6.41,
  Notaria_IV_II: 6.42,
  Notaria_V: 6.5,
  Notaria_VI: 6.6,
  Notaria_VII: 6.7,
  Notaria_VII_I: 6.71,
  Notaria_VII_II: 6.72,
  Notaria_VII_III: 6.73,
  Notaria_VII_IV: 6.74,
  Notaria_VII_V: 6.75,
  Notaria_VIII: 6.8,
  Notaria_VIII_I: 6.81,
  Notaria_VIII_II: 6.82,
  Notaria_VIII_III: 6.83,
  Notaria_VIII_IV: 6.84,
  Notaria_VIII_V: 6.85,
  Notaria_VIII_VI: 6.86,
  Notaria_VIII_VII: 6.87,
  Notaria_VIII_VIII: 6.88,
  Notaria_VIII_IX: 6.89,
  Success: 7
}

export const getEscrituraAction = (step) => {
  switch(step){
    case ESCRITURA_STATE.Recep_Mun:
      return 'Ingreso Fechas de Presentación de Recepción Municipal';
    case ESCRITURA_STATE.Fechas_Avisos_I:
      return 'Revisión de Promesas a Escriturar';
    case ESCRITURA_STATE.Fechas_Avisos_II:
      return 'Notificación al Comprador';
    case ESCRITURA_STATE.Apr_Creditos_I:
      return 'Ingreso Fechas Escrituración';
    case ESCRITURA_STATE.Apr_Creditos_II:
      return 'Aprobación Créditos Hipotecarios';
    case ESCRITURA_STATE.ETitulo_Tasacion:
      return 'Ingreso Fechas de Envío Informes de Título'; //Aprobaciónes Informes de Título y Tasaciónes Bancarias
    case ESCRITURA_STATE.Matrices_Escrit:
    case ESCRITURA_STATE.Matrices_Escrit_I:
    case ESCRITURA_STATE.Matrices_Escrit_II:
      return 'Envío Matriz de Escritura';
    case ESCRITURA_STATE.Rev_Escrit:
    case ESCRITURA_STATE.Rev_Escrit_I:
    case ESCRITURA_STATE.Rev_Escrit_II:
      return 'Revisión Datos Matriz';
    case ESCRITURA_STATE.Notaria_I:
    case ESCRITURA_STATE.Notaria_II:
    case ESCRITURA_STATE.Notaria_III:
      return ' Chequeo Proceso de Firma';
    case ESCRITURA_STATE.Notaria_IV:
    case ESCRITURA_STATE.Notaria_IV_I:
    case ESCRITURA_STATE.Notaria_IV_II:
    case ESCRITURA_STATE.Notaria_V:
      return 'Ingreso Pagos de Saldos';
    case ESCRITURA_STATE.Notaria_VI:
    case ESCRITURA_STATE.Notaria_VII:
    case ESCRITURA_STATE.Notaria_VII_I:
    case ESCRITURA_STATE.Notaria_VII_II:
    case ESCRITURA_STATE.Notaria_VII_III:
    case ESCRITURA_STATE.Notaria_VII_IV:
    case ESCRITURA_STATE.Notaria_VII_V:
    case ESCRITURA_STATE.Notaria_VIII:
    case ESCRITURA_STATE.Notaria_VIII_I:
    case ESCRITURA_STATE.Notaria_VIII_II:
    case ESCRITURA_STATE.Notaria_VIII_III:
    case ESCRITURA_STATE.Notaria_VIII_IV:
    case ESCRITURA_STATE.Notaria_VIII_V:
    case ESCRITURA_STATE.Notaria_VIII_VI:
    case ESCRITURA_STATE.Notaria_VIII_VII:
    case ESCRITURA_STATE.Notaria_VIII_VIII:
    case ESCRITURA_STATE.Notaria_VIII_IX:
      return 'Facturación';
    default:
      return 'Success';
  }
}