import React, { Component } from 'react'
import { Modal, Form, Input } from 'antd'

class NewRolesModal extends Component {
    render() {
        const { visible, onCancel, form, confirmLoading, onOk } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="新建角色"
                okText="完成"
                cancelText="取消"
                onCancel={onCancel}
                onOk={onOk}
                confirmLoading={confirmLoading}
            >
                <Form layout="vertical">
                    <Form.Item label="角色名">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入角色名' }],
                        })(
                            <Input />
                        )}
                    </Form.Item>

                    <Form.Item label="描述">
                        {getFieldDecorator('description', {
                            rules: [{ required: true, message: '请输入描述' }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

NewRolesModal = Form.create()(NewRolesModal)

export default NewRolesModal