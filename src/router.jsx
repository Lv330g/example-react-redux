import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

// used base page components
import AuthPage from './modules/auth/AuthPage';
import MainLayoutPage from './modules/main-layout/MainLayoutPage';


const Routes = (
    <BrowserRouter basename="/suv">
        <Switch>
            <Route exact path='/sign-in' component={AuthPage}/>
            <Route exact path='/app' component={MainLayoutPage}/>
            <Redirect path="*" to="/app" />
        </Switch>
    </BrowserRouter>
);

export default Routes;