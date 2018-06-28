import React from 'react';
import { connect } from 'react-redux';
import SignupForm from './sign_up_form';
import { withRouter } from 'react-router-dom';
import { signup, clearSessionErrors, receiveErrors} from '../../actions/session_actions';
import { getCurrentProfile } from '../../actions/user_actions';


const msp = (state, ownProps) =>  {
  return {
    errors: state.errors.session.errors
  };
};

const mdp =(dispatch, ownProps) => {
  return {
    clearSessionErrors: () => dispatch(clearSessionErrors()),
    signup: (user) => dispatch(signup(user)),
    getCurrentProfile: (user) => dispatch(getCurrentProfile(user)),
  };
};


export default withRouter(connect(msp, mdp)(SignupForm));
