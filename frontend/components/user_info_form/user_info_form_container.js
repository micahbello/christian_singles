import React from 'react';
import { connect } from 'react-redux';
import userInfoForm from './user_info_form';
import { withRouter } from 'react-router-dom';
import { updateUserInfo, getCurrentProfile } from '../../actions/user_actions';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser,
    currentProfile: state.session.currentProfile
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: (user) => dispatch(updateUserInfo(user)),
    getCurrentProfile: (user) => dispatch(getCurrentProfile(user))
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(userInfoForm));
