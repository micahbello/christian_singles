import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_CURRENT_PROFILE } from '../actions/user_actions';
import { RECEIVE_ALL_USERS } from '../actions/index_actions';
import { merge } from 'lodash';

const sessionReducer = (oldState = {currentUser: null, currentProfile: null, currentWindow: null}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, oldState, {currentUser: action.currentUser});
    case RECEIVE_CURRENT_PROFILE:
      return merge({}, oldState, {currentProfile: action.currentProfile});
    case RECEIVE_ALL_USERS:
      return merge({}, oldState, {currentIndexProfiles: action.currentIndexProfiles})
    default:
      return oldState;
  }
};

export default sessionReducer;
