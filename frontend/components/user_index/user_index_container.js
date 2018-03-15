import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserIndex from './user_index';
import{ getAllUsers } from '../../actions/index_actions';

const msp = (state) => {
  return {
    currentIndexProfiles: state.session.currentIndexProfiles
  };
};

const mdp = (dispatch) => {
  return {
    getAllUsers: () => dispatch(getAllUsers())
  };
};

export default withRouter(connect(msp, mdp)(UserIndex))
