import React from 'react';
import { connect } from 'react-redux';
import userInfoForm from './user_info_form';
import { withRouter } from 'react-router-dom';
import { updateUserInfo, getCurrentProfile, clearCurrentProfile } from '../../actions/user_actions';
import{ updateUiWindow }from '../../actions/ui_actions';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser,
    currentProfile: state.users.currentProfile,
    currentWindow: state.ui.currentWindow
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCurrentProfile: () => dispatch(clearCurrentProfile()),
    updateUserInfo: (user) => dispatch(updateUserInfo(user)),
    getCurrentProfile: (id) => dispatch(getCurrentProfile(id)),
    updateUiWindow: (componentName) => dispatch(updateUiWindow(componentName))
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(userInfoForm));
