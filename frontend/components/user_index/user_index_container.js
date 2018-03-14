import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserIndex from './user_index';

const msp = (state) => {
  return {
    currentProfile: state.session.currentProfile
  };
};

const mdp = (dispatch) => {
  return {
    getCurrentProfile: () => dispatch(getCurrentProfile())
  };
};

export default withRouter(connect(msp, mdp)(UserIndex))
