import * as APIUtil from '../util/user_api_util';
import {receiveCurrentUser, receiveErrors } from './session_actions';

// export const UPDATE_CURRENT_USER = "UPDATE_CURRENT_USER";


//action creator

// export const updateCurrentUser = (user) => {
//   return {
//     type: UPDATE_CURRENT_USER,
//     currentUser: user
//   };
// };

//thunk reducers!!!!!!

export const updateUserInfo = (user) => dispatch => {
  
  return APIUtil.updateUserInfo(user).then(user => dispatch(receiveCurrentUser(user)),
  errors => dispatch(receiveErrors(errors.responseJSON)));
};
