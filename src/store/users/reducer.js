import * as types from './types';

const initialState = {
  users: [],
  composeActivity: true,
  activityPerPage: 30
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.USERS_FETCHED:
      const { users } = action;
      return {
        ...state,
        users: users
      };
    case types.CHANGED_COMPOSE_FLAG:
      const { composeActivity } = state;
      return {
        ...state,
        composeActivity: !composeActivity
      };
    case types.CHANGED_ACTIVITY_COUNT:
      const { activityPerPage } = action;
      return {
        ...state,
        activityPerPage: activityPerPage
      };
    default:
      return state;
  }
}
