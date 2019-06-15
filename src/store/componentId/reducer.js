import * as types from './types';

const initialState = -1;

export default function (state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_COMPONENT:
      return state * -1;
    default:
      return state;
  }
}
