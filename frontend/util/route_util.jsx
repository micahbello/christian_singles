import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

//to prohibit people from going to main/signup/login unless logged out
const Auth = ({component: Component, path, loggedIn, exact}) => (
  <Route path={path} exact={exact} render={(props) => {
    if (!loggedIn) {
      return <Component {...props} />;
    } else {
      return <Redirect to='/browse-new' />;
    }
  }} />
);

//to avoid going to pages unless logged in
const Protect = ({component: Component, path, loggedIn, exact}) => (
  <Route path={path} exact={exact} render={(props) => {
    if (loggedIn) {
      return <Component {...props} />;
    } else {
      return <Redirect to='/login' />;
    }
  }} />
);

const msp = state => {
  return {loggedIn: Boolean(state.session.currentUser)};
};

export const AuthRoute = withRouter(connect(msp, null)(Auth));
export const ProtectedRoute = withRouter(connect(msp, null)(Protect));
