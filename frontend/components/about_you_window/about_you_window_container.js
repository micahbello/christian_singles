import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AboutYouWindow from './about_you_window';
import { updateUserInfo, getCurrentProfile } from '../../actions/user_actions';


const msp = (state) => {
  return {
    currentUser: state.session.currentUser,
    currentProfile: state.session.currentProfile
  };
};

const mdp = (dispatch) => {
  return {
    getCurrentProfile: (id) => dispatch(getCurrentProfile(id)),
    updateUserInfo: (user) => dispatch(updateUserInfo(user))
  };
};

export default withRouter(connect(msp, mdp)(AboutYouWindow));
