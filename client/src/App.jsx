/**
 * File which contains the App component.
 */

import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import AuthForm from './components/Auth/Auth';

const App = () => (
  <BrowserRouter>
    <Container maxWidth="lg">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={AuthForm} />
      </Switch>
    </Container>
  </BrowserRouter>
);

export default App;
