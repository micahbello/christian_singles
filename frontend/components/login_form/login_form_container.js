import React from 'react';
import { connect } from 'react-redux';
import LoginForm from './login_form';
import { withRouter } from 'react-router-dom';
import { login } from '../../actions/session_actions';


const msp = (state, ownProps) =>  {
  return {
    errors: state.errors.session.errors
  };
};

const mdp =(dispatch, ownProps) => {
  return {
    login: (user) => dispatch(login(user))
  };
};


export default withRouter(connect(msp, mdp)(LoginForm));
