import { RECEIVE_SESSION_ERRORS, RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { merge } from 'lodash';

const sessionErrorsReducer = (oldState = {errors: []}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return merge({}, oldState, {errors: action.errors});
    case RECEIVE_CURRENT_USER:
        return({errors: []});
    default:
      return oldState;
  }
};

export default sessionErrorsReducer;
