import React, { Component } from 'react';
import { Modal, Form, Input, Row, Col } from 'antd';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

class NewOperatormodal extends Component {
    render() {
        const { visible, onOk, onCancel, confirmLoading, form, password } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                title="新建"
                okText="完成"
                cancelText="取消"
                visible={visible}
                onOk={onOk}
                onCancel={onCancel}
                confirmLoading={confirmLoading}

            >
                <Form layout='vertical'>
                    <Form.Item
                        label="登录名"
                        {...formItemLayout}
                    >
                        {
                            getFieldDecorator('name', {
                                rules: [
                                    { required: true, message: '请填写登录名!' },
                                    { min: 6, message: '登录名至少6位!' },
                                    { whitespace: true, message: '登录名不能为空格!' },
                                ]
                            })(
                                <Input className='width100' />
                            )
                        }
                    </Form.Item>
                </Form>
                {
                    password && <Row>
                        <Col xs={24} sm={8}>
                            <label>登录密码</label>
                        </Col>
                        <Col xs={24} sm={16}>
                            <span>
                                {password}
                            </span>
                        </Col>
                    </Row>
                }
            </Modal>
        );
    }
}

NewOperatormodal = Form.create()(NewOperatormodal);

export default NewOperatormodal;