import React, { Component } from 'react';
import { Form, Row, Col, Input, Select, Checkbox, Button, Icon, message} from 'antd';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import styles from './Form.less';

const FormItem = Form.Item;
const Option = Select.Option;

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: undefined
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.login.status === 'ok') {
      this.props.dispatch(routerRedux.push('/vms'));
    }
    if (nextProps.login.status !== this.state.status && nextProps.login.status === 'error') {
      message.error('登录失败');
    }
    this.state.status = nextProps.login.status
  }
  okHandler = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields((err, values) => {
      if(!err) {
        dispatch({
          type: 'login/accountSubmit',
          payload: values
        })
      }
    })
  }
  render () {
    const {form , login} = this.props
    const { getFieldDecorator } = form;
    // const {login} = this.props;
    // const { username, password, domain, remeber, autologin} = this.props.loginForm
    
    return (
      <form className="login_form" onSubmit={this.okHandler}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [
              {
                required: true,
                message: '请输入用户名'
              },
            ],
          })(<Input size="large" placeholder="用户名" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入密码'
              },
            ],
          })(<Input size="large" type="password" placeholder="密码" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('domain', {
            rules: [
              {
                required: true,
                message: '请选择域',
              },
            ],
          })(
            <Select size="large"  placeholder="域">
              {
                login.domainList.map((item) => {
                  return (<Option key={item} value={item}>{item}</Option>)
                })
              }
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
            {getFieldDecorator('autologin', {
              valuePropName: 'checked',
            })(
              <Checkbox>自动登录</Checkbox>
            )}
          </Col>
        </Row>
        <Row>
          <Button loading={login.submitting} type="primary" size="large" htmlType="submit">
            登录
          </Button>
        </Row>
      </form>
    )
  }
}

export default connect(({login}) => ({login}))(Form.create()(LoginForm));
