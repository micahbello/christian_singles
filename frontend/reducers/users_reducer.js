import { RECEIVE_CURRENT_PROFILE,   RECEIVE_ALL_USERS } from '../actions/user_actions';
import { merge } from 'lodash';

const usersReducer = (oldState = {currentProfile: null, currentIndexProfiles: null}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_CURRENT_PROFILE:
      return merge({}, oldState, {currentProfile: action.currentProfile});
    case RECEIVE_ALL_USERS:
      return merge({}, oldState, {currentIndexProfiles: action.currentIndexProfiles})
    default:
      return oldState;
  }
};

export default usersReducer;
