import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateUserInfo } from '../../actions/user_actions';
import HobbiesWindow from './hobbies';

const msp = (state) => {
  return {
    currentProfile: state.users.currentProfile
  };
};

const mdp = (dispatch) => {
  return {
    updateUserInfo: (user) => dispatch(updateUserInfo(user))
  };
};

export default withRouter(connect(msp, mdp)(HobbiesWindow));
