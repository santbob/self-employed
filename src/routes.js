import React from 'react';
import { Route, Switch } from 'react-router';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Header from './components/Header';
const routes = (
  <div>
    <Header />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default routes;
