import React from 'react';
import { connect } from 'dva';
import styles from './index.less';

function Error() {
  return (
    <div className={styles.normal}>
      错误
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Error);
