import * as likeUtil from '../util/like_util';
import { receiveCurrentUser, receiveErrors } from './session_actions';


export const DELETE_LIKE = "DELETE_LIKE";
export const UPDATE_LIKE_INFO = "UPDATE_LIKE_INFO";

//action creator

// export const receiveCurrentUserDeleteLike = (currentUser) => {
//   return {
//     type: DELETE_LIKE,
//     currentUser: currentUser
//   };
// };

export const receiveLikeInfo = (userLikeInfo) => {
  return {
    type: UPDATE_LIKE_INFO,
    userLikeInfo
  };
};


//thunks
// export const createLike = (currentUserId, likedUserId) => dispatch => {
//   return likeUtil.createLike(currentUserId, likedUserId).then((user) => dispatch(receiveCurrentUser(user)),
//   errors => dispatch(receiveErrors(errors.responseJSON)));
// };

export const createLike = (currentUserId, likedUserId) => dispatch => {
  return likeUtil.createLike(currentUserId, likedUserId).then((userLikeInfo) => dispatch(receiveLikeInfo(userLikeInfo)),
  errors => dispatch(receiveErrors(errors.responseJSON)));
};

export const deleteLike = (currentUserId, likedUserId) => dispatch => {
  return likeUtil.deleteLike(currentUserId, likedUserId).then((userLikeInfo) => dispatch(receiveLikeInfo(userLikeInfo)),
  errors => dispatch(receiveErrors(errors.responseJSON)));
};
