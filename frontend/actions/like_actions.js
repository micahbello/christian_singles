import * as likeUtil from '../util/like_util';
import { receiveCurrentUser, receiveErrors } from './session_actions';


//thunks
export const createLike = (currentUserId, likedUserId) => dispatch => {
  return likeUtil.createLike(currentUserId, likedUserId).then((user) => dispatch(receiveCurrentUser(user)),
  errors => dispatch(receiveErrors(errors.responseJSON)));
};
