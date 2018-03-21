import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserProfile from './user_profile';
import { clearCurrentProfile } from '../../actions/user_actions';


const mapStateToProps = (state) => {
  debugger
  return {
    currentProfile: state.users.currentProfile,
    currentUser: state.session.currentUser
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentProfile: (user) => dispatch(getCurrentProfile(user)), //
    clearCurrentProfile: () => dispatch(clearCurrentProfile())
  }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile));
