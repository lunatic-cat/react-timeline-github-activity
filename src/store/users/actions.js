import * as types from './types';
import _ from 'lodash';

export function changeUsersData(users) {
  return {
    type: types.USERS_FETCHED,
    users: users
  };
};

export function changeActivityPerPage(activityPerPage) {
  return {
    type: types.CHANGED_ACTIVITY_COUNT,
    activityPerPage: _.parseInt(activityPerPage)
  };
};

export function changeComposeUsers() {
  return {
    type: types.CHANGED_COMPOSE_FLAG
  };
};

