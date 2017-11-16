import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Row, Col, Form, Input, Select, Checkbox } from 'antd';
import AnimateBackground from './components/AnimateBackground';
import PowerModal from './components/PowerModal';
import styles from './Login.less';
import Logo from '../../assets/images/logo-l.png';

const FormItem = Form.Item;
const Option = Select.Option;


const Login = ({ login, dispatch, form: { getFieldDecorator, validateFieldsAndScroll, }, }) => {
  
  function okHandler () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      dispatch({ type: 'login/login', payload: values });
    });
  }
  
  function selectPowerHandler(value, option) {
  }
  
  return (
    <div className={styles.normal} id="login">
      <AnimateBackground />
      <div className={styles.form}>
        <div className={styles.logo}>
          <img alt={'logo'}  src={Logo}/>
        </div>
        <form>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '请输入用户名'
                },
              ],
            })(<Input size="large" onPressEnter={okHandler} placeholder="用户名" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入密码'
                },
              ],
            })(<Input size="large" type="password" onPressEnter={okHandler} placeholder="密码" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('vms', {
              rules: [
                {
                  required: true,
                  message: '请选择',
                  initialValue: "Dev-2-5G"
                },
              ],
            })(
              <Select size="large">
                <Option value="Dev-2-5G">Dva-2-5G</Option>
              </Select>
            )}
          </FormItem>
          <Row gutter={8} className={styles.checkboxRow}>
            <Col span={12}>
              {getFieldDecorator('remeber', {
                valuePropName: 'checked',
              })(
                <Checkbox>记住密码</Checkbox>
              )}
            </Col>
            <Col span={12}>
              {getFieldDecorator('autoLogin', {
                valuePropName: 'checked',
              })(
                <Checkbox>自动登录</Checkbox>
              )}
            </Col>
          </Row>
          <Row>
            <Button type="primary" size="large" onClick={okHandler}>
              登录
            </Button>
          </Row>
        </form>
      </div>
      <div className={styles.operations}>
        <PowerModal>
          <Select defaultValue="off" style={{ width: 88 }} onSelect={selectPowerHandler}>
            <Option value="off">关机</Option>
            <Option value="reboot">重启</Option>
          </Select>
        </PowerModal>
        <a className={styles.config}>系统配置</a>
      </div>
      <span className={styles.copy}>&copy;2017 Easted All Rights Reserved 北京易讯通股份有限公司版权所有</span>
    </div>
  );
}

Login.propTypes = {
  form: PropTypes.object,
  login: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(({ login }) => ({ login }))(Form.create()(Login));
