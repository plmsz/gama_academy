import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Courses from './pages/Courses';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './private.routes';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/courses' component={Courses} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <PrivateRoute path='/dash' component={Dashboard} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
