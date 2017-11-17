import React from 'react';
import { Switch, Route, Redirect, routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';
import App from './routes/app';

const { ConnectedRouter } = routerRedux;
function RouterConfig({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/Error/error'),
  });
  const routes = [
    {
      path: '/login',
      key: 'login',
      models: () => [import('./models/login')],
      component: () => import('./routes/login/Login'),
    },
  ];
  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/login" />)} />
          {
            routes.map(({ path, ...dynamics }, key) => (
              <Route
                key={key}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics,
                })}
              />
            ))
          }
          <Route component={error} />
        </Switch>
      </App>
    </ConnectedRouter>
  );
}

export default RouterConfig;
