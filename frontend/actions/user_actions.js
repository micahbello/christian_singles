import * as APIUtil from '../util/user_api_util';
import {receiveCurrentUser, receiveErrors } from './session_actions';


export const RECEIVE_CURRENT_PROFILE = "RECEIVE_CURRENT_PROFILE";

export const receiveCurrentProfile = (user) => {
  return {
    type: RECEIVE_CURRENT_PROFILE,
    currentProfile: user
  };
};


export const updateUserInfo = (user) => dispatch => {
  return APIUtil.updateUserInfo(user).then(user => dispatch(receiveCurrentUser(user)),
  errors => dispatch(receiveErrors(errors.responseJSON)));
};

export const getCurrentProfile = (user) => dispatch => {
  return APIUtil.getCurrentProfile(user).then(user => dispatch(receiveCurrentProfile(user)),
  errors => dispatch(receiveErrors(errors.responseJSON)));
};
