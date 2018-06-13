import React from 'react';
import ReactDOM from 'react-dom';
import { signup, login, logout } from './actions/session_actions'; ///TESTING
import configureStore from './store/store';
import Root from './components/root';

import  { getCurrentProfile } from './actions/user_actions'; ///testing
import { getAllUsers } from './actions/user_actions'; ///testingggg


window.getCurrentProfile = getCurrentProfile;
window.signup = signup;
window.login = login;
window.logout = logout;
window.getAllUsers = getAllUsers;


document.addEventListener('DOMContentLoaded', () => {

  const root = document.getElementById('root');
  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser}};
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

window.getState = store.getState; ///TESTING
window.dispatch = store.dispatch; ///TESTING

  ReactDOM.render(<Root store={store} />, root);
});
