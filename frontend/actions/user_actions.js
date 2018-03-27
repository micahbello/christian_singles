import * as APIUtil from '../util/user_api_util';
import { receiveCurrentUser, receiveErrors } from './session_actions';


export const RECEIVE_CURRENT_PROFILE = "RECEIVE_CURRENT_PROFILE";
export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
export const RECEIVE_MATCHES = "RECEIVE_MATCHES";


export const receiveCurrentProfile = (user) => {
  return {
    type: RECEIVE_CURRENT_PROFILE,
    currentProfile: user
  };
};

export const receiveAllUsers = (users) => {
  return {
    type: RECEIVE_ALL_USERS,
    currentIndexProfiles: users
  };
};

export const receiveMatches = (users) => {
  return {
    type: RECEIVE_MATCHES,
    matches: users
  };
};



export const updateUserInfo = (user) => dispatch => {
  return APIUtil.updateUserInfo(user).then(user => dispatch(receiveCurrentProfile(user)),
  errors => dispatch(receiveErrors(errors.responseJSON)));
};

export const getCurrentProfile = (user) => dispatch => {
  return APIUtil.getCurrentProfile(user).then(user => dispatch(receiveCurrentProfile(user)),
  errors => dispatch(receiveErrors(errors.responseJSON)));
};

export const clearCurrentProfile = () => {
  return dispatch(receiveCurrentProfile(null));
};

export const getAllUsers = () => dispatch => {
  return APIUtil.getAllUsers().then((users) => dispatch(receiveAllUsers(users)),
  errors => dispatch(receiveErrors(errors.responseJSON)));
};

export const getMatches = (id) => dispatch => {
  return APIUtil.getMatches(id).then((users) => dispatch(receiveMatches(users)),
  errors => dispatch(receiveErrors(errors.responseJSON)));
}

export const clearCurrentIndexProfiles = () => {
  return dispatch(receiveAllUsers(null));
};
