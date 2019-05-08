import * as types from './types';

export function togglePopup(open) {
  return {
    type: types.OPEN_POPUP,
    open
  };
};

export function changeOrganizationName(name) {
  return {
    type: types.CHANGE_ORG_NAME,
    name
  };
};
