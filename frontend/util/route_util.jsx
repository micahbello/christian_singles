import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

//
// const Auth = ({component: Component, path, loggedIn, exact}) => (
//   <Route path={path} exact={exact} render={(props) => (
//     !loggedIn ? (
//       <Component {...props} />
//     ) : (
//       <Redirect to='/browse' />
//     )
//   )} />
// );

//to avoid people from going to main/signup/login unless not logged in
const Auth = ({component: Component, path, loggedIn, exact}) => (
  <Route path={path} exact={exact} render={(props) => {
    if (!loggedIn) {
      return <Component {...props} />;
    } else {
      return <Redirect to='/browse' />;
    }
  }} />
);

//to avoid going to the browse menu unless logged in
const Auth2 = ({component: Component, path, loggedIn, exact}) => (
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

export const AuthRoute2 = withRouter(connect(msp, null)(Auth2));
