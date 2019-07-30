import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import './Login.css';
import { user_name, user_permissions, getToken, setToken, setLocalData } from '../../static/sessionKey';

const FormItem = Form.Item;

class LoginForm extends Component {
  state = {
    submitting: false,
    isLogined: false
  }

  componentDidMount() {
    if (this.input)
      this.input.focus();
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ submitting: true });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post('/api/account/authenticate', values).then(response => {
          message.success("登录成功!");
          this.setLocalData(response.data)
          this.setState({ isLogined: true });
        }).catch((error) => {
          this.setState({ submitting: false })
          const { data } = error.response;
          message.error(data.message);
        });
      }
    });
  }

  setLocalData({ result }) {
    setToken(result.access_token, { expires: 1 / 24 });                        // 设置token 有效时间1小时
    setLocalData(user_name, `${result.name}`);                                 // 保存当前登录的用户名
    setLocalData(user_permissions, `${jwtDecode(result.access_token).role}`);        // 保存当前登录的用户权限
  }



  render() {
    const { getFieldDecorator } = this.props.form;

    const { from } = this.props.location.state || { from: { pathname: "/" } };

    if (getToken() != null || this.state.isLogined) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <h1>赚道后台</h1>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" ref={(input) => this.input = input} />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住我</Checkbox>
            )}
            {/* <a className="login-form-forgot" href="">忘记密码</a> */}
            <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.submitting} disabled={this.state.submitting}>
              登录
          </Button>
            {/* 或者 <a href="">现在注册!</a> */}
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(LoginForm);

export default WrappedNormalLoginForm;