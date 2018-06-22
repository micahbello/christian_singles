import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ProfilePicsModal from './profile_pics_modal';
import { updateUiWindow } from '../../actions/ui_actions';

const msp = (state, ownProps) => {
  return {
    currentProfilePic: ownProps.currentProfilePic
  };
};

const mdp = (dispatch) => {
  return {
    updateUiWindow: (componentName) => dispatch(updateUiWindow(componentName))
  };
};

export default withRouter(connect(msp, mdp)(ProfilePicsModal));
