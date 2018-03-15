import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserIndexProfile from './user_index_profile';

const msp = (state, ownProps) => {
  return {
    profileId: ownProps.id
  };
};

// const mdp = (dispatch) => {
//   return {
//
//   };
// };

export default withRouter(connect(msp, null)(UserIndexProfile))
