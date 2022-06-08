import moment from 'components/moment';
import { formatNumber } from 'containers/App/helpers';

export const SortPendingAction = (actions = {}) => {
  return actions.sort(function (a, b) {
    return new Date(b.Date) - new Date(a.Date);
  });
}

export const PendingUserAction = (User, Actions) => {
  let user_action = [];
  let is_valid = false;
  Actions.forEach(action => {
    let temp = action;
    if (User.UserID == temp.ApprovedUserInfo.UserID) {
      is_valid = true
      if (user_action[temp.ProyectoID] === undefined) {
        user_action[temp.ProyectoID] = [];
      }
      const mainaction = user_action[temp.ProyectoID];
      const dateAgo = moment().diff(temp.Date, 'days');
      temp['go_date'] = (mainaction.length > 0) ?
        (mainaction[mainaction.length - 1]['go_date'] + dateAgo) :
        dateAgo;
      user_action[temp.ProyectoID].push(temp);
    }
  });
  user_action['is_valid'] = is_valid;
  return user_action;
}

export const SortUserPendingAction = (AllUser, PendingActions) => {
  let ControlUser = [];
  AllUser.forEach(user => {
    const user_action = PendingUserAction(user, PendingActions)
    if (user_action['is_valid']) {
      for (let key in user_action) {
        if (key !== 'is_valid') {
          const pendientes = user_action[key].length;
          const go_dais = user_action[key][pendientes - 1].go_date;
          const average = (pendientes === 0 || go_dais === 0) ? 0 : formatNumber(pendientes / go_dais);
          const User = user_action[key][0].ApprovedUserInfo;
          const Sort_Date = user_action[key].length > 1 ? SortPendingAction(user_action[key]) : user_action[key];
          const useraction = {
            Pendientes: pendientes,
            Dias: go_dais,
            Average: average,
            UserName: (User.Name + ' ' + User.LastNames),
            Role: User.Roles[0].Name,
            Date: Sort_Date[0].Date
          }
          ControlUser.push(useraction)
        }
      }
    }
  })
  return ControlUser;
}


export const doQuery = (entities, query = {}) => {
  if (!entities) return [];
  /* sort */
  const { sort, modal } = query;
  let queriedEntities = (modal || (sort.by === 'Date')) 
                        ? [...entities] 
                        : [...entities].slice(0,2);
  if (sort) {
    queriedEntities = queriedEntities.sort((a, b) => {
      if ((sort.by === 'Role') || (sort.by === 'UserName')) {
        if (a[sort.by].toLowerCase() > b[sort.by].toLowerCase())
          return sort.asc ? 1 : -1;
        if (a[sort.by].toLowerCase() < b[sort.by].toLowerCase())
          return sort.asc ? -1 : 1;
      } else if ((sort.by === 'Date')) {
        if (a[sort.by].toLowerCase() > b[sort.by].toLowerCase())
          return sort.asc ? -1 : 1;
        if (a[sort.by].toLowerCase() < b[sort.by].toLowerCase())
          return sort.asc ? 1 : -1;
      } else {
        if (a[sort.by] > b[sort.by])
          return sort.asc ? 1 : -1;
        if (a[sort.by] < b[sort.by])
          return sort.asc ? -1 : 1;
      }
      return 0;

    });
  }
  return queriedEntities;
};