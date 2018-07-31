import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LikesViewsIndex from './likes_and_views_index';
import { deleteLike, createLike } from '../../actions/like_actions';
import { getCurrentUserActivity } from '../../actions/user_actions';



const msp = (state) => {
  return {
    currentUser: state.session.currentUser,
    likedProfiles: state.users.currentUserActivity.likedProfiles,
    viewedProfiles: state.users.currentUserActivity.viewedProfiles,
    usersThatViewedMe: state.users.currentUserActivity.usersThatViewedMe
  };
};

const mdp = (dispatch) => {
  return {
    deleteLike: (currentUserId, likedUserId) => dispatch(deleteLike(currentUserId, likedUserId)),
    createLike: (currentUserId, likedUserId) => dispatch(createLike(currentUserId, likedUserId)),
    getCurrentUserActivity: (currentUserId) => dispatch(getCurrentUserActivity(currentUserId))
  };
};

export default withRouter(connect(msp, mdp)(LikesViewsIndex));
