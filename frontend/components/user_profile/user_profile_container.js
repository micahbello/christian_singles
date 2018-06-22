import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserProfile from './user_profile';
import { clearCurrentProfile } from '../../actions/user_actions';
import { updateUiWindow } from '../../actions/ui_actions';



const mapStateToProps = (state) => {
  return {
    currentProfile: state.users.currentProfile,
    currentUser: state.session.currentUser,
    currentWindow: state.ui.currentWindow
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentProfile: (user) => dispatch(getCurrentProfile(user)), //
    clearCurrentProfile: () => dispatch(clearCurrentProfile()),
    updateUiWindow: (componentName) => dispatch(updateUiWindow(componentName))
  }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile));
