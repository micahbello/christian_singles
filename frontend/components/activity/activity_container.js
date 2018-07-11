import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Activity from './activity';


const msp = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mdp = (dispatch) => {
  return {
  };
};

export default withRouter(connect(msp, null)(Activity));
