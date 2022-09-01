import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';

// import { Container } from './styles';

function Routes() {
    return (<BrowserRouter>
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/contact' component={Contact} />
        </Switch>
    </BrowserRouter>);
}

export default Routes;