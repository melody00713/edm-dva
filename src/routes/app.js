import React, { Component } from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import { Layout, Select, Icon, Popover } from 'antd';
import styles from './app.less';
import PowerModal from '../components/PowerModal/PowerModal';

const { Header, Content } = Layout;
const Option = Select.Option;


class App extends Component {
// const App = ({ children, dispatch, app, loading, location }) => {
  constructor(props) {
    super(props);
  }
  selectPowerHandler = (value) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'app/showPowerModal',
      payload: {
        powerType: value,
      },
    });
  }
  render() {
    const {children, dispatch, app, loading, location} = this.props;
    let pathName = location.pathname;
    pathName = pathName.startsWith('/') ? pathName : `/${pathName}`;
    const content = (
      <ul className={styles.popoverContent}>
        <li><Icon type="user" />用户切换</li>
        <li><Icon type="poweroff" />退出登录</li>
        <li><Icon type="setting" />系统配置</li>
      </ul>
    );
    return (
      <div>
        <div style={{ filter: `${app.powerVisible ? 'blur(12px)' : 'none'}`, height: '100vh' }}>
          {
            (pathName === '/login' ? children : (
              <Layout className={styles.layout}>
                <Header className={styles.header}>
                  <div className={styles.logo} />
                  <div className={styles.powerOperations}>
                    <Select defaultValue="off" style={{ width: 88 }} onSelect={this.selectPowerHandler}>
                      <Option value="off"><Icon type="poweroff" />关机</Option>
                      <Option value="reboot"><Icon type="reload" />重启</Option>
                    </Select>
                    <Popover placement="bottomRight" content={content} trigger="click" arrowPointAtCenter>
                      <Icon type="ellipsis" className={styles.ellipse} />
                    </Popover>
                  </div>
                </Header>
                <Content style={{ padding: '0 72px' }}>
                  {children}
                </Content>
              </Layout>
            ))
          }
        </div>
        <PowerModal powerVisible={app.powerVisible} powerType={app.powerType} />
      </div>
    );
  }
}


export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App));
