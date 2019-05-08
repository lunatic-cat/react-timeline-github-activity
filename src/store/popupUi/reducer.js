import * as types from './types';
import { CHANGE_ORG } from '../organization/types';

const initialState = {
  open: true,
  orgName: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.OPEN_POPUP:
      const { open } = action;

      return { ...state, open: open };
    case CHANGE_ORG:
      return { ...state, open: !state.open };
    case types.CHANGE_ORG_NAME:
      const { name } = action;

      return { ...state, orgName: name };
    default:
      return state;
  }
}
