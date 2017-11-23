import React from 'react';
import { connect } from 'dva';
import styles from './index.css';
import UsersComponent from '../../components/Users/Users';
import MainLayout from '../../components/MainLayout/MainLayout';

function Users({ location }) {
  return (
    <div className={styles.normal}>
      <UsersComponent />
    </div>
  );
}

export default connect()(Users);
