import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateUserPicture } from '../../actions/user_actions';
import { updateUiWindow } from '../../actions/ui_actions';
import { receiveCurrentUser } from '../../actions/session_actions';
import PicUpload from './pic_upload';

const msd = (state) => {
  return {
    currentPicture: state.session.currentUser.image,
    userId: state.session.currentUser.id,
    currentProfile: state.users.currentProfile
  };
};

const mdp = (dispatch) => {
  return {
    updateUserPicture: (formData, id) => dispatch(updateUserPicture(formData, id)),
    updateUiWindow: (componentName) => dispatch(updateUiWindow(componentName)),
    receiveCurrentUser: (currentUser) => dispatch(receiveCurrentUser(currentUser))
  };
};

export default withRouter(connect(msd, mdp)(PicUpload));
