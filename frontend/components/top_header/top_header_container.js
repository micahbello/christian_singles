import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TopHeader from './top_header';
import { updateUserInfo, clearCurrentProfile } from '../../actions/user_actions';

const msp = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mdp = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    getCurrentProfile: (user) => dispatch(getCurrentProfile(user)),
    updateUserInfo: (id) => dispatch(updateUserInfo(id)),
    clearCurrentProfile: () => dispatch(clearCurrentProfile())
  };
};

export default withRouter(connect(msp, mdp)(TopHeader));
