import React from 'react';
import ReactDOM from 'react-dom';
import { signup, login, logout } from './actions/session_actions';
import configureStore from './store/store';

window.signup = signup;
window.login = login;
window.logout = logout;



document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const store = configureStore();

window.getState = store.getState;
window.dispatch = store.dispatch;

  ReactDOM.render(<h1>Christian Singles</h1>, root);
});
