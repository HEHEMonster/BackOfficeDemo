import React, { Component } from 'react';
import { Row, Col, Input, DatePicker, Button, Select, Form } from 'antd';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;

class TradeCirclePushSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const { getFieldDecorator } = this.props.form;
    
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        return (
            <Form layout="horizontal">
            <Row gutter={18}>
                <Col xl={6} md={12} sm={24}>
                    <FormItem label="姓名" {...formItemLayout}   >
                        {getFieldDecorator('title', {
                            // rules: [{ required: true, message: "请输入活动名" }],
                        })(<Input  placeholder="输入用户名" />)}
                    </FormItem>
                </Col>
                <Col xl={6} md={12} sm={24}>
                    <FormItem label="手机号码" {...formItemLayout}   >
                        {getFieldDecorator('title', {
                            // rules: [{ required: true, message: "请输入活动名" }],
                        })(<Input placeholder="输入手机号码" />)}
                    </FormItem>
                </Col>
                <Col xl={6} md={12} sm={24}>
                    <FormItem label="类型" {...formItemLayout}>
                        {getFieldDecorator('type', {
                            // rules: [{ required: true }],
                            initialValue: "全部",
                            //valuePropName: "checked"
                        })(
                            <Select>
                                <Select.Option value={0}>全部</Select.Option>
                                <Select.Option value={1}>图文</Select.Option>
                                <Select.Option value={2}>视频</Select.Option>
                                <Select.Option value={3}>供需</Select.Option>
                                <Select.Option value={4}>引用</Select.Option>
                                <Select.Option value={5}>想法</Select.Option>
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col xl={6} md={12} sm={24}>
                    <FormItem label="发布时间"  {...formItemLayout}>
                        {getFieldDecorator('registrationRangepicker')(
                            <RangePicker />
                        )}
                    </FormItem>
                </Col>
                <Col xl={6} md={12} sm={24}>
                    <FormItem label="推荐人" {...formItemLayout}>
                        {getFieldDecorator('type', {
                            // rules: [{ required: true }],
                            initialValue: "全部",
                            //valuePropName: "checked"
                        })(
                            <Select>
                                <Select.Option value={0}>全部</Select.Option>
                                <Select.Option value={1}>ZD001</Select.Option>
                                <Select.Option value={2}>ZD002</Select.Option>
                                <Select.Option value={3}>ZD003</Select.Option>
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col xl={6} md={12} sm={24}>
                    <FormItem label="推送情况" {...formItemLayout}>
                        {getFieldDecorator('type', {
                            // rules: [{ required: true }],
                            initialValue: "全部",
                            //valuePropName: "checked"
                        })(
                            <Select>
                                <Select.Option value={0}>全部</Select.Option>
                                <Select.Option value={1}>未推送</Select.Option>
                                <Select.Option value={2}>已推送</Select.Option>
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col xl={6} md={12} sm={24}>
                    <FormItem label="推荐时间"  {...formItemLayout}>
                        {getFieldDecorator('registrationRangepicker')(
                            <RangePicker />
                        )}
                    </FormItem>
                </Col>
                <Col xl={6} md={12} sm={24}>
                    <FormItem label="推送时间"  {...formItemLayout}>
                        {getFieldDecorator('registrationRangepicker')(
                            <RangePicker />
                        )}
                    </FormItem>
                </Col>
                <Col xl={10} md={12} sm={24} style={{marginBottom: 10}}>
                    <Button type="primary" icon="search" style={{ marginRight: 10 }}>搜索</Button>
                    <Button type="default" icon="redo"  style={{ marginRight: 10 }}>重置</Button>
                    <Button type="primary" icon="push">一键推送</Button>
                </Col>
            </Row>
        </Form>
        );
    }
}
TradeCirclePushSearch = Form.create({ name: 'tradeCircle_search' })(TradeCirclePushSearch);

export default TradeCirclePushSearch;