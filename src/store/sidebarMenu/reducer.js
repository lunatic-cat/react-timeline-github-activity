import * as types from './types';

const initialState = {
  open: true,
  startDate: '1970-01-01'
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_SIDEBAR:
      return { ...state, open: !state.open };
    case types.CHANGE_START_DATE:
      const { date } = action;

      return { ...state, startDate: date };
    default:
      return state;
  }
}
