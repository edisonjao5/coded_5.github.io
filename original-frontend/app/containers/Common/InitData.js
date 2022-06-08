/**
 *
 * InitData
 *
 */

import React from 'react';
import Project from 'containers/Project/Init';
import User from './User/init';
import Client from './Client/init';
import ProjectLog from './ProjectLog/init';
import RealEstate from './RealEstate/init';
import Aseguradora from './Aseguradora/init';
import StageState from './StageState';
import UserInmobiliaria from './UserInmobiliaria';
import Inmueble from './Inmueble/init';
import Restriction from './Restriction/init';
import InstitucionFinanciera from './InstitucionFinanciera/init';

const Datas = {
  user: User,
  client: Client,
  userinmobiliaria: UserInmobiliaria,
  stagestate: StageState,
  realestate: RealEstate,
  aseguradora: Aseguradora,
  institucionfinanciera: InstitucionFinanciera,
  project: Project,
  projectlog: ProjectLog,
  inmueble: Inmueble,
  restriction: Restriction,
};

const InitData = LoadData =>
  Object.keys(LoadData).map(loadData => {
    const Data = Datas[loadData.toLowerCase()];
    const props = LoadData[loadData];
    if (Data)
      return (
        <Data key={loadData} {...(typeof props === 'object' ? props : {})} />
      );
    return null;
  });

export default InitData;
