import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AboutYouWindow from './about_you_window';


const msp = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mdp = (dispatch) => {
  return {
    updateUserInfo: (user) => updateUserInfo(user)
  };
};

export default withRouter(connect(msp, mdp)(AboutYouWindow));
