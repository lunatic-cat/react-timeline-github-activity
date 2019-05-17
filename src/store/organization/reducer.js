import * as types from './types';

// TODO: react-router
const initialState = window.location.pathname.replace("/", '');

export default function (state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_ORG:
      const { organization } = action;

      return organization;
    default:
      return state;
  }
}
