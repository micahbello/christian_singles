import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AboutYouWindow from './about_you_window';
import { updateUserInfo, getCurrentProfile } from '../../actions/user_actions';
import { updateUiWindow } from '../../actions/ui_actions';
import { receiveErrors, clearErrors } from '../../actions/session_actions';


const msp = (state) => {
  return {
    currentUser: state.session.currentUser,
    currentProfile: state.users.currentProfile
  };
};

const mdp = (dispatch) => {
  return {
    getCurrentProfile: (id) => dispatch(getCurrentProfile(id)),
    updateUserInfo: (user) => dispatch(updateUserInfo(user)),
    updateUiWindow: (componentName) => dispatch(updateUiWindow(componentName)),
    receiveErrors: (errors) => dispatch(receiveErrors(errors)),
    clearErrors: (errors) => dispatch(clearErrors(errors))  
  };
};

export default withRouter(connect(msp, mdp)(AboutYouWindow));
