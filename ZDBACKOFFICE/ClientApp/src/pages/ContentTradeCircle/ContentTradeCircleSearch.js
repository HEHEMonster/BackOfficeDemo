import React, { Component } from 'react';
import { Row, Col, Input, DatePicker, Button, Select, Form } from 'antd';
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
//import  './TradeCircle.css'

const { RangePicker } = DatePicker;
const FormItem = Form.Item;

class ContentTradeCircleSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSumbit = (e) => {
        e.preventDefault();
        this.props.onSearch();
    }

    handleReset = () => {
        this.props.form.resetFields();
        this.props.onSearch();
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            
        };

        return (
            <Form onSubmit={this.handleSumbit}
                className="trade-search-form"
            >
                <Row gutter={24}>
                    <Col xl={6} md={12} sm={24}>
                        <FormItem label="姓名" {...formItemLayout}   >
                            {getFieldDecorator('userName', {
                            })(<Input placeholder="输入用户名"/>)}
                        </FormItem>
                    </Col>
                    <Col xl={6} md={12} sm={24}>
                        <FormItem label="手机号码" {...formItemLayout}   >
                            {getFieldDecorator('telphone', {
                            })(<Input placeholder="输入手机号码"/>)}
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
                        </FormItem>
                    </Col>
                    {/* <Col xl={6} md={12} sm={24}>
                    <FormItem label="审核人" {...formItemLayout}>
                        {getFieldDecorator('auditor', {
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
                    <FormItem label="审核状态" {...formItemLayout}>
                        {getFieldDecorator('status', {
                            // rules: [{ required: true }],
                            initialValue: "全部",
                            //valuePropName: "checked"
                        })(
                            <Select>
                                <Select.Option value={0}>全部</Select.Option>
                                <Select.Option value={1}>待审核</Select.Option>
                                <Select.Option value={2}>已审核</Select.Option>
                                <Select.Option value={3}>已删除</Select.Option>
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col xl={6} md={12} sm={24}>
                    <FormItem label="推荐情况" {...formItemLayout}>
                        {getFieldDecorator('recommendation', {
                            // rules: [{ required: true }],
                            initialValue: "全部",
                            //valuePropName: "checked"
                        })(
                            <Select>
                                <Select.Option value={0}>全部</Select.Option>
                                <Select.Option value={1}>未推荐</Select.Option>
                                <Select.Option value={2}>已推荐待推送</Select.Option>
                                <Select.Option value={3}>已推送</Select.Option>
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col xl={6} md={12} sm={24}>
                    <FormItem label="审核时间"  {...formItemLayout}>
                        {getFieldDecorator('auditDate', {
                                    // initialValue: [moment().add(-6, "month"), moment()]
                                })(
                                    <RangePicker
                                        allowClear={false}
                                        className='width100'
                                        locale={locale}
                                        format='YYYY/MM/DD'
                                    />
                                )}
                    </FormItem>
                </Col> */}
                    <Col xl={6} md={12} sm={24} style={{ marginBottom: 10 }}>
                        <Button type="primary" icon="search" htmlType="submit" style={{ marginRight: 10 }}>搜索</Button>
                        <Button type="default" icon="redo" onClick={this.handleReset}>重置</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}
ContentTradeCircleSearch = Form.create({ name: 'tradeCircle_search' })(ContentTradeCircleSearch);

export default ContentTradeCircleSearch;