import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ({component: Component, path, loggedIn, exact}) => (
  <Route path={path} exact={exact} render={(props) => (
    !loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to='/browse' />
    )
  )} />
);

const msp = state => {
  return {loggedIn: Boolean(state.session.currentUser)};
};

export const AuthRoute = withRouter(connect(msp, null)(Auth));
