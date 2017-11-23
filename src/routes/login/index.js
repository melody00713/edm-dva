import React from 'react';
import { connect } from 'dva';
import { Select, Icon } from 'antd';
import LoginForm from './components/Form';
import AnimateBackground from './components/AnimateBackground';
import PowerModal from '../../components/PowerModal/PowerModal';
import styles from './index.less';
import Logo from '../../assets/images/logo-l.png';

const Option = Select.Option;
const Login = ({ login, app, dispatch }) => {
  function okHandler(values) {
    dispatch({ type: 'login/login', payload: values });
  }
  function selectPowerHandler(value) {
    dispatch({
      type: 'app/showPowerModal',
      payload: {
        powerType: value,
      },
    });
  }
  return (
    <div className={styles.login} id="login">
      <AnimateBackground />
      <div className={styles.form}>
        <div className={styles.logo}>
          <img alt={'logo'} src={Logo} />
        </div>
        <LoginForm onOk={okHandler.bind(null, login.loginForm)} loginForm={login.loginForm} />
      </div>
      <div className={styles.footer}>
        <span className={styles.copy}>&copy;2017 Easted All Rights Reserved 北京易讯通股份有限公司版权所有</span>
        <div className={styles.operations}>
          <Select defaultValue="off" style={{ width: 88 }} onSelect={selectPowerHandler}>
            <Option value="off"><Icon type="poweroff" />关机</Option>
            <Option value="reboot"><Icon type="reload" />重启</Option>
          </Select>
          <a className={styles.config}>系统配置</a>
        </div>
      </div>
      <PowerModal powerVisible={app.powerVisible} powerType={app.powerType} />
    </div>
  );
};

function mapStateToProps(state) {
  const {login, app} = state;
  return {
    app,
    login,
  };
}

export default connect(mapStateToProps)(Login);
