import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Users from './routes/Users/Users';
import Login from './routes/login/Login';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/users" component={Users} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
