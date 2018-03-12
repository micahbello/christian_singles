import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserProfile from './user_profile';


const mapStateToProps = (state) => {
  return {
    currentProfile: state.session.currentProfile
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentProfile: (user) => dispatch(getCurrentProfile(user))
  }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile));
