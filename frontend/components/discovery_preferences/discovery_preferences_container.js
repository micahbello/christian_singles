import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DiscoveryPreferences from './discovery_preferences';
import { updateUserInfo, getCurrentProfile } from '../../actions/user_actions';
import { updateUiWindow } from '../../actions/ui_actions';


const msp = (state) => {
  return {
    currentUser: state.session.currentUser,
    currentProfile: state.session.currentProfile
  };
};

const mdp = (dispatch) => {
  return {
    getCurrentProfile: (id) => dispatch(getCurrentProfile(id)),
    updateUserInfo: (user) => dispatch(updateUserInfo(user)),
    updateUiWindow: (componentName) => dispatch(updateUiWindow(componentName))
  };
};

export default withRouter(connect(msp, mdp)(DiscoveryPreferences));
