import * as types from './types';
import _ from 'lodash';

export function changeUsersData(userData, userName) {
  return {
    type: types.USERS_FETCHED,
    userData: userData,
    userName: userName
  };
};

export function changeUsersCount(usersCount) {
  return {
    type: types.CHANGED_USERS_COUNT,
    usersCount: _.parseInt(usersCount)
  };
};

export function changeComposeUsers(activeUserName) {
  return {
    type: types.CHANGED_COMPOSE_FLAG,
    activeUserName: activeUserName
  };
};

