import React, { Component } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import SignInSide from './SignInSide';
import Main from './Main';
import Profile from './Profile';
import config from './app.config';

const AppWithRouterAccess = () => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push('/login');
  };

  return (
    <Security issuer={config.issuer}
              clientId={config.clientId}
              redirectUri={config.redirectUri}
              onAuthRequired={onAuthRequired}
              pkce={true} >
      <SecureRoute path='/' exact={true} render={() => <Main url="dashboard" />} />
      <Route path='/login' render={() => <SignInSide baseUrl={config.url} />} />
      <Route path='/implicit/callback' component={LoginCallback} />
      <SecureRoute path='/profile' render={() => <Main url="profile" />} />
    </Security>
  );
};
export default AppWithRouterAccess;
