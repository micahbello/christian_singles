import { RECEIVE_CURRENT_PROFILE, RECEIVE_MATCHES, RECEIVE_ALL_USERS, RECEIVE_ACTIVITY } from '../actions/user_actions';
import { UPDATE_LIKE_INFO } from '../actions/like_actions';
// import { UPDATE_VIEW_INFO } from '../actions/view_actions';
import { merge } from 'lodash';

const usersReducer = (oldState = {currentProfile: null, currentIndexProfiles: null,
                      currentUserActivity: {likedProfiles: null, usersThatViewedMe: null, viewedProfiles: null}}, action) => {
  Object.freeze(oldState);
  let newActivitySlice;
  switch (action.type) {
    case RECEIVE_CURRENT_PROFILE:
      return merge({}, oldState, {currentProfile: action.currentProfile});
    case RECEIVE_ALL_USERS:
      return merge({}, oldState, {currentIndexProfiles: action.currentIndexProfiles});
    case RECEIVE_MATCHES:
      return merge({}, oldState, {currentIndexProfiles: action.matches});
    case UPDATE_LIKE_INFO:
      newActivitySlice = oldState.currentUserActivity;
      newActivitySlice.likedProfiles = action.userLikeInfo.like_profiles;
    // case UPDATE_VIEW_INFO:
      return  merge({}, oldState, {currentUserActivity: newActivitySlice});

    case RECEIVE_ACTIVITY:
      newActivitySlice = oldState.currentUserActivity;
      newActivitySlice.likedProfiles = action.userActivityInfo.like_profiles;
      newActivitySlice.usersThatViewedMe = action.userActivityInfo.profiles_that_viewed_me;
      newActivitySlice.viewedProfiles = action.userActivityInfo.viewed_profiles;

      return  merge({}, oldState, {currentUserActivity: newActivitySlice});
    default:
      return oldState;
  }
};

export default usersReducer;
