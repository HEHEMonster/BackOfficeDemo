import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd'

class ChangePassword extends Component {

    VerificationPwd = (rule, value, callback) =>
    {
        let getValue = this.props.form.getFieldValue;
        if(value !=  getValue('firstPassword') )
        {
            callback('两次输入不一致')
        }
        callback();
    }

    render() {
        const { visible, onCancel, confirmLoading, onOk } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                visible={visible}
                title="修改密码"
                okText="完成"
                cancelText="取消"
                onCancel={onCancel}
                onOk={onOk}
                confirmLoading={confirmLoading}
            >
                <Form layout="vertical">
                    <Form.Item
                        label="原密码"
                        hasFeedback
                    >
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入原密码',}, { min: 6, message:'长度不小于6位'}],
                        })(
                            <Input type='password' />
                        )}
                    </Form.Item>
                    
                    <Form.Item 
                    label="新密码"
                    hasFeedback
                    >
                        {getFieldDecorator('firstPassword', {
                            rules: [{ required: true, message: '请输入新密码' }, { min: 6, message:'长度不小于6位'}],
                        })(
                            <Input type='password' />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="确认密码"
                        hasFeedback
                    >
                        {getFieldDecorator('lastPassword', {
                            rules: [{ required: true, message:'请再次输入新密码' }, { validator: this.VerificationPwd } ],
                        })(
                            <Input type='password'/>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

ChangePassword = Form.create()(ChangePassword)

export default ChangePassword