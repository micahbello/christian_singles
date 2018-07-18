import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateUserInfo } from '../../actions/user_actions';
import { updateUiWindow } from '../../actions/ui_actions';
import { login } from '../../actions/session_actions';
import GuestLoginWindow from './guest_login';

const mdp = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    updateUiWindow: (componentName) => dispatch(updateUiWindow(componentName))
  };
};

export default withRouter(connect(null, mdp)(GuestLoginWindow));
