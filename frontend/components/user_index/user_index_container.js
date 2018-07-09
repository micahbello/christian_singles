import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserIndex from './user_index';
import { getAllUsers, clearCurrentIndexProfiles, getMatches } from '../../actions/user_actions';
import { deleteLike, createLike } from '../../actions/like_actions';

const msp = (state) => { //the state is available here bc of the provider at the root component
  return {
    currentUser: state.session.currentUser,
    currentIndexProfiles: state.users.currentIndexProfiles
  };
};

const mdp = (dispatch) => { //where does dispatch come from?
  return {
    getMatches: (id) => dispatch(getMatches(id)),
    getAllUsers: () => dispatch(getAllUsers()),
    clearCurrentIndexProfiles: () => dispatch(clearCurrentIndexProfiles()),
    createLike: (currentUserId, likedUserId) => dispatch(createLike(currentUserId, likedUserId)),
    deleteLike: (currentUserId, likedUserId) => dispatch(deleteLike(currentUserId, likedUserId))
  };
};

export default withRouter(connect(msp, mdp)(UserIndex))
