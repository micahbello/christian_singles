import React from 'react';
import { connect } from 'react-redux';
import userInfoForm from './user_info_form';
import { withRouter } from 'react-router-dom';
import { updateUserInfo } from '../../actions/user_actions';

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: (user) => dispatch(updateUserInfo(user))
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(userInfoForm));
