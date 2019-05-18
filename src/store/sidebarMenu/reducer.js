import * as types from './types';

const initialState = {
  open: false,
  startDate: '2019-05-17T08:00:00.000Z' // TODO accept from query
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
