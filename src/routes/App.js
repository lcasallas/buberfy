import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../containers/Login';
import Register from '../containers/Register';
import Header from '../containers/Header';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/dashboard' component={Header} />
    </Switch>
  </BrowserRouter>
);

export default App;
