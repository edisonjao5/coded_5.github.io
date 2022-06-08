import { Auth } from 'containers/App/helpers';
import { UserProject } from '../helper';

export const canUpdate = (project = {}) =>
  (UserProject.isAC(project) || UserProject.isPM(project)) &&
  Auth.canManageProject();

export const mustUpdate = (project = {}) => {
  const { Aseguradora = {} } = project;

  return (
    !Aseguradora.AseguradoraID &&
    (UserProject.isAC(project) ||
      UserProject.isPM(project) ||
      Auth.isGerenteComercial())
  );
};

export const isEmpty = (project = {}) => {
  const { Aseguradora = {} } = project;

  return !Aseguradora.AseguradoraID;
};
