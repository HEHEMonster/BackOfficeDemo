import React, { Component } from 'react';
import {
    Form, Input, Button, Select, Cascader, message
} from 'antd';
import { Post } from '../../utils/http';
import cityOptions from '../../static/city.json';
import industryOptions from '../../static/industry.json';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        md: { span: 3 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 21 }
    },
};

class PersonAdd extends Component {

    handleBack = () => {
        this.props.form.resetFields();
        this.props.history.goBack();
    }

    handleSumbit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            let person = {
                ...values,
                industry: [...values.industry][1],
                region: [...values.region][1],
            }
            if (!err) {
                Post('/api/personInfo/add', person).then(() => {
                    message.success("录入成功", {}, () => this.handleBack());
                }).catch(({ response }) => {
                    message.error(response.data.message);
                })
            }
        });
    }

    validateState = (rule, value, callback) => {
        if (value === -1) {
            callback('请选择状态！');
        } else {
            callback();
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form
                className="person-search-form"
                onSubmit={this.handleSumbit}
            >

                <Form.Item
                    label="用户名"
                    {...formItemLayout}
                >
                    {getFieldDecorator('person', {
                        rules: [{
                            required: true, message: '请输入用户名'
                        },{
                            max: 10, message: '用户名不得超过10字'
                        }],
                        initialValue: ''
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="行业"
                    {...formItemLayout}
                >
                    {getFieldDecorator('industry', {
                        rules: [{
                            required: true, message: '请选择行业',
                        }],
                    })(
                        <Cascader options={industryOptions} placeholder='请选择' />
                    )}
                </Form.Item>
                <Form.Item
                    label="公司名称"
                    {...formItemLayout}
                >
                    {getFieldDecorator('company', {
                        initialValue: '',
                        rules: [{
                            required: true, message: '请输入公司名称',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="公司职位"
                    {...formItemLayout}
                >
                    {getFieldDecorator('position', {
                        initialValue: '',
                        rules: [{
                            required: true, message: '请输入公司职位',
                        },{
                            max: 15, message: '公司职位不得超过15字'
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="公司地址"
                    {...formItemLayout}
                >
                    {getFieldDecorator('address', {
                        initialValue: '',
                        rules: [{
                            required: true, message: '请输入公司地址',
                        },{
                            max: 25, message: '公司地址不得超过25字'
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="联系电话"
                    {...formItemLayout}
                >
                    {getFieldDecorator('telphone', {
                        initialValue: '',
                        rules: [{
                            required: true, message: '请输入联系电话',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="区域"
                    {...formItemLayout}
                >
                    {getFieldDecorator('region', {
                        rules: [{
                            required: true, message: '请选择区域',
                        }],
                    })(
                        <Cascader options={cityOptions} placeholder="请选择" />
                    )}
                </Form.Item>
                <Form.Item
                    label="联系状态"
                    {...formItemLayout}
                >
                    {getFieldDecorator('isContact', {
                        initialValue: -1,
                        rules: [{
                            validator: this.validateState,
                        }, {
                            required: true
                        }],
                    })(
                        <Select
                        >
                            <Select.Option value={-1}>全部状态</Select.Option>
                            <Select.Option value={0}>未联系</Select.Option>
                            <Select.Option value={1}>已联系</Select.Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item
                    label="联系后状态"
                    {...formItemLayout}
                >
                    {getFieldDecorator('contactedState', {
                        initialValue: -1,
                        rules: [{
                            validator: this.validateState,
                        }, {
                            required: true
                        }],
                    })(
                        <Select
                        >
                            <Select.Option value={-1}>全部状态</Select.Option>
                            <Select.Option value={0}>不需要</Select.Option>
                            <Select.Option value={1}>回访电话</Select.Option>
                            <Select.Option value={2}>无人接听</Select.Option>
                            <Select.Option value={3}>职位不符</Select.Option>
                            <Select.Option value={4}>同意</Select.Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item
                    label="备注"
                    {...formItemLayout}
                >
                    {getFieldDecorator('remark', {
                        initialValue: '',
                        rules:[{
                            max: 120, message: '备注不得超过120字'
                        }]
                    })(
                        <Input.TextArea></Input.TextArea>
                    )}
                </Form.Item>
                <Button type="primary" htmlType="submit" style={{ marginRight: 6 }}>提交</Button>
                <Button type="default" onClick={this.handleBack}>返回</Button>
            </Form>
        );
    }
}

PersonAdd = Form.create({ name: 'person_add' })(PersonAdd);

export default PersonAdd;