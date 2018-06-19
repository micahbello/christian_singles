import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateUserInfo } from '../../actions/user_actions';
import { updateUiWindow } from '../../actions/ui_actions';
import HobbiesWindow from './hobbies';

const msp = (state, ownProps) => {
  return {
    userHobbies: ownProps.currentUserHobbies,
    currentUserId: ownProps.currentUserId
  };
};

const mdp = (dispatch) => {
  return {
    updateUserInfo: (user) => dispatch(updateUserInfo(user)),
    updateUiWindow: ( componentName) => dispatch(updateUiWindow(componentName))
  };
};

export default withRouter(connect(msp, mdp)(HobbiesWindow));
