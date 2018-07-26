import * as viewUtil from '../util/view_util';
import { receiveCurrentUser, receiveErrors } from './session_actions';


//thunks
export const createView = (currentUserId, viewedUserId) => dispatch => {
  return viewUtil.createView(currentUserId, viewedUserId).then((user) => dispatch(receiveCurrentUser(user)),
  errors => dispatch(receiveErrors(errors.responseJSON)));
};
