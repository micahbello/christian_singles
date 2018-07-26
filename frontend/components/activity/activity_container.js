import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Activity from './activity';
import { deleteLike, createLike } from '../../actions/like_actions';


const msp = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mdp = (dispatch) => {
  return {
    deleteLike: (currentUserId, likedUserId) => dispatch(deleteLike(currentUserId, likedUserId)),
    createLike: (currentUserId, likedUserId) => dispatch(createLike(currentUserId, likedUserId))
  };
};

export default withRouter(connect(msp, mdp)(Activity));
