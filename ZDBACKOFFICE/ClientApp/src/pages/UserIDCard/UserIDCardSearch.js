import React, { Component } from 'react';
import {
    Form, Row, Col, Input, Button, DatePicker, Select
} from 'antd';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
const { RangePicker } = DatePicker;

class UserIDCardSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form>
                <Row gutter={24}>
                    <Col xl={6} md={12} sm={24} className='mb-15'>
                        <Form.Item label="上传时间">
                            {getFieldDecorator('createDate', {
                                initialValue: [moment().add(-6, "month"), moment()]
                            })(
                                <RangePicker
                                    allowClear={false}
                                    className='width100'
                                    locale={locale}
                                    format='YYYY/MM/DD'
                                />
                            )}
                        </Form.Item>
                    </Col>
                    <Col xl={6} md={12} sm={24} className='mb-15'>
                        <Form.Item label="上传时间">
                            {getFieldDecorator('userName', {})(
                                <Input placeholder="用户名" />
                            )}
                        </Form.Item>

                    </Col>
                    <Col xl={6} md={12} sm={24} className='mb-15'>
                        <Form.Item label="身份证号码">
                            {getFieldDecorator('idCardNumber', {})(
                                <Input />
                            )}
                        </Form.Item>
                    </Col>
                    <Col xl={6} md={12} sm={24} className='mb-15'>
                        <Form.Item label="状态">
                            {getFieldDecorator('status', {
                                initialValue: -2
                            })(
                                <Select
                                    placeholder="状态"
                                    style={{ width: '100%' }}
                                >
                                    <Select.Option value={-2}>全部状态</Select.Option>
                                    <Select.Option value={-1}>认证失败</Select.Option>
                                    <Select.Option value={0}>未认证</Select.Option>
                                    <Select.Option value={1}>已认证</Select.Option>
                                    <Select.Option value={2}>待认证</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col xl={6} md={24} sm={24} className='mb-15'>
                        <Row type="flex" align="middle">
                            <Button type="primary" icon="search" style={{ marginRight: 6 }} onClick={this.handleSearch}>搜索</Button>
                            <Button type="default" icon="redo" onClick={this.handleReset}>重置</Button>
                        </Row>
                    </Col>
                </Row>
            </Form>
        );
    }
}

UserIDCardSearch = Form.create({ name: 'userid_card_search' })(UserIDCardSearch);

export default UserIDCardSearch;