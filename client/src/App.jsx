/**
 * File which contains the App component.
 */

import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Home from './components/Home/Home';
import RegisterOrLoginForm from './components/RegisterOrLoginForm/RegisterOrLoginForm';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => (
  <BrowserRouter>
    <Container maxWidth="lg">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={RegisterOrLoginForm} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
      </Switch>
    </Container>
  </BrowserRouter>
);

export default App;
