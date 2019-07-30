import React, { Component } from 'react';
import { Modal, Icon, Form, Input, Select, Cascader, message, Tag } from 'antd';
import cityOptions from '../../static/city.json';
import industryOptions from '../../static/industry.json';
import { Put } from '../../utils/http';

class PersonDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmLoading: false
        }
    }

    convertIsContact(isContact) {
        switch (isContact) {
            case 0:
                return <span>未联系</span>;
            case 1:
                return <span>已联系</span>;
            default:
                return null;
        }
    }

    convertContactedState(contactedState) {
        switch (contactedState) {
            case 0:
                return <span>不需要</span>;
            case 1:
                return <span>回访电话</span>;
            case 2:
                return <span>无人接听</span>;
            case 3:
                return <span>职位不符</span>;
            case 4:
                return <span>同意</span>;
            default:
                return null;
        }
    }

    validateState = (rule, value, callback) => {
        if (value === -1) {
            callback('请选择状态！');
        } else {
            callback();
        }
    }

    handleSumbit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            this.setState({ confirmLoading: true });
            let result = {
                ...values,
                industry: [...values.industry][1],
                region: [...values.region][1],
                id: this.props.person.id,
                createDate: this.props.person.createDate,
                operatorId: this.props.person.operatorId
            }
            if (!err) {
                Put('/api/personInfo/audit', result).then(() => {
                    message.success("审核成功", {}, () => this.props.onCancel());
                }).catch(({ response }) => {
                    message.error(response.data.message);
                }).then(() => this.setState({ confirmLoading: false }, () => this.props.onSearch()))
            }
        });
    }

    handleIndustryCode = (code) => {
        let label = '';
        try {
            let preCode = `${code}`.split('_')[0];
            let label = [...industryOptions].filter(i => i.value === preCode)[0].children.filter(c => c.value === code)[0].label;
            return label;
        } catch{
            return label;
        }
    }

    handleCityCode = (code) => {
        let label = '';
        try {
            let preCode = `${code}`.substr(0, 2);
            let label = [...cityOptions].filter(i => `${i.value}`.startsWith(preCode))[0].children.filter(c => c.value === code)[0].label;
            return label;
        } catch{
            return label;
        }
    }

    render() {
        const { visible, onCancel, person, isViewDetails } = this.props;
        const { getFieldDecorator } = this.props.form;
        const footer = isViewDetails ? { footer: null } : {};
        
        const auditor = (
            person.auditor !== null ? 
            <div>
            <p>{person.auditor}</p></div> : 
            <p><Tag>暂无</Tag></p>
        )

        const details = (<div>
            <b><Icon type="user-add" />录入人</b>
            <p>{person.operator}</p>
            <b>审核人</b>
            {auditor}
            <b>姓名</b>
            <p>{person.person}</p>
            <b>行业</b>
            <p>{this.handleIndustryCode(person.industry)}</p>
            <b>区域</b>
            <p>{this.handleCityCode(person.region)}</p>
            <b>公司名称</b>
            <p>{person.company}</p>
            <b>公司地址</b>
            <p>{person.address}</p>
            <b>职位</b>
            <p>{person.position}</p>
            <b>联系电话</b>
            <p>{person.telphone}</p>
            <b>联系状态</b>
            <p>{this.convertIsContact(person.isContact)}</p>
            <b>联系后状态</b>
            <p>{this.convertContactedState(person.contactedState)}</p>
            <b>备注</b>
            <p>{person.remark}</p>
        </div>)

        const auditForm = (<Form
            className="person-search-form"
            onSubmit={this.handleSumbit}
        >

            <Form.Item
                label="用户名"
            >
                {getFieldDecorator('person', {
                    rules: [{
                        required: true, message: '请输入用户名',
                    }],
                    initialValue: person.person
                })(
                    <Input />
                )}
            </Form.Item>
            <Form.Item
                label="行业"
            >
                {getFieldDecorator('industry', {
                    rules: [{
                        required: true, message: '请选择行业',
                    }],
                })(
                    <Cascader options={industryOptions} placeholder="请选择" />
                )}
            </Form.Item>
            <Form.Item
                label="公司名称"
            >
                {getFieldDecorator('company', {
                    initialValue: person.company,
                    rules: [{
                        required: true, message: '请输入公司名称',
                    }],
                })(
                    <Input />
                )}
            </Form.Item>
            <Form.Item
                label="公司职位"
            >
                {getFieldDecorator('position', {
                    initialValue: person.position,
                    rules: [{
                        required: true, message: '请输入公司职位',
                    }],
                })(
                    <Input />
                )}
            </Form.Item>
            <Form.Item
                label="公司地址"
            >
                {getFieldDecorator('address', {
                    initialValue: person.address,
                    rules: [{
                        required: true, message: '请输入公司地址',
                    }],
                })(
                    <Input />
                )}
            </Form.Item>
            <Form.Item
                label="联系电话"
            >
                {getFieldDecorator('telphone', {
                    initialValue: person.telphone,
                    rules: [{
                        required: true, message: '请输入联系电话',
                    }],
                })(
                    <Input />
                )}
            </Form.Item>
            <Form.Item
                label="区域"
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
            >
                {getFieldDecorator('isContact', {
                    initialValue: person.isContact,
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
            >
                {getFieldDecorator('contactedState', {
                    initialValue: person.contactedState,
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
            >
                {getFieldDecorator('remark', {
                    initialValue: person.remark,
                })(
                    <Input.TextArea></Input.TextArea>
                )}
            </Form.Item>
        </Form>)

        return (
            <Modal
                title={isViewDetails ? "客户详情" : "客户审核"}
                visible={visible}
                onOk={isViewDetails ? onCancel : this.handleSumbit}
                onCancel={onCancel}
                confirmLoading={this.state.confirmLoading}
                destroyOnClose={true}
                {...footer}
            >
                {isViewDetails ? details : auditForm}
            </Modal>
        );
    }
}

PersonDetails = Form.create({ name: 'person_details' })(PersonDetails);

export default PersonDetails;