import React from 'react';
import { connect } from 'react-redux';
import LoginForm from './login_form';
import { withRouter } from 'react-router-dom';
import { login, clearSessionErrors } from '../../actions/session_actions';
import { getCurrentProfile, updateUserInfo } from '../../actions/user_actions';



const msp = (state, ownProps) =>  {
  return {
    errors: state.errors.session.errors,
    currentUser: state.session.currentUser
  };
};

const mdp =(dispatch, ownProps) => {
  return {
    clearSessionErrors: () => dispatch(clearSessionErrors()),
    login: (user) => dispatch(login(user)),
    getCurrentProfile: (user) => dispatch(getCurrentProfile(user)),
    updateUserInfo: (user) => dispatch(updateUserInfo(user))
  };
};


export default withRouter(connect(msp, mdp)(LoginForm));
