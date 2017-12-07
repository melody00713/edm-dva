import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Select, Icon } from 'antd';
import LoginForm from './components/Form';
import AnimateBackground from './components/AnimateBackground';
import styles from './index.less';
import Logo from '../../assets/images/logo-l.png';

const Option = Select.Option;

class Login extends PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'login/getDomainList',
    });
  }
  selectPowerHandler = (value) => {
    this.props.dispatch({
      type: 'app/showPowerModal',
      payload: {
        powerType: value,
      },
    });
  }
  render() {
    return (
      <div className={styles.login} id="login">
        <AnimateBackground />
        <div className={styles.form}>
          <div className={styles.logo}>
            <img alt={'logo'} src={Logo} />
          </div>
          <LoginForm />
        </div>
        <div className={styles.footer}>
          <span className={styles.copy}>&copy;2017 Easted All Rights Reserved 北京易讯通股份有限公司版权所有</span>
          <div className={styles.operations}>
            <Select defaultValue="1" style={{ width: 88 }} onSelect={this.selectPowerHandler}>
              <Option value="1"><Icon type="poweroff" />关机</Option>
              <Option value="2"><Icon type="reload" />重启</Option>
            </Select>
            <a className={styles.config}>系统配置</a>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ login, app }) => ({ login, app }))(Login);
