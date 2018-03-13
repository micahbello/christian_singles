import { RECEIVE_UI_WINDOW } from '../actions/ui_actions';
import { merge } from 'lodash';

const uiReducer = (oldState = {currentWindow: null}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_UI_WINDOW:
      return merge({}, oldState, {currentWindow: action.currentWindow});
    default:
      return oldState;
  }
};

export default uiReducer;
