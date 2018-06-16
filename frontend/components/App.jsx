import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {AuthRoute, ProtectedRoute} from '../util/route_util';
import LoginFormContainer from './login_form/login_form_container';
import SignupFormContainer from './sign_up_form/sign_up_form_container';
import UserProfileContainer from './user_profile/user_profile_container';
import userInfoForm from './user_info_form/user_info_form_container';
import WelcomeContainer from './welcome/welcome_container';
import DiscoveryPreferencesContainer from './discovery_preferences/discovery_preferences_container';
import UserIndexContainer from './user_index/user_index_container';
import inTheWorks from './in_the_works';
import Footer from './footer/footer';
import LoadingPage from './loading_page/loading_page';

const App = () => {
  return (
  <div>

    <AuthRoute exact path='/' component={WelcomeContainer} />
    <AuthRoute exact path='/login' component={LoginFormContainer} />
    <AuthRoute exact path='/signup' component={SignupFormContainer} />

    <ProtectedRoute exact path='/messages' component={inTheWorks}/>
    <ProtectedRoute exact path='/matches' component={inTheWorks}/>

    <ProtectedRoute exact path='/discoverypreferences' component={DiscoveryPreferencesContainer}/>
    <ProtectedRoute exact path='/browse' component={UserIndexContainer} />
    <ProtectedRoute exact path='/editprofile' component ={userInfoForm}/>
    <ProtectedRoute exact path='/profile/:id' component ={UserProfileContainer}/>
    <Footer />

  </div>
  );
};

export default App;
