import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import MainLayout from '../components/MainLayout/MainLayout';
import styles from './app.less';

const App = ({ children, dispatch, app, loading, location }) => {
  let { pathname } = location;
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
  console.log(pathname === '/login')
  if (pathname === '/login') {
    return <div>{children}</div>;
  } else {
    return (
      <MainLayout pathName={pathname}>
        <div className={styles.normal}>
          <h1 className={styles.title}>Yay! Welcome to dva!</h1>
        </div>
      </MainLayout>
    );
  }
};

App.propTypes = {
};

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App));
