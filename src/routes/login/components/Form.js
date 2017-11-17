import React, { Component } from 'react';
import { Form, Row, Col, Input, Select, Checkbox, Button, Icon } from 'antd';
import { connect } from 'dva';
import styles from './Form.less';

const FormItem = Form.Item;
const Option = Select.Option;

class LoginForm extends Component {
  constructor(props) {
    super(props);
  }
  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if(!err) {
        onOk(values);
      }
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    console.log(this.props)
    const { username, password, domain, remeber, autologin} = this.props.loginForm
    
    return (
      <form>
        <FormItem>
          {getFieldDecorator('username', {
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
                message: '请选择域'
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
            {getFieldDecorator('autologin', {
              valuePropName: 'checked',
            })(
              <Checkbox>自动登录</Checkbox>
            )}
          </Col>
        </Row>
        <Row>
          <Button type="primary" size="large" onClick={this.okHandler}>
            登录
          </Button>
        </Row>
      </form>
    )
  }
}

export default Form.create()(LoginForm);
