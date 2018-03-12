import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TopHeader from './top_header';

const msp = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mdp = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    getCurrentProfile: () => dispatch(getCurrentProfile())
  };
};

export default withRouter(connect(msp, mdp)(TopHeader));
