import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { formatNumber } from 'containers/App/helpers';
import moment from 'components/moment';

export const calculate = ( datas ) => {    
  let totalPrice = 0, 
      totalPromesas = 0;
  datas.forEach(meta_data => {
    totalPromesas++;
    const { Inmuebles=[] } = meta_data;
    const price = Inmuebles.reduce((acc, item) => acc + item.Price, 0);
    totalPrice += price;
  });
  return {
    promesas: totalPromesas,
    totalPrice: formatNumber(totalPrice), 
  };
};

export const fetchProjectExist = (projectId='', entities) => {
  let requestURL = '';
  if(projectId==="" && entities.length>0)
    requestURL = `${API_ROOT}/ventas/promesas/`;
  else
    requestURL = `${API_ROOT}/ventas/promesas/?q=${projectId}`;
  return request(requestURL).then(res => 
    calculate(res.filter(promesas=> moment(promesas.Date).isSame(new Date(), 'month')))
  );
}

export const fetchProjectMeta = (project={}, entities=[]) => {
  let metaPromesas = 0,
      metaPrice = 0;
  if (entities.length>0) {
    metaPromesas += entities.reduce((acc, item) => acc + item.MetasPromesas, 0);
    metaPrice += entities.reduce((acc, item) => acc + item.MetasUf, 0);
  } else{
    metaPromesas = project.MetasPromesas;
    metaPrice = project.MetasUf;    
  }
  return {
    metaPrice: formatNumber(metaPrice),     
    metaPromesas: metaPromesas,     
  }
}
