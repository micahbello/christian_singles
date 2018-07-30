import * as viewUtil from '../util/view_util';
import { receiveCurrentUser, receiveErrors } from './session_actions';

export const UPDATE_VIEW_INFO = "UPDATE_VIEW_INFO";

//action creators

export const receiveViewInfo = (userViewInfo) => {
  return {
      type: UPDATE_VIEW_INFO,
      userViewInfo
  };
};


//thunks
// export const createView = (currentUserId, viewedUserId) => dispatch => {
//   return viewUtil.createView(currentUserId, viewedUserId).then((user) => dispatch(receiveCurrentUser(user)),
//   errors => dispatch(receiveErrors(errors.responseJSON)));
// };


export const createView = (currentUserId, viewedUserId) => dispatch => {
  return viewUtil.createView(currentUserId, viewedUserId).then((userViewInfo) => dispatch(receiveViewInfo(userViewInfo)),
  errors => dispatch(receiveErrors(errors.responseJSON)));
};
