import * as types from './types';

export function changeOrganization(organization) {
  return {
    type: types.CHANGE_ORG,
    organization
  };
};
