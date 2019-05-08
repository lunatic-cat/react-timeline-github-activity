import reducer from '../reducer';
import * as types from '../types';
import expect from 'expect';

const initialState = {
    users: [],
    grouppedUsersData: null,
    composeActivity: true,
    activityPerPage: 100,
    usersCount: null,
    activeUser: null
};

describe('post reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle USERS_FETCHED', () => {
    const startAction = {
      type: types.USERS_FETCHED,
      userData: [],
      userName: 'Test'
    };
    expect(reducer({}, startAction)).toMatchObject({ grouppedUsersData: [{ "Test": [] }] });
  });

  it('should handle CHANGED_USERS_COUNT', () => {
    const startAction = {
      type: types.CHANGED_USERS_COUNT,
      usersCount: 1
    };
    expect(reducer({}, startAction)).toMatchObject({ usersCount: 1 });
  });

  it('should handle CHANGED_COMPOSE_FLAG', () => {
    const startAction = {
      type: types.CHANGED_COMPOSE_FLAG,
      activeUserName: 'Test'
    };
    expect(reducer({}, startAction)).toMatchObject({ activeUser: "Test", composeActivity: true });
  });
});