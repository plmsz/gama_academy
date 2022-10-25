import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/contact' component={Contact} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
