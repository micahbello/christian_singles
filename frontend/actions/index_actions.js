import * as APIUtil from '../util/index_api_util';

export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS"

export const receiveAllUsers = (users) => {
  return {
    type: RECEIVE_ALL_USERS,
    currentIndexProfiles: users
  };
};

export const getAllUsers = () => dispatch => {
  return APIUtil.getAllUsers().then(() => dispatch(receiveAllUsers(users)),
  errors => dispatch(receiveErrors(errors.responseJSON)));
}
