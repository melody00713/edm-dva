import React from 'react';
import { Switch, Route, Redirect, routerRedux } from 'dva/router';
import { Spin } from 'antd';
import dynamic from 'dva/dynamic';
import App from './routes/app';

// dynamic.setDefaultLoadingComponent(() => {
//   return <Spin size="large" />;
// });

const { ConnectedRouter } = routerRedux;
function RouterConfig({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/Error'),
  });
  const routes = [
    {
      path: '/login',
      key: 'login',
      models: () => [import('./models/login')],
      component: () => import('./routes/login'),
    },
    {
      path: '/vms',
      key: 'vms',
      models: () => [import('./models/vms')],
      component: () => import('./routes/Vms'),
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
