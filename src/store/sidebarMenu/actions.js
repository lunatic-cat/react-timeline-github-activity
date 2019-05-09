import * as types from './types';

export function toggleSidebarMenu() {
  return {
    type: types.TOGGLE_SIDEBAR
  };
};

export function changeStartDate(date) {
  return {
    type: types.CHANGE_START_DATE,
    date
  };
};
