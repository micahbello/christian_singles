import * as APIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";

//action creator - they return a POJO with a type attribute

export const receiveCurrentUser = (currentUser) => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser: currentUser
  };
};

export const receiveErrors = (errors) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors: errors
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_SESSION_ERRORS
  };
};


//thunk reducers- they intercept for http requests and then call the action creator
export const logout = () => dispatch => {
  return APIUtil.logout().then(() => dispatch(receiveCurrentUser(null)),
  errors => dispatch(receiveErrors(errors.responseJSON)));
};

export const login = (user) => dispatch => {
  return APIUtil.login(user).then(user => dispatch(receiveCurrentUser(user)),
  errors => dispatch(receiveErrors(errors.responseJSON)));
};

export const signup = (user) => dispatch => {
  return APIUtil.signup(user).then(user => dispatch(receiveCurrentUser(user)),
  errors => dispatch(receiveErrors(errors.responseJSON)));
};

export const clearSessionErrors = () => {
  return dispatch(clearErrors());
};
