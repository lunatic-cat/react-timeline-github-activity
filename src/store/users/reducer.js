import * as types from './types';
import _ from 'lodash';

const initialState = {
  users: [],
  grouppedUsersData: null,
  composeActivity: true,
  activityPerPage: 100,
  usersCount: null,
  activeUser: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.USERS_FETCHED:
      const { userData, userName } = action;
      const grouppedUsersData = Object.assign(_.take(state.grouppedUsersData)[0] || {}, { [userName]: userData });

      return {...state, grouppedUsersData: [grouppedUsersData] };
    case types.CHANGED_COMPOSE_FLAG:
      const { composeActivity } = state;
      const { activeUserName } = action;
      const newComposeActivity = _.eq(activeUserName, state.activeUser) ? composeActivity : !composeActivity;
      return {
        ...state,
        composeActivity: newComposeActivity,
        activeUser: activeUserName
      };
    case types.CHANGED_USERS_COUNT:
      const { usersCount } = action;
      return {
        ...state,
        usersCount: usersCount
      };
    default:
      return state;
  }
}
