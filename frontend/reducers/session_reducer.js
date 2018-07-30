import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { DELETE_LIKE, UPDATE_LIKE_INFO } from '../actions/like_actions';
import { merge } from 'lodash';

const sessionReducer = (oldState = {currentUser: null}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, oldState, {currentUser: action.currentUser});
    case UPDATE_LIKE_INFO:
      let newCurrentUserSlice = oldState.currentUser;
      newCurrentUserSlice.likes = action.userLikeInfo.likesArray;
      return merge({}, oldState, {currentUser: newCurrentUserSlice});
    default:
      return oldState;
  }
};

export default sessionReducer;
