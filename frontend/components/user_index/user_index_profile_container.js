import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserIndexProfile from './user_index_profile';

// const msp = (state) => {
//   return {
//     currentProfile: state.session.currentProfile
//   };
// };
//
// const mdp = (dispatch) => {
//   return {
//     getCurrentProfile: () => dispatch(getCurrentProfile())
//   };
// };

export default withRouter(connect(null, null)(UserIndexProfile))
