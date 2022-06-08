import FileSaver from 'file-saver';
import { PROMESA_STATE, PROMESA_REFUND_STATE } from 'containers/App/constants';
import { UserProject } from 'containers/Project/helper';
import { getFileName } from 'containers/App/helpers';

export const initReports = () =>
  PROMESA_STATE.reduce(
    (acc, state) => {
      acc[state] = { Label: state, Count: 0 };
      return acc;
    },
    {
      All: { Label: 'Todas', Count: 0 },
    },
  );

export const getReports = (entities = []) =>
  entities.reduce((acc, item) => {
    acc.All.Count += 1;
    const key = item.PromesaState;
    acc[key] = acc[key] || {
      Label: key,
      Count: 0,
    };
    acc[key].Label = key;
    acc[key].Count += 1;
    return acc;
  }, initReports());

export const canEditConfeccionPromesa = promesa =>
  UserProject.isLegal() &&
  [PROMESA_STATE[0], PROMESA_STATE[9], PROMESA_STATE[10]].includes(
    promesa.PromesaState,
  );

export const isPendingApproveConfeccionPromesa = promesa =>
  (UserProject.isAC() || UserProject.isPM()) &&
  promesa.PromesaState === PROMESA_STATE[9];

export const canEditPromesa = () => false;

export const canRefund = promesa =>
  UserProject.isFinanza() &&
  ((promesa.PromesaState === PROMESA_STATE[16] &&
    promesa.PromesaDesistimientoState === PROMESA_REFUND_STATE[0]) ||
    (promesa.PromesaState === PROMESA_STATE[17] &&
      promesa.PromesaResciliacionState === PROMESA_REFUND_STATE[0]) ||
    (promesa.PromesaState === PROMESA_STATE[18] &&
      promesa.PromesaResolucionState === PROMESA_REFUND_STATE[0]) ||
    (promesa.PromesaState === PROMESA_STATE[19] &&
      promesa.PromesaModificacionState === PROMESA_REFUND_STATE[0]));

export const isRefund = promesa =>
  promesa.PromesaDesistimientoState === PROMESA_REFUND_STATE[1] ||
  promesa.PromesaResciliacionState === PROMESA_REFUND_STATE[1] ||
  promesa.PromesaResolucionState === PROMESA_REFUND_STATE[1] ||
  promesa.PromesaModificacionState === PROMESA_REFUND_STATE[1];

export const getExtraPromesaState = promesa => {
  switch (promesa.PromesaState) {
    case PROMESA_STATE[16]:
      return promesa.PromesaDesistimientoState;
    case PROMESA_STATE[17]:
      return promesa.PromesaResciliacionState;
    case PROMESA_STATE[18]:
      return promesa.PromesaResolucionState;
    case PROMESA_STATE[19]:
      return promesa.PromesaModificacionState;
    default:
      return promesa.PromesaState;
  }
};

export const isNoteCredit = promesa =>
  !!(
    [PROMESA_STATE[16], PROMESA_STATE[17], PROMESA_STATE[18]].includes(
      promesa.PromesaState,
    ) && promesa.DateRegresoPromesa
  );

export const doQuery = (entities, query = {}) => {
  if (!entities) return [];
  let queriedEntities = [...entities];
  /* sort */
  const { sort } = query;
  if (sort) {
    queriedEntities = queriedEntities.sort((a, b) => {
      let aa = a[sort.by], bb = b[sort.by];
      if (sort.by === "Cliente") {
        aa = `${aa['Name']} ${aa['LastNames']} ${aa['Rut']}`;
        bb = `${bb['Name']} ${bb['LastNames']} ${bb['Rut']}`;
      }
      if (aa.toLowerCase() > bb.toLowerCase())
        return sort.asc ? 1 : -1;
      if (aa.toLowerCase() < bb.toLowerCase())
        return sort.asc ? -1 : 1;
      return 0;
    });
  }

  return queriedEntities;
};

export const isReadyData = ( project = {}) => {
  if(!project) return false;
  let comments = '';
  const entraga_in = (project.EntregaInmediata)? (project.Aseguradora.AseguradoraID) &&
                                                  (project.Aseguradora.Aseguradora) &&
                                                  (project.Aseguradora.Amount)
                                                : true;
  if(!entraga_in)
    comments += ", Aseguradora";
  if(!project.Constructora)
    comments += ", Constructora";
  if(!project.InstitucionFinanciera)
    comments += ", Institución Financiera";
  if(!project.GuaranteeAmount)
    comments += ", Monto Reserva";
  // if(!project.GuaranteePercent)
  //   comments += ", Por ciento";
  if(comments)
    return comments.slice(2);
  return false;
};

export const documentDownload = (documents) => {
  if (documents.Cheques !== "") FileSaver.saveAs( documents.Cheques, "Cheques");
  if (documents.Promesa !== "") FileSaver.saveAs( documents.Promesa, "Promesa");
  if (documents.Planta !== "") FileSaver.saveAs( documents.Planta, "Planta");
}