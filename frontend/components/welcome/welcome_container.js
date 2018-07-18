import React from 'react';
import { connect } from 'react-redux';
import Welcome from './welcome';
import{ updateUiWindow } from '../../actions/ui_actions';

const msp = (state) => {
  return {
    currentUser: state.session.currentUser,
    currentWindow: state.ui.currentWindow
  };
};

const mdp = (dispatch) => {
  return {
    updateUiWindow: (componentName) => dispatch(updateUiWindow(componentName))
  };
};

export default connect(msp, mdp)(Welcome);
