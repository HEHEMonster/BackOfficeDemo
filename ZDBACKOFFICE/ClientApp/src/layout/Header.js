import React, { Component } from 'react';
import { Layout, Avatar, Menu, Icon, message } from 'antd';
import './Header.css';
import classnames from 'classnames';
import SubMenu from 'antd/lib/menu/SubMenu';
import { cleanAllLocalData, removeToken } from '../static/sessionKey';
import NewPassword from './ChangePassword';
import { Post } from '../utils/http';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modelVisible: false,
            confirmLoading: false
        }
    }

    handleLogout = () => {
        removeToken();
        cleanAllLocalData();
        message.success("登出成功!");
        this.props.history.push('/login');
    }

    changePassword = () => {
        this.setState({ modelVisible: true })
    }

    handleCancel = () => {
        this.setState({
            modelVisible: false
        });
        this.formRef.props.form.resetFields();
    }
    
    handleChange = (e) => {
        e.preventDefault();
        const form = this.formRef.props.form;
        form.validateFields((err,value) => {
            if (!err) {
                this.setState({ confirmLoading: true });
                Post('/api/account/ChangePassword', value).then(() => {
                    removeToken();
                    cleanAllLocalData();
                    message.warning("修改成功,请重新登陆!");
                    this.props.history.push('/login');
                }).catch(({ response }) => {
                    message.error(`修改失败，失败原因:${response.data.message}`);
                    }).then(() => this.setState({ confirmLoading: false }));
            }
        })
    }

    render() {
        const { collapsed, onCollapse, currentUser } = this.props;
        return (
            <Layout.Header className='header' >
                <div className='headerButton' onClick={onCollapse}>
                    <Icon
                        type={classnames({
                            'menu-unfold': collapsed,
                            'menu-fold': !collapsed
                        })}
                    />
                </div>
                <div className='headerContainer'>
                    <Menu mode='horizontal' theme='light'>
                        {/* <Menu.Item>
                            <Icon type="setting" />设置
                        </Menu.Item>
                        <Menu.Item>
                            语言
                        </Menu.Item> */}
                    </Menu>
                    <Menu key='user' mode='horizontal'>
                        <SubMenu title={
                            <Avatar>{currentUser ? currentUser : 'User'}</Avatar>
                        }>
                            <Menu.Item onClick={this.changePassword}>
                                <span>修改密码</span>
                            </Menu.Item>
                            <Menu.Item onClick={this.handleLogout}>
                                <span>登出</span>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>

                    <NewPassword
                        onOk={this.handleChange}
                        onCancel={this.handleCancel}
                        visible={this.state.modelVisible}
                        confirmLoading={this.state.confirmLoading}
                        wrappedComponentRef={(form) => { this.formRef = form; }}
                    />
                </div>    
            </Layout.Header>        
        );
    }
}

export default Header;