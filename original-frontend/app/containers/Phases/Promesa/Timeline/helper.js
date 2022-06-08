import { PROMESA_STATE } from 'containers/App/constants';

export const getStepTimeline = ({
  DateEnvioPromesa,
  DateRegresoPromesa,
  DateLegalizacionPromesa,
  DateEnvioCopias,
  PromesaState,
}) => {
  if (DateEnvioCopias) return 5;
  if (DateLegalizacionPromesa) return 4;
  if (DateRegresoPromesa) return 3;

  if (
    (DateEnvioPromesa && PromesaState === PROMESA_STATE[2]) ||
    PromesaState === PROMESA_STATE[4]
  )
    return 2;

  //if (DateEnvioPromesa) return 2;
  if (DateEnvioPromesa) return 1;
  return 0;
};
