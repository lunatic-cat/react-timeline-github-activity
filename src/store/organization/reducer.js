import * as types from './types';

const initialState = null;

export default function (state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_ORG:
      const { organization } = action;

      return organization;
    default:
      return state;
  }
}
