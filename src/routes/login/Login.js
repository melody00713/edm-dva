import React from 'react';
import { connect } from 'dva';
import { Select } from 'antd';
import LoginForm from './components/Form';
import AnimateBackground from './components/AnimateBackground';
import PowerModal from './components/PowerModal';
import styles from './Login.less';
import Logo from '../../assets/images/logo-l.png';

const Option = Select.Option;
const Login = ({ login, dispatch }) => {
  function okHandler(values) {
    console.log(values);
    dispatch({ type: 'login/login', payload: values });
  }
  function selectPowerHandler(value, option) {
    dispatch({
      type: 'login/changePowerType',
      payload: value,
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
      <div className={styles.operations}>
        <Select defaultValue="off" style={{ width: 88 }} onSelect={selectPowerHandler}>
          <Option value="off">关机</Option>
          <Option value="reboot">重启</Option>
        </Select>
        <a className={styles.config}>系统配置</a>
      </div>
      <span className={styles.copy}>&copy;2017 Easted All Rights Reserved 北京易讯通股份有限公司版权所有</span>
      <PowerModal visible={login.powerVisible} type={login.powerType} />
    </div>
  );
};

function mapStateToProps(state) {
  const login = state.login;
  return {
    login,
  };
}

export default connect(mapStateToProps)(Login);
