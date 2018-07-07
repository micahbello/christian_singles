import * as likeUtil from '../util/like_util';
import { receiveCurrentUser, receiveErrors } from './session_actions';

export const DELETE_LIKE = "DELETE_LIKE"

//action creator

export const receiveCurrentUserDeleteLike = (currentUser) => {
  return {
    type: DELETE_LIKE,
    currentUser: currentUser
  };
};


//thunks
export const createLike = (currentUserId, likedUserId) => dispatch => {
  return likeUtil.createLike(currentUserId, likedUserId).then((user) => dispatch(receiveCurrentUser(user)),
  errors => dispatch(receiveErrors(errors.responseJSON)));
};

export const deleteLike = (currentUserId, likedUserId) => dispatch => {
  return likeUtil.deleteLike(currentUserId, likedUserId).then((user) => dispatch(receiveCurrentUserDeleteLike(user)),
  errors => dispatch(receiveErrors(errors.responseJSON)));
};
