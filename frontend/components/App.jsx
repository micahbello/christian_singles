import React from 'react';
import WelcomeContainer from './welcome/welcome_container';//This is the welcome container
import { Route, Switch } from 'react-router-dom';
import LoginFormContainer from './login_form/login_form_container';
import SignupFormContainer from './sign_up_form/sign_up_form_container';
import UserProfileContainer from './user_profile/user_profile_container';
import userInfoForm from './user_info_form/user_info_form_container';
import {AuthRoute, AuthRoute2} from '../util/route_util';
import Browse from './browse/browse';

import AboutYouWindowContainer from './about_you_window/about_you_window_container'; //






const App = () => {
  return (
  <div>

    <Route exact path='/testing' component={AboutYouWindowContainer}/>

    <AuthRoute exact path='/' component={WelcomeContainer} />
    <AuthRoute2 exact path='/browse' component={Browse} />

    <Route exact path='/editprofile' component ={userInfoForm}/>

    <Route exact path='/profile/:id' component ={UserProfileContainer}/>

    <AuthRoute exact path='/login' component={LoginFormContainer} />
    <AuthRoute exact path='/signup' component={SignupFormContainer} />

  </div>
  );
};

export default App;
